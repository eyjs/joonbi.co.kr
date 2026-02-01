import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';

export class ProjectResponseDto {
  @ApiProperty({
    description: '프로젝트 ID',
    example: 'uuid-123',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: 'uuid-456',
  })
  userId: string;

  @ApiPropertyOptional({
    description: '상담 ID',
    example: 'uuid-789',
  })
  consultationId?: string;

  @ApiProperty({
    description: '프로젝트 코드 (JB-YYYYMMDD-XXX)',
    example: 'JB-20260201-001',
  })
  projectCode: string;

  @ApiProperty({
    description: '프로젝트 제목',
    example: '쇼핑몰 웹사이트 개발',
  })
  title: string;

  @ApiPropertyOptional({
    description: '프로젝트 설명',
    example: '반응형 쇼핑몰 웹사이트 개발',
  })
  description?: string;

  @ApiProperty({
    description: '프로젝트 상태',
    enum: ProjectStatus,
    example: 'IN_PROGRESS',
  })
  status: ProjectStatus;

  @ApiProperty({
    description: '진행률 (%)',
    example: 45,
  })
  progress: number;

  @ApiProperty({
    description: '총 금액 (원)',
    example: 10000000,
  })
  totalAmount: number;

  @ApiPropertyOptional({
    description: '계약금 (원)',
    example: 3000000,
  })
  contractAmount?: number;

  @ApiPropertyOptional({
    description: '잔금 (원)',
    example: 7000000,
  })
  finalAmount?: number;

  @ApiProperty({
    description: '선택 문서 금액 (원)',
    example: 0,
  })
  optionalDocsAmount: number;

  @ApiPropertyOptional({
    description: '시작 예정일',
    example: '2026-03-01T00:00:00Z',
  })
  startDate?: Date;

  @ApiPropertyOptional({
    description: '완료 예정일',
    example: '2026-06-01T00:00:00Z',
  })
  dueDate?: Date;

  @ApiPropertyOptional({
    description: '완료일',
    example: '2026-05-30T00:00:00Z',
  })
  completedDate?: Date;

  @ApiProperty({
    description: '포트폴리오 동의 여부',
    example: true,
  })
  portfolioAgreed: boolean;

  @ApiPropertyOptional({
    description: '포트폴리오 타입',
    example: 'FULL',
  })
  portfolioType?: string;

  @ApiPropertyOptional({
    description: 'A/S 시작일',
    example: '2026-06-01T00:00:00Z',
  })
  asStartDate?: Date;

  @ApiPropertyOptional({
    description: 'A/S 종료일',
    example: '2026-12-01T00:00:00Z',
  })
  asEndDate?: Date;

  @ApiProperty({
    description: '생성일',
    example: '2026-02-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2026-02-01T00:00:00Z',
  })
  updatedAt: Date;
}

export class ProjectProgressDto {
  @ApiProperty({
    description: '전체 진행률 (%)',
    example: 45,
  })
  totalProgress: number;

  @ApiProperty({
    description: '문서별 진행 상태',
    example: [
      { docCode: 'DOC-01', docName: '요구사항명세서', status: 'DELIVERED', weight: 20, completion: 100 },
      { docCode: 'DOC-02', docName: '소스코드', status: 'WORKING', weight: 50, completion: 30 },
    ],
  })
  documents: Array<{
    docCode: string;
    docName: string;
    status: string;
    weight: number;
    completion: number;
  }>;

  @ApiProperty({
    description: '다음 마일스톤',
    example: '소스코드 검토 요청',
  })
  nextMilestone?: string;
}

export class ProjectListResponseDto {
  @ApiProperty({
    description: '프로젝트 목록',
    type: [ProjectResponseDto],
  })
  data: ProjectResponseDto[];

  @ApiProperty({
    description: '메타 정보',
    example: {
      total: 100,
      page: 1,
      limit: 20,
    },
  })
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
