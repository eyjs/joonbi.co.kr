import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateConsultationDto,
  CreatePublicConsultationDto,
  ConfirmSpecDto,
  SubmitInfoDto,
  ConsultationResponseDto,
  ConsultationFileResponseDto,
  ConsultationDesignResponseDto,
} from './dto';
import {
  ConsultationType,
  ConsultationStatus,
  AnalysisStatus,
} from '@prisma/client';
import { DiscordService } from '../discord/discord.service';

@Injectable()
export class ConsultationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly discordService: DiscordService,
  ) {}

  // ===== Public methods =====

  async createPublic(
    dto: CreatePublicConsultationDto,
  ): Promise<ConsultationResponseDto> {
    const projectName = dto.description.substring(0, 50).trim();

    const consultation = await this.prisma.consultation.create({
      data: {
        // userId is null for public consultations
        type: ConsultationType.ANALYSIS,
        projectName,
        description: dto.description,
        referenceUrls: dto.referenceUrls || [],
        budgetRange: dto.budgetRange || null,
        status: ConsultationStatus.PENDING,
        analysisStatus: AnalysisStatus.PENDING,
        aiRisks: [],
      },
    });

    try {
      await this.discordService.requestFullAnalysis(consultation);
    } catch {
      // Discord notification failure should not block consultation creation
    }

    return new ConsultationResponseDto(consultation);
  }

  async findByAccessToken(token: string): Promise<ConsultationResponseDto> {
    const consultation = await this.prisma.consultation.findFirst({
      where: { accessToken: token },
      include: {
        files: true,
        designs: true,
      },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    return new ConsultationResponseDto(consultation);
  }

  async confirmSpec(
    token: string,
    dto: ConfirmSpecDto,
  ): Promise<ConsultationResponseDto> {
    const consultation = await this.prisma.consultation.findFirst({
      where: { accessToken: token },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.consultation.update({
      where: { id: consultation.id },
      data: {
        status: ConsultationStatus.PROCESSING,
        // Store customer comment in aiAnalysis if needed
        ...(dto.customerComment && {
          aiAnalysis: {
            ...(typeof consultation.aiAnalysis === 'object' && consultation.aiAnalysis !== null
              ? consultation.aiAnalysis
              : {}),
            customerComment: dto.customerComment,
          },
        }),
      },
    });

    return new ConsultationResponseDto(updated);
  }

  async submitInfo(
    token: string,
    dto: SubmitInfoDto,
  ): Promise<ConsultationResponseDto> {
    const consultation = await this.prisma.consultation.findFirst({
      where: { accessToken: token },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.consultation.update({
      where: { id: consultation.id },
      data: {
        aiAnalysis: {
          ...(typeof consultation.aiAnalysis === 'object' && consultation.aiAnalysis !== null
            ? consultation.aiAnalysis
            : {}),
          customerName: dto.customerName,
          customerEmail: dto.customerEmail,
          customerPhone: dto.customerPhone,
          companyName: dto.companyName || null,
          businessNumber: dto.businessNumber || null,
        },
      },
    });

    return new ConsultationResponseDto(updated);
  }

  // ===== Authenticated methods =====

  async findAll(userId: string): Promise<ConsultationResponseDto[]> {
    const consultations = await this.prisma.consultation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return consultations.map((c) => new ConsultationResponseDto(c));
  }

  async findById(
    id: string,
    userId: string,
  ): Promise<ConsultationResponseDto> {
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        files: true,
        designs: true,
      },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    return new ConsultationResponseDto(consultation);
  }

  async create(
    userId: string,
    createConsultationDto: CreateConsultationDto,
  ): Promise<ConsultationResponseDto> {
    const { type, desiredDate, ...data } = createConsultationDto;

    const consultation = await this.prisma.consultation.create({
      data: {
        userId,
        type,
        ...data,
        desiredDate: desiredDate ? new Date(desiredDate) : null,
        status: ConsultationStatus.PENDING,
        analysisStatus:
          type === ConsultationType.ANALYSIS
            ? AnalysisStatus.PENDING
            : AnalysisStatus.SKIPPED,
        aiRisks: [],
      },
    });

    if (type === ConsultationType.ANALYSIS) {
      await this.discordService.requestFullAnalysis(consultation);
    }

    return new ConsultationResponseDto(consultation);
  }

  async getFiles(
    consultationId: string,
    userId: string,
  ): Promise<ConsultationFileResponseDto[]> {
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id: consultationId,
        userId,
      },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const files = await this.prisma.consultationFile.findMany({
      where: { consultationId },
      orderBy: { createdAt: 'desc' },
    });

    return files.map((f) => new ConsultationFileResponseDto(f));
  }

  async getDesigns(
    consultationId: string,
    userId: string,
  ): Promise<ConsultationDesignResponseDto[]> {
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id: consultationId,
        userId,
      },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const designs = await this.prisma.consultationDesign.findMany({
      where: { consultationId },
      orderBy: { createdAt: 'desc' },
    });

    return designs.map((d) => new ConsultationDesignResponseDto(d));
  }

  // ===== Admin methods (no userId filter) =====

  async findAllAdmin(): Promise<ConsultationResponseDto[]> {
    const consultations = await this.prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return consultations.map((c) => new ConsultationResponseDto(c));
  }

  async findByIdAdmin(id: string): Promise<ConsultationResponseDto> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
      include: {
        files: true,
        designs: true,
      },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    return new ConsultationResponseDto(consultation);
  }

  async canAccessConsultation(
    consultationId: string,
    userId: string,
  ): Promise<boolean> {
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id: consultationId,
        userId,
      },
    });

    return !!consultation;
  }

  async getStatsByStatus(
    userId: string,
  ): Promise<Record<ConsultationStatus, number>> {
    const consultations = await this.prisma.consultation.findMany({
      where: { userId },
      select: { status: true },
    });

    const stats: Record<ConsultationStatus, number> = {
      PENDING: 0,
      PROCESSING: 0,
      COMPLETED: 0,
      REJECTED: 0,
      CONVERTED: 0,
    };

    consultations.forEach((c) => {
      stats[c.status]++;
    });

    return stats;
  }
}
