import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto, ProjectProgressDto } from './dto';
import { Project, ProjectStatus, DocumentStatus } from '@prisma/client';

const STATUS_COMPLETION: Record<DocumentStatus, number> = {
  WAITING: 0,
  WORKING: 0.3,
  REVIEW: 0.7,
  FEEDBACK: 0.5,
  APPROVED: 0.9,
  DELIVERED: 1.0,
};

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const projectCode = await this.generateProjectCode();

    const contractAmount = dto.contractAmount || Math.floor(dto.totalAmount * 0.3);
    const finalAmount = dto.finalAmount || dto.totalAmount - contractAmount;

    const project = await this.prisma.project.create({
      data: {
        userId: dto.userId,
        consultationId: dto.consultationId,
        projectCode,
        projectName: dto.title,
        totalAmount: dto.totalAmount,
        contractAmount,
        finalAmount,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        expectedEndDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        portfolioAgreed: dto.portfolioAgreed ?? false,
        status: ProjectStatus.CONTRACT,
      },
    });

    if (dto.consultationId) {
      await this.prisma.consultation.update({
        where: { id: dto.consultationId },
        data: {
          status: 'CONVERTED',
        },
      });
    }

    return project;
  }

  async findAll(userId?: string, page = 1, limit = 20): Promise<{ data: Project[]; meta: any }> {
    const where = userId ? { userId } : {};

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  async findOne(id: string, userId?: string): Promise<Project> {
    const where: any = { id };
    if (userId) {
      where.userId = userId;
    }

    const project = await this.prisma.project.findFirst({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        consultation: true,
        documents: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    return project;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        projectName: dto.title,
        status: dto.status,
        totalAmount: dto.totalAmount,
        contractAmount: dto.contractAmount,
        finalAmount: dto.finalAmount,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        expectedEndDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        actualEndDate: dto.completedDate ? new Date(dto.completedDate) : undefined,
        portfolioAgreed: dto.portfolioAgreed,
      },
    });
  }

  async getProgress(id: string): Promise<ProjectProgressDto> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        documents: {
          orderBy: { weight: 'desc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    const totalWeight = project.documents.reduce((sum, doc) => sum + doc.weight, 0);

    if (totalWeight === 0) {
      return {
        totalProgress: 0,
        documents: [],
      };
    }

    const totalProgress = project.documents.reduce((sum, doc) => {
      const completion = STATUS_COMPLETION[doc.status] || 0;
      return sum + (doc.weight * completion);
    }, 0);

    const progress = Math.round((totalProgress / totalWeight) * 100);

    const documents = project.documents.map((doc) => ({
      docCode: doc.docCode,
      docName: doc.docName,
      status: doc.status,
      weight: doc.weight,
      completion: Math.round((STATUS_COMPLETION[doc.status] || 0) * 100),
    }));

    const nextDoc = project.documents.find(
      (doc) => doc.status !== 'DELIVERED' && doc.status !== 'APPROVED',
    );

    return {
      totalProgress: progress,
      documents,
      nextMilestone: nextDoc ? `${nextDoc.docName} ${this.getStatusText(nextDoc.status)}` : undefined,
    };
  }

  async updateStatus(id: string, status: ProjectStatus): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    const validTransitions: Record<ProjectStatus, ProjectStatus[]> = {
      CONTRACT: ['IN_PROGRESS', 'CANCELLED'],
      IN_PROGRESS: ['REVIEW', 'CANCELLED'],
      REVIEW: ['COMPLETED', 'IN_PROGRESS', 'CANCELLED'],
      COMPLETED: [],
      CANCELLED: [],
    };

    const allowedStatuses = validTransitions[project.status];
    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException(
        `${project.status}에서 ${status}로 변경할 수 없습니다`,
      );
    }

    const updateData: any = { status };

    if (status === 'IN_PROGRESS' && !project.startDate) {
      updateData.startDate = new Date();
    }

    if (status === 'COMPLETED') {
      updateData.actualEndDate = new Date();
    }

    return this.prisma.project.update({
      where: { id },
      data: updateData,
    });
  }

  private async generateProjectCode(): Promise<string> {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');

    const count = await this.prisma.project.count({
      where: {
        projectCode: {
          startsWith: `JB-${dateStr}`,
        },
      },
    });

    const sequence = String(count + 1).padStart(3, '0');
    return `JB-${dateStr}-${sequence}`;
  }

  private getStatusText(status: DocumentStatus): string {
    const statusMap: Record<DocumentStatus, string> = {
      WAITING: '대기 중',
      WORKING: '작업 중',
      REVIEW: '검토 요청',
      FEEDBACK: '수정 중',
      APPROVED: '승인 완료',
      DELIVERED: '전달 완료',
    };

    return statusMap[status] || status;
  }
}
