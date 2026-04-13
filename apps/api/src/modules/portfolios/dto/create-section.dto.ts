import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  IsArray,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PortfolioSectionType } from '@prisma/client';

export class CreateSectionDto {
  @ApiProperty({
    description: '섹션 타입',
    enum: PortfolioSectionType,
    example: PortfolioSectionType.OVERVIEW,
  })
  @IsNotEmpty()
  @IsEnum(PortfolioSectionType)
  sectionType: PortfolioSectionType;

  @ApiPropertyOptional({ description: '섹션 제목', example: '프로젝트 개요' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '표시 순서', example: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  displayOrder: number;

  @ApiPropertyOptional({ description: '마크다운 텍스트 (OVERVIEW, BRIEF 타입)' })
  @IsOptional()
  @IsString()
  textContent?: string;

  @ApiPropertyOptional({ description: '동영상 URL (VIDEO 타입)' })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({ description: 'Mermaid DSL 코드 (DIAGRAM 타입)' })
  @IsOptional()
  @IsString()
  diagramCode?: string;

  @ApiPropertyOptional({ description: '다이어그램 종류 (flowchart, sequence, erd 등)' })
  @IsOptional()
  @IsString()
  diagramKind?: string;

  @ApiPropertyOptional({ description: '파일 URL (DOCUMENT 타입)' })
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiPropertyOptional({ description: '원본 파일명 (DOCUMENT 타입)' })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiPropertyOptional({ description: '캡션 (SCREENSHOT, VIDEO 타입)' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ description: '이미지 URL 목록 (SCREENSHOT 타입)', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}
