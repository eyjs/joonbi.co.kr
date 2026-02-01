import { IsString, IsOptional, IsInt, IsBoolean, IsDateString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: '프로젝트 제목',
    example: '쇼핑몰 웹사이트 개발',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: '프로젝트 설명',
    example: '반응형 쇼핑몰 웹사이트 개발',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: '프로젝트 상태',
    enum: ProjectStatus,
    example: 'IN_PROGRESS',
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({
    description: '총 금액 (원)',
    example: 10000000,
  })
  @IsOptional()
  @IsInt()
  totalAmount?: number;

  @ApiPropertyOptional({
    description: '계약금 (원)',
    example: 3000000,
  })
  @IsOptional()
  @IsInt()
  contractAmount?: number;

  @ApiPropertyOptional({
    description: '잔금 (원)',
    example: 7000000,
  })
  @IsOptional()
  @IsInt()
  finalAmount?: number;

  @ApiPropertyOptional({
    description: '선택 문서 금액 (원)',
    example: 500000,
  })
  @IsOptional()
  @IsInt()
  optionalDocsAmount?: number;

  @ApiPropertyOptional({
    description: '시작 예정일',
    example: '2026-03-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: '완료 예정일',
    example: '2026-06-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    description: '완료일',
    example: '2026-05-30T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  completedDate?: string;

  @ApiPropertyOptional({
    description: '포트폴리오 동의 여부',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  portfolioAgreed?: boolean;

  @ApiPropertyOptional({
    description: '포트폴리오 타입',
    example: 'FULL',
  })
  @IsOptional()
  @IsString()
  portfolioType?: string;

  @ApiPropertyOptional({
    description: 'A/S 시작일',
    example: '2026-06-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  asStartDate?: string;

  @ApiPropertyOptional({
    description: 'A/S 종료일',
    example: '2026-12-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  asEndDate?: string;
}
