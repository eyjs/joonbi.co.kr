import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import {
  CreateMessageDto,
  MessageResponseDto,
  MessageListResponseDto,
  UnreadCountResponseDto,
} from './dto';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async findByProject(
    projectId: string,
    userId: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<MessageListResponseDto> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { userId: true },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('접근 권한이 없습니다');
    }

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.prisma.message.findMany({
        where: { projectId },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.message.count({
        where: { projectId },
      }),
    ]);

    await this.prisma.message.updateMany({
      where: {
        projectId,
        senderId: { not: userId },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return new MessageListResponseDto(
      messages.map((m) => new MessageResponseDto(m)),
      total,
    );
  }

  async create(
    projectId: string,
    userId: string,
    dto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { userId: true, projectName: true, user: { select: { name: true } } },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('접근 권한이 없습니다');
    }

    const message = await this.prisma.message.create({
      data: {
        projectId,
        senderId: userId,
        content: dto.content,
        isRead: false,
      },
    });

    await this.notificationsService.notifyMessageReceived(
      'ADMIN',
      projectId,
      project.projectName,
      project.user.name,
    );

    return new MessageResponseDto(message);
  }

  async getUnreadCount(userId: string): Promise<UnreadCountResponseDto> {
    const projects = await this.prisma.project.findMany({
      where: { userId },
      select: { id: true },
    });

    const projectIds = projects.map((p) => p.id);

    const count = await this.prisma.message.count({
      where: {
        projectId: { in: projectIds },
        senderId: { not: userId },
        isRead: false,
      },
    });

    return new UnreadCountResponseDto(count);
  }

  async findByProjectAdmin(
    projectId: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<MessageListResponseDto> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.prisma.message.findMany({
        where: { projectId },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.message.count({
        where: { projectId },
      }),
    ]);

    await this.prisma.message.updateMany({
      where: {
        projectId,
        senderId: project.userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return new MessageListResponseDto(
      messages.map((m) => new MessageResponseDto(m)),
      total,
    );
  }

  async createAdmin(
    projectId: string,
    adminId: string,
    dto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { userId: true, projectName: true },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다');
    }

    const message = await this.prisma.message.create({
      data: {
        projectId,
        senderId: adminId,
        content: dto.content,
        isRead: false,
      },
    });

    await this.notificationsService.notifyMessageReceived(
      project.userId,
      projectId,
      project.projectName,
      '준비스튜디오',
    );

    return new MessageResponseDto(message);
  }
}
