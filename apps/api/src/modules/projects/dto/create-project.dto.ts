import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: '상담 ID (상담 전환 시 필수)',
    example: 'uuid-123',
  })
  @IsOptional()
  @IsString()
  consultationId?: string;

  @ApiProperty({
    description: '사용자 ID',
    example: 'uuid-456',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: '프로젝트 제목',
    example: '쇼핑몰 웹사이트 개발',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: '프로젝트 설명',
    example: '반응형 쇼핑몰 웹사이트 개발',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: '총 금액 (원)',
    example: 10000000,
  })
  @IsNotEmpty()
  @IsInt()
  totalAmount: number;

  @ApiPropertyOptional({
    description: '계약금 (원, 기본 30%)',
    example: 3000000,
  })
  @IsOptional()
  @IsInt()
  contractAmount?: number;

  @ApiPropertyOptional({
    description: '잔금 (원, 기본 70%)',
    example: 7000000,
  })
  @IsOptional()
  @IsInt()
  finalAmount?: number;

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
    description: '포트폴리오 동의 여부',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  portfolioAgreed?: boolean;

  @ApiPropertyOptional({
    description: '포트폴리오 타입 (전체공개/부분공개/비공개)',
    example: 'FULL',
  })
  @IsOptional()
  @IsString()
  portfolioType?: string;

  @ApiPropertyOptional({
    description: 'A/S 시작일 (완료 후)',
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
