import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateConsultationDto,
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
