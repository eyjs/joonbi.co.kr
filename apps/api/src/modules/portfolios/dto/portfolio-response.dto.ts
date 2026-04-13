import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PortfolioDisplay, PortfolioSectionType } from '@prisma/client';
import type { JsonValue } from '@prisma/client/runtime/library';

export class PortfolioImageDto {
  @ApiProperty({ description: '이미지 ID' })
  id: string;

  @ApiProperty({ description: '이미지 URL' })
  imageUrl: string;

  @ApiProperty({ description: '표시 순서' })
  displayOrder: number;

  @ApiProperty({ description: '생성 시각' })
  createdAt: Date;
}

export class PortfolioSectionResponseDto {
  @ApiProperty({ description: '섹션 ID' })
  id: string;

  @ApiProperty({ description: '섹션 타입', enum: PortfolioSectionType })
  sectionType: PortfolioSectionType;

  @ApiPropertyOptional({ description: '섹션 제목' })
  title?: string;

  @ApiProperty({ description: '표시 순서' })
  displayOrder: number;

  @ApiPropertyOptional({ description: '마크다운 텍스트' })
  textContent?: string;

  @ApiPropertyOptional({ description: '동영상 URL' })
  videoUrl?: string;

  @ApiPropertyOptional({ description: 'Mermaid DSL 코드' })
  diagramCode?: string;

  @ApiPropertyOptional({ description: '다이어그램 종류' })
  diagramKind?: string;

  @ApiPropertyOptional({ description: '파일 URL' })
  fileUrl?: string;

  @ApiPropertyOptional({ description: '원본 파일명' })
  fileName?: string;

  @ApiPropertyOptional({ description: '캡션' })
  caption?: string;

  @ApiPropertyOptional({ description: '이미지 URL 목록', type: [String] })
  imageUrls?: string[];

  @ApiProperty({ description: '생성 시각' })
  createdAt: Date;

  @ApiProperty({ description: '수정 시각' })
  updatedAt: Date;
}

export class PortfolioResponseDto {
  @ApiProperty({ description: '포트폴리오 ID' })
  id: string;

  @ApiProperty({ description: '프로젝트 ID' })
  projectId: string;

  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: 'URL slug' })
  slug: string;

  @ApiPropertyOptional({ description: '설명' })
  description?: string;

  @ApiPropertyOptional({ description: '썸네일 URL' })
  thumbnailUrl?: string;

  @ApiProperty({ description: '공개 유형', enum: PortfolioDisplay })
  displayType: PortfolioDisplay;

  @ApiProperty({ description: '공개 여부' })
  isPublic: boolean;

  @ApiPropertyOptional({ description: '사용 기술 태그', type: [String] })
  techStack?: string[];

  @ApiPropertyOptional({ description: '업종/카테고리' })
  category?: string;

  @ApiPropertyOptional({ description: '프로젝트 완료일' })
  completedAt?: Date;

  @ApiPropertyOptional({ description: '클라이언트명' })
  clientName?: string;

  @ApiPropertyOptional({ description: '한줄 요약' })
  summary?: string;

  @ApiPropertyOptional({ description: '프로젝트 기간' })
  duration?: string;

  @ApiPropertyOptional({ description: '대표 영상 URL' })
  heroVideoUrl?: string;

  @ApiPropertyOptional({ description: 'Before 항목' })
  beforeItems?: JsonValue;

  @ApiPropertyOptional({ description: 'After 항목' })
  afterItems?: JsonValue;

  @ApiPropertyOptional({ description: '타임라인' })
  milestones?: JsonValue;

  @ApiPropertyOptional({ description: '이미지 목록', type: [PortfolioImageDto] })
  images?: PortfolioImageDto[];

  @ApiPropertyOptional({ description: '섹션 목록', type: [PortfolioSectionResponseDto] })
  sections?: PortfolioSectionResponseDto[];

  @ApiProperty({ description: '생성 시각' })
  createdAt: Date;

  @ApiProperty({ description: '수정 시각' })
  updatedAt: Date;
}

export class PortfolioListResponseDto {
  @ApiProperty({ description: '포트폴리오 목록', type: [PortfolioResponseDto] })
  data: PortfolioResponseDto[];

  @ApiProperty({
    description: '메타데이터',
    example: { total: 100, page: 1, limit: 20 },
  })
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
