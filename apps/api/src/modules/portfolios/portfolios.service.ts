import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  CreatePortfolioDto,
  UpdatePortfolioDto,
  CreateSectionDto,
  UpdateSectionDto,
  ReorderSectionsDto,
} from './dto';
import { Portfolio, PortfolioDisplay, PortfolioSection } from '@prisma/client';
import { PaginatedResponse } from '@/common/types';

@Injectable()
export class PortfoliosService {
  private readonly logger = new Logger(PortfoliosService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePortfolioDto): Promise<Portfolio> {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    if (!project.portfolioAgreed) {
      throw new ConflictException('고객의 포트폴리오 동의가 필요합니다');
    }

    const existingPortfolio = await this.prisma.portfolio.findUnique({
      where: { projectId: dto.projectId },
    });

    if (existingPortfolio) {
      throw new ConflictException('이미 포트폴리오로 등록된 프로젝트입니다');
    }

    const existingSlug = await this.prisma.portfolio.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('이미 사용 중인 slug입니다');
    }

    // displayType=PRIVATE이면 isPublic=false 강제
    const isPublic = dto.displayType === PortfolioDisplay.PRIVATE ? false : dto.isPublic;

    const { images, completedAt, ...rest } = dto;

    const portfolio = await this.prisma.portfolio.create({
      data: {
        ...rest,
        isPublic,
        completedAt: completedAt ? new Date(completedAt) : undefined,
        images: images
          ? {
              create: images,
            }
          : undefined,
      },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        sections: { orderBy: { displayOrder: 'asc' } },
      },
    });

    return portfolio;
  }

  /** 공개 목록 (isPublic=true만) */
  async findAll(page = 1, limit = 20): Promise<PaginatedResponse<Portfolio>> {
    const where = { isPublic: true };

    const [data, total] = await Promise.all([
      this.prisma.portfolio.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          images: { orderBy: { displayOrder: 'asc' } },
          sections: { orderBy: { displayOrder: 'asc' } },
        },
      }),
      this.prisma.portfolio.count({ where }),
    ]);

    return {
      data: data.map((p) => this.maskAnonymous(p)),
      meta: { total, page, limit },
    };
  }

  /** 관리자 전체 목록 (비공개 포함) */
  async findAllAdmin(page = 1, limit = 20): Promise<PaginatedResponse<Portfolio>> {
    const [data, total] = await Promise.all([
      this.prisma.portfolio.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          images: { orderBy: { displayOrder: 'asc' } },
          sections: { orderBy: { displayOrder: 'asc' } },
          project: {
            select: {
              projectName: true,
              status: true,
            },
          },
        },
      }),
      this.prisma.portfolio.count(),
    ]);

    return {
      data,
      meta: { total, page, limit },
    };
  }

  /** 공개 상세 (id 기반, 하위 호환) */
  async findOne(id: string): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        sections: { orderBy: { displayOrder: 'asc' } },
        project: {
          select: {
            projectName: true,
            status: true,
            actualEndDate: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    if (!portfolio.isPublic) {
      throw new NotFoundException('공개되지 않은 포트폴리오입니다');
    }

    return this.sanitizeByDisplayType(portfolio);
  }

  /** 공개 상세 (slug 기반) */
  async findBySlug(slug: string): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        sections: { orderBy: { displayOrder: 'asc' } },
        project: {
          select: {
            projectName: true,
            status: true,
            actualEndDate: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    if (!portfolio.isPublic) {
      throw new NotFoundException('공개되지 않은 포트폴리오입니다');
    }

    return this.sanitizeByDisplayType(portfolio);
  }

  /** 관리자 상세 (id 기반, 비공개 포함) */
  async findOneAdmin(id: string): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        sections: { orderBy: { displayOrder: 'asc' } },
        project: {
          select: {
            projectName: true,
            status: true,
            actualEndDate: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    return portfolio;
  }

  async update(id: string, dto: UpdatePortfolioDto): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    if (dto.slug && dto.slug !== portfolio.slug) {
      const existingSlug = await this.prisma.portfolio.findUnique({
        where: { slug: dto.slug },
      });

      if (existingSlug) {
        throw new ConflictException('이미 사용 중인 slug입니다');
      }
    }

    // displayType=PRIVATE이면 isPublic=false 강제
    const displayType = dto.displayType ?? portfolio.displayType;
    const isPublic = displayType === PortfolioDisplay.PRIVATE
      ? false
      : (dto.isPublic ?? portfolio.isPublic);

    const { images, completedAt, ...rest } = dto;

    const updatedPortfolio = await this.prisma.portfolio.update({
      where: { id },
      data: {
        ...rest,
        isPublic,
        completedAt: completedAt !== undefined ? (completedAt ? new Date(completedAt) : null) : undefined,
        images: images
          ? {
              deleteMany: {},
              create: images,
            }
          : undefined,
      },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        sections: { orderBy: { displayOrder: 'asc' } },
      },
    });

    return updatedPortfolio;
  }

  async delete(id: string): Promise<void> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }

    await this.prisma.portfolio.delete({
      where: { id },
    });
  }

  // ============ Section CRUD ============

  async addSection(portfolioId: string, dto: CreateSectionDto): Promise<PortfolioSection> {
    await this.ensurePortfolioExists(portfolioId);

    const section = await this.prisma.portfolioSection.create({
      data: {
        portfolioId,
        ...dto,
      },
    });

    return section;
  }

  async updateSection(
    portfolioId: string,
    sectionId: string,
    dto: UpdateSectionDto,
  ): Promise<PortfolioSection> {
    const section = await this.prisma.portfolioSection.findFirst({
      where: { id: sectionId, portfolioId },
    });

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다');
    }

    const updated = await this.prisma.portfolioSection.update({
      where: { id: sectionId },
      data: dto,
    });

    return updated;
  }

  async deleteSection(portfolioId: string, sectionId: string): Promise<void> {
    const section = await this.prisma.portfolioSection.findFirst({
      where: { id: sectionId, portfolioId },
    });

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다');
    }

    await this.prisma.portfolioSection.delete({
      where: { id: sectionId },
    });
  }

  async reorderSections(portfolioId: string, dto: ReorderSectionsDto): Promise<PortfolioSection[]> {
    await this.ensurePortfolioExists(portfolioId);

    await this.prisma.$transaction(
      dto.sections.map((item) =>
        this.prisma.portfolioSection.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        }),
      ),
    );

    const sections = await this.prisma.portfolioSection.findMany({
      where: { portfolioId },
      orderBy: { displayOrder: 'asc' },
    });

    return sections;
  }

  // ============ Private helpers ============

  private async ensurePortfolioExists(id: string): Promise<void> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다');
    }
  }

  /** 목록용 마스킹 (sanitizeByDisplayType 재사용) */
  private maskAnonymous(portfolio: Portfolio): Portfolio {
    return this.sanitizeByDisplayType(portfolio);
  }

  /** displayType=ANONYMOUS이면 clientName, projectName 숨김 */
  private sanitizeByDisplayType(portfolio: Portfolio & { project?: { projectName?: string } }): Portfolio {
    if (portfolio.displayType === PortfolioDisplay.ANONYMOUS) {
      return {
        ...portfolio,
        clientName: null,
        project: portfolio.project
          ? { ...portfolio.project, projectName: '비공개 프로젝트' }
          : undefined,
      } as Portfolio;
    }

    return portfolio;
  }
}
