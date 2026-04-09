import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PortfolioDisplay } from '@prisma/client';

export class CreatePortfolioImageDto {
  @ApiProperty({ description: '이미지 URL', example: 'https://example.com/image.jpg' })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: '표시 순서', example: 1 })
  @IsNotEmpty()
  displayOrder: number;
}

export class CreatePortfolioDto {
  @ApiProperty({ description: '프로젝트 ID', example: 'uuid-123' })
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @ApiProperty({ description: '포트폴리오 제목', example: '쇼핑몰 웹사이트 개발' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'URL slug', example: 'shopping-mall-website' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiPropertyOptional({ description: '설명', example: 'React + Node.js 기반 전자상거래 플랫폼' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: '썸네일 URL', example: 'https://example.com/thumb.jpg' })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({
    description: '공개 유형',
    enum: PortfolioDisplay,
    example: PortfolioDisplay.ANONYMOUS,
  })
  @IsNotEmpty()
  @IsEnum(PortfolioDisplay)
  displayType: PortfolioDisplay;

  @ApiProperty({ description: '공개 여부', example: true })
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @ApiPropertyOptional({
    description: '사용 기술 태그',
    example: ['React', 'NestJS', 'PostgreSQL'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @ApiPropertyOptional({ description: '업종/카테고리', example: '쇼핑몰' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: '프로젝트 완료일', example: '2026-01-15T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @ApiPropertyOptional({ description: '클라이언트명 (displayType=FULL일 때만 노출)', example: '주식회사 ABC' })
  @IsOptional()
  @IsString()
  clientName?: string;

  @ApiPropertyOptional({
    description: '포트폴리오 이미지 목록',
    type: [CreatePortfolioImageDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePortfolioImageDto)
  images?: CreatePortfolioImageDto[];
}
