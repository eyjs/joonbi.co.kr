import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ConsultationType,
  ConsultationStatus,
  AnalysisStatus,
  Feasibility,
} from '@prisma/client';

export class ConsultationResponseDto {
  @ApiProperty({
    description: '상담 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId: string;

  @ApiProperty({
    enum: ConsultationType,
    description: '상담 타입 (SIMPLE: 간편상담, ANALYSIS: 분석상담)',
    example: ConsultationType.SIMPLE,
  })
  type: ConsultationType;

  @ApiProperty({
    description: '프로젝트명',
    example: '쇼핑몰 웹사이트 개발',
  })
  projectName: string;

  @ApiProperty({
    description: '프로젝트 설명',
    example: '의류 쇼핑몰 웹사이트를 개발하고자 합니다...',
  })
  description: string;

  @ApiProperty({
    description: '참고 URL 목록',
    example: ['https://example.com'],
    type: [String],
  })
  referenceUrls: string[];

  @ApiPropertyOptional({
    description: '예산 범위',
    example: '500만원 ~ 1000만원',
  })
  budgetRange?: string | null;

  @ApiPropertyOptional({
    description: '희망 완료 날짜',
    example: '2026-03-31T00:00:00.000Z',
  })
  desiredDate?: Date | null;

  @ApiProperty({
    enum: ConsultationStatus,
    description: '상담 상태',
    example: ConsultationStatus.PENDING,
  })
  status: ConsultationStatus;

  @ApiProperty({
    enum: AnalysisStatus,
    description: 'AI 분석 상태',
    example: AnalysisStatus.PENDING,
  })
  analysisStatus: AnalysisStatus;

  @ApiPropertyOptional({
    description: '분석 시작 시간',
    example: '2026-02-01T10:05:00.000Z',
  })
  analysisStartedAt?: Date | null;

  @ApiPropertyOptional({
    description: '분석 에러 메시지',
    example: 'API rate limit exceeded',
  })
  analysisError?: string | null;

  @ApiPropertyOptional({
    description: 'AI 분석 완료 시간',
    example: '2026-02-01T10:10:00.000Z',
  })
  aiAnalyzedAt?: Date | null;

  @ApiPropertyOptional({
    enum: Feasibility,
    description: 'AI 실행가능성 판정',
    example: Feasibility.FEASIBLE,
  })
  aiFeasibility?: Feasibility | null;

  @ApiPropertyOptional({
    description: 'AI 예상 금액 최소값',
    example: 5000000,
  })
  aiEstimatedMin?: number | null;

  @ApiPropertyOptional({
    description: 'AI 예상 금액 최대값',
    example: 10000000,
  })
  aiEstimatedMax?: number | null;

  @ApiPropertyOptional({
    description: 'AI 예상 개발 일수',
    example: 60,
  })
  aiEstimatedDays?: number | null;

  @ApiPropertyOptional({
    description: 'AI 추출 기능 목록',
    example: [
      { name: '로그인/회원가입', price: 200000, required: true },
      { name: '상품 목록', price: 150000, required: true },
    ],
  })
  aiFeatures?: any;

  @ApiPropertyOptional({
    description: 'AI 식별 리스크',
    example: ['PG 연동 복잡도', '모바일 최적화'],
    type: [String],
  })
  aiRisks: string[];

  @ApiPropertyOptional({
    description: 'AI 거절 사유',
    example: '예산이 최소 요구사항보다 낮습니다.',
  })
  aiRejectReason?: string | null;

  @ApiPropertyOptional({
    description: 'AI 전체 분석 결과',
    example: { summary: '...', techStack: '...' },
  })
  aiAnalysis?: any;

  @ApiProperty({
    description: '생성일시',
    example: '2026-02-01T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일시',
    example: '2026-02-01T15:00:00.000Z',
  })
  updatedAt: Date;

  constructor(consultation: any) {
    Object.assign(this, consultation);
  }
}
