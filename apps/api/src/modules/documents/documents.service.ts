import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DocumentStatus, FeedbackStatus } from '@prisma/client';
import {
  DocumentResponseDto,
  CreateFeedbackDto,
  FeedbackResponseDto,
  ApproveDocumentDto,
  UploadDocumentDto,
  UpdateDocumentStatusDto,
} from './dto';

@Injectable()
export class DocumentsService {
  private readonly STATUS_COMPLETION = {
    WAITING: 0,
    WORKING: 0.3,
    REVIEW: 0.7,
    FEEDBACK: 0.5,
    APPROVED: 0.9,
    DELIVERED: 1.0,
  };

  private readonly DOCUMENT_WEIGHTS = {
    'DOC-01': 20,
    'DOC-02': 50,
    'DOC-03': 20,
    'DOC-04': 10,
  };

  private readonly logger = new Logger(DocumentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, userId: string): Promise<DocumentResponseDto> {
    const document = await this.prisma.document.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
      include: {
        feedbacks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!document) {
      throw new NotFoundException('산출물을 찾을 수 없습니다.');
    }

    return document as DocumentResponseDto;
  }

  async findByIdForAdmin(id: string): Promise<DocumentResponseDto> {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        feedbacks: {
          orderBy: { createdAt: 'desc' },
        },
        project: {
          select: {
            projectCode: true,
            projectName: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException('산출물을 찾을 수 없습니다.');
    }

    return document as unknown as DocumentResponseDto;
  }

  async createFeedback(
    documentId: string,
    userId: string,
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        project: {
          userId,
        },
      },
    });

    if (!document) {
      throw new NotFoundException('산출물을 찾을 수 없습니다.');
    }

    if (document.status !== DocumentStatus.REVIEW) {
      throw new BadRequestException(
        '검토중 상태에서만 피드백을 등록할 수 있습니다.',
      );
    }

    if (document.feedbackItemCount >= document.feedbackLimit) {
      throw new BadRequestException(
        `피드백 제한 횟수(${document.feedbackLimit}회)를 초과했습니다.`,
      );
    }

    const feedback = await this.prisma.$transaction(async (tx) => {
      const newFeedback = await tx.documentFeedback.create({
        data: {
          documentId,
          ...createFeedbackDto,
        },
      });

      await tx.document.update({
        where: { id: documentId },
        data: {
          status: DocumentStatus.FEEDBACK,
          feedbackItemCount: {
            increment: 1,
          },
        },
      });

      return newFeedback;
    });

    return feedback as FeedbackResponseDto;
  }

  async approve(
    documentId: string,
    userId: string,
    approveDocumentDto: ApproveDocumentDto,
  ): Promise<DocumentResponseDto> {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        project: {
          userId,
        },
      },
    });

    if (!document) {
      throw new NotFoundException('산출물을 찾을 수 없습니다.');
    }

    if (document.status !== DocumentStatus.REVIEW) {
      throw new BadRequestException('검토중 상태에서만 승인할 수 있습니다.');
    }

    const updatedDocument = await this.prisma.document.update({
      where: { id: documentId },
      data: {
        status: DocumentStatus.APPROVED,
      },
    });

    return updatedDocument as DocumentResponseDto;
  }

  async uploadFile(
    documentId: string,
    uploadDocumentDto: UploadDocumentDto,
  ): Promise<DocumentResponseDto> {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new NotFoundException('산출물을 찾을 수 없습니다.');
    }

    const reviewDeadline = this.calculateReviewDeadline();

    const updatedDocument = await this.prisma.document.update({
      where: { id: documentId },
      data: {
        filePath: uploadDocumentDto.filePath,
        status: DocumentStatus.REVIEW,
        reviewDeadline,
      },
    });

    return updatedDocument as DocumentResponseDto;
  }

  async updateStatus(
    documentId: string,
    updateStatusDto: UpdateDocumentStatusDto,
  ): Promise<DocumentResponseDto> {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new NotFoundException('산출물을 찾을 수 없습니다.');
    }

    const updatedDocument = await this.prisma.document.update({
      where: { id: documentId },
      data: {
        status: updateStatusDto.status,
      },
    });

    return updatedDocument as DocumentResponseDto;
  }

  async calculateProjectProgress(projectId: string): Promise<number> {
    const documents = await this.prisma.document.findMany({
      where: {
        projectId,
        docCode: {
          in: ['DOC-01', 'DOC-02', 'DOC-03', 'DOC-04'],
        },
      },
    });

    let totalProgress = 0;

    for (const doc of documents) {
      const weight = this.DOCUMENT_WEIGHTS[doc.docCode] || 0;
      const completion = this.STATUS_COMPLETION[doc.status] || 0;
      totalProgress += weight * completion;
    }

    return Math.round(totalProgress);
  }

  private calculateReviewDeadline(): Date {
    const deadline = new Date();
    let businessDaysAdded = 0;

    while (businessDaysAdded < 5) {
      deadline.setDate(deadline.getDate() + 1);

      const dayOfWeek = deadline.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDaysAdded++;
      }
    }

    return deadline;
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleAutoApproval(): Promise<void> {
    const now = new Date();

    const documentsToAutoApprove = await this.prisma.document.findMany({
      where: {
        status: DocumentStatus.REVIEW,
        reviewDeadline: {
          lte: now,
        },
      },
    });

    for (const document of documentsToAutoApprove) {
      await this.prisma.document.update({
        where: { id: document.id },
        data: {
          status: DocumentStatus.APPROVED,
        },
      });

      this.logger.log(
        `[Auto Approval] Document ${document.docCode} (${document.id}) has been automatically approved.`,
      );
    }

    if (documentsToAutoApprove.length > 0) {
      this.logger.log(
        `[Auto Approval] Total ${documentsToAutoApprove.length} documents auto-approved.`,
      );
    }
  }

  async canAccessDocument(documentId: string, userId: string): Promise<boolean> {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        project: {
          userId,
        },
      },
    });

    return !!document;
  }
}
