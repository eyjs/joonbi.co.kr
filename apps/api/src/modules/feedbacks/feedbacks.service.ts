import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FeedbackStatus, DocumentStatus } from '@prisma/client';
import {
  UpdateFeedbackDto,
  QueryFeedbackDto,
  FeedbackResponseDto,
  FeedbackListResponseDto,
} from './dto';

@Injectable()
export class FeedbacksService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<FeedbackResponseDto> {
    const feedback = await this.prisma.documentFeedback.findUnique({
      where: { id },
      include: {
        document: {
          select: {
            id: true,
            docCode: true,
            docName: true,
            docType: true,
          },
        },
      },
    });

    if (!feedback) {
      throw new NotFoundException('피드백을 찾을 수 없습니다.');
    }

    return feedback;
  }

  async findAll(
    query: QueryFeedbackDto,
  ): Promise<FeedbackListResponseDto> {
    const { documentId, status, page = 1, limit = 20 } = query;

    const where = {
      ...(documentId && { documentId }),
      ...(status && { status }),
    };

    const [data, total] = await Promise.all([
      this.prisma.documentFeedback.findMany({
        where,
        include: {
          document: {
            select: {
              id: true,
              docCode: true,
              docName: true,
              docType: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.documentFeedback.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    const feedback = await this.prisma.documentFeedback.findUnique({
      where: { id },
      include: { document: true },
    });

    if (!feedback) {
      throw new NotFoundException('피드백을 찾을 수 없습니다.');
    }

    if (feedback.isNewFeature && updateFeedbackDto.extraCost !== undefined) {
      if (updateFeedbackDto.extraCost < 0) {
        throw new BadRequestException('추가 비용은 0 이상이어야 합니다.');
      }
    }

    const updatedFeedback = await this.prisma.documentFeedback.update({
      where: { id },
      data: {
        ...updateFeedbackDto,
        updatedAt: new Date(),
      },
      include: {
        document: {
          select: {
            id: true,
            docCode: true,
            docName: true,
            docType: true,
          },
        },
      },
    });

    if (updateFeedbackDto.status) {
      await this.updateDocumentStatusBasedOnFeedback(feedback.documentId);
    }

    return updatedFeedback;
  }

  private async updateDocumentStatusBasedOnFeedback(
    documentId: string,
  ): Promise<void> {
    const feedbacks = await this.prisma.documentFeedback.findMany({
      where: { documentId },
    });

    const hasPendingFeedback = feedbacks.some(
      (fb) => fb.status === FeedbackStatus.PENDING,
    );
    const hasInProgressFeedback = feedbacks.some(
      (fb) => fb.status === FeedbackStatus.IN_PROGRESS,
    );
    const allResolved = feedbacks.every(
      (fb) =>
        fb.status === FeedbackStatus.RESOLVED ||
        fb.status === FeedbackStatus.REJECTED,
    );

    let newDocumentStatus: DocumentStatus | null = null;

    if (hasPendingFeedback || hasInProgressFeedback) {
      newDocumentStatus = DocumentStatus.FEEDBACK;
    } else if (allResolved && feedbacks.length > 0) {
      newDocumentStatus = DocumentStatus.REVIEW;
    }

    if (newDocumentStatus) {
      await this.prisma.document.update({
        where: { id: documentId },
        data: { status: newDocumentStatus },
      });
    }
  }

  async getStatistics(): Promise<{
    total: number;
    byStatus: Record<FeedbackStatus, number>;
    byType: Record<string, number>;
    newFeatureCount: number;
  }> {
    const [total, byStatusData, byTypeData, newFeatureCount] =
      await Promise.all([
        this.prisma.documentFeedback.count(),
        this.prisma.documentFeedback.groupBy({
          by: ['status'],
          _count: true,
        }),
        this.prisma.documentFeedback.groupBy({
          by: ['type'],
          _count: true,
        }),
        this.prisma.documentFeedback.count({
          where: { isNewFeature: true },
        }),
      ]);

    const byStatus = byStatusData.reduce(
      (acc, item) => {
        acc[item.status] = item._count;
        return acc;
      },
      {} as Record<FeedbackStatus, number>,
    );

    const byType = byTypeData.reduce(
      (acc, item) => {
        acc[item.type] = item._count;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total,
      byStatus,
      byType,
      newFeatureCount,
    };
  }
}
