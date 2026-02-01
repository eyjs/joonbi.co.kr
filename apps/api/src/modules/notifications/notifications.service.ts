import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationResponseDto, NotificationQueryDto } from './dto';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    userId: string,
    query: NotificationQueryDto,
  ): Promise<NotificationResponseDto[]> {
    const { type, unreadOnly } = query;

    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
        ...(type && { type }),
        ...(unreadOnly && { isRead: false }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return notifications.map((n) => new NotificationResponseDto(n));
  }

  async markAsRead(id: string, userId: string): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        isRead: true,
      },
    });

    if (notification.count === 0) {
      return null;
    }

    const updated = await this.prisma.notification.findUnique({
      where: { id },
    });

    return new NotificationResponseDto(updated);
  }

  async markAllAsRead(userId: string): Promise<{ count: number }> {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return { count: result.count };
  }

  async getUnreadCount(userId: string): Promise<{ count: number }> {
    const count = await this.prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    return { count };
  }

  async notify(
    userId: string,
    type: NotificationType,
    title: string,
    content: string,
    link?: string,
  ): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        content,
        link: link || null,
      },
    });

    return new NotificationResponseDto(notification);
  }

  async notifyConsultationResult(
    userId: string,
    consultationId: string,
    projectName: string,
    isApproved: boolean,
  ): Promise<NotificationResponseDto> {
    const title = isApproved
      ? '상담 결과: 프로젝트 진행 가능'
      : '상담 결과: 프로젝트 진행 불가';
    const content = isApproved
      ? `${projectName} 프로젝트의 상담 결과가 도착했습니다. 프로젝트 진행이 가능합니다.`
      : `${projectName} 프로젝트의 상담 결과가 도착했습니다. 안타깝게도 현재 진행이 어렵습니다.`;
    const link = `/consultations/${consultationId}`;

    return this.notify(
      userId,
      NotificationType.CONSULTATION_RESULT,
      title,
      content,
      link,
    );
  }

  async notifyPaymentRequest(
    userId: string,
    projectId: string,
    projectName: string,
    amount: number,
    paymentType: string,
  ): Promise<NotificationResponseDto> {
    const title = '결제 요청';
    const content = `${projectName} 프로젝트의 ${paymentType} ${amount.toLocaleString()}원 결제를 진행해주세요.`;
    const link = `/projects/${projectId}/payments`;

    return this.notify(
      userId,
      NotificationType.PAYMENT_REQUEST,
      title,
      content,
      link,
    );
  }

  async notifyDocumentUploaded(
    userId: string,
    projectId: string,
    projectName: string,
    docCode: string,
    docName: string,
  ): Promise<NotificationResponseDto> {
    const title = '산출물 업로드';
    const content = `${projectName} 프로젝트의 ${docName}(${docCode})이 업로드되었습니다.`;
    const link = `/projects/${projectId}/documents/${docCode}`;

    return this.notify(
      userId,
      NotificationType.DOCUMENT_UPLOADED,
      title,
      content,
      link,
    );
  }

  async notifyReviewRequest(
    userId: string,
    projectId: string,
    projectName: string,
    docCode: string,
    docName: string,
  ): Promise<NotificationResponseDto> {
    const title = '검토 요청';
    const content = `${projectName} 프로젝트의 ${docName}(${docCode})에 대한 검토를 진행해주세요.`;
    const link = `/projects/${projectId}/documents/${docCode}`;

    return this.notify(
      userId,
      NotificationType.REVIEW_REQUEST,
      title,
      content,
      link,
    );
  }

  async notifyReviewDeadline(
    userId: string,
    projectId: string,
    projectName: string,
    docCode: string,
    docName: string,
    deadline: Date,
  ): Promise<NotificationResponseDto> {
    const daysLeft = Math.ceil(
      (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    const title = '검토 마감 임박';
    const content = `${projectName} 프로젝트의 ${docName}(${docCode}) 검토 마감이 ${daysLeft}일 남았습니다.`;
    const link = `/projects/${projectId}/documents/${docCode}`;

    return this.notify(
      userId,
      NotificationType.REVIEW_DEADLINE,
      title,
      content,
      link,
    );
  }

  async notifyFeedbackReplied(
    userId: string,
    projectId: string,
    projectName: string,
    docCode: string,
    feedbackId: string,
  ): Promise<NotificationResponseDto> {
    const title = '피드백 답변';
    const content = `${projectName} 프로젝트의 ${docCode} 문서에 남긴 피드백에 답변이 등록되었습니다.`;
    const link = `/projects/${projectId}/documents/${docCode}#feedback-${feedbackId}`;

    return this.notify(
      userId,
      NotificationType.FEEDBACK_REPLIED,
      title,
      content,
      link,
    );
  }

  async notifyProjectCompleted(
    userId: string,
    projectId: string,
    projectName: string,
  ): Promise<NotificationResponseDto> {
    const title = '프로젝트 완료';
    const content = `${projectName} 프로젝트가 완료되었습니다. 포트폴리오 등록 동의를 확인해주세요.`;
    const link = `/projects/${projectId}`;

    return this.notify(
      userId,
      NotificationType.PROJECT_COMPLETED,
      title,
      content,
      link,
    );
  }

  async notifyMessageReceived(
    userId: string,
    projectId: string,
    projectName: string,
    senderName: string,
  ): Promise<NotificationResponseDto> {
    const title = '새 메시지';
    const content = `${projectName} 프로젝트에서 ${senderName}님이 메시지를 보냈습니다.`;
    const link = `/projects/${projectId}/messages`;

    return this.notify(
      userId,
      NotificationType.MESSAGE_RECEIVED,
      title,
      content,
      link,
    );
  }
}
