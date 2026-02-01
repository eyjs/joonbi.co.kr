import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DiscordService } from '../discord/discord.service';
import {
  SaveAnalysisDto,
  UploadDocumentsDto,
  SaveDesignsDto,
  AnalysisFailDto,
  DocumentType,
} from './dto';
import {
  Consultation,
  AnalysisStatus,
  ConsultationStatus,
} from '@prisma/client';

@Injectable()
export class InternalService {
  private readonly logger = new Logger(InternalService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly discordService: DiscordService,
  ) {}

  async getPendingConsultations(): Promise<Consultation[]> {
    return this.prisma.consultation.findMany({
      where: {
        type: 'ANALYSIS',
        analysisStatus: AnalysisStatus.PENDING,
      },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });
  }

  async getConsultation(id: string): Promise<Consultation> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    return consultation;
  }

  async startAnalysis(id: string): Promise<Consultation> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.consultation.update({
      where: { id },
      data: {
        analysisStatus: AnalysisStatus.PROCESSING,
        analysisStartedAt: new Date(),
      },
    });

    this.logger.log(`분석 시작: ${id} - ${consultation.projectName}`);

    return updated;
  }

  async saveAnalysis(
    id: string,
    dto: SaveAnalysisDto,
  ): Promise<Consultation> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.consultation.update({
      where: { id },
      data: {
        analysisStatus: AnalysisStatus.DONE,
        aiAnalyzedAt: new Date(),
        aiFeasibility: dto.feasibility,
        aiEstimatedMin: dto.estimatedMin,
        aiEstimatedMax: dto.estimatedMax,
        aiEstimatedDays: dto.estimatedDays,
        aiFeatures: dto.features,
        aiRisks: dto.risks,
        aiRejectReason: dto.rejectReason,
        aiAnalysis: dto,
      },
    });

    this.logger.log(`분석 결과 저장 완료: ${id} - ${dto.feasibility}`);

    await this.discordService.notifyAnalysisComplete(updated);

    return updated;
  }

  async failAnalysis(id: string, dto: AnalysisFailDto): Promise<Consultation> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.consultation.update({
      where: { id },
      data: {
        analysisStatus: AnalysisStatus.FAILED,
        analysisError: dto.error,
      },
    });

    this.logger.error(`분석 실패: ${id} - ${dto.error}`);

    return updated;
  }

  async uploadDocuments(
    id: string,
    dto: UploadDocumentsDto,
  ): Promise<{ success: boolean; fileCount: number }> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    const fileTypeNames: Record<DocumentType, string> = {
      [DocumentType.ANALYSIS]: '업무분석서',
      [DocumentType.REQUIREMENTS]: '요구사항명세서',
      [DocumentType.PLAN]: '샘플기획서',
      [DocumentType.QUOTATION]: '견적서',
    };

    await Promise.all(
      dto.documents.map(async (doc) => {
        return this.prisma.consultationFile.create({
          data: {
            consultationId: id,
            fileType: doc.type,
            fileName: fileTypeNames[doc.type],
            filePath: `consultations/${id}/${doc.type}.md`,
          },
        });
      }),
    );

    this.logger.log(`문서 업로드 완료: ${id} - ${dto.documents.length}개`);

    return {
      success: true,
      fileCount: dto.documents.length,
    };
  }

  async saveDesigns(
    id: string,
    dto: SaveDesignsDto,
  ): Promise<{ success: boolean }> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('상담을 찾을 수 없습니다.');
    }

    await this.prisma.consultationDesign.create({
      data: {
        consultationId: id,
        figmaFileUrl: dto.figmaFileUrl,
        screens: dto.screens,
      },
    });

    await this.prisma.consultationFile.create({
      data: {
        consultationId: id,
        fileType: 'design',
        fileName: '샘플 화면설계',
        filePath: dto.figmaFileUrl,
      },
    });

    await this.prisma.consultation.update({
      where: { id },
      data: {
        status: ConsultationStatus.COMPLETED,
      },
    });

    this.logger.log(
      `화면설계 저장 완료: ${id} - ${dto.screens.length}개 화면`,
    );

    return { success: true };
  }
}
