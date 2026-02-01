import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsArray,
  IsOptional,
  IsString,
  IsBoolean,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Feasibility } from '@prisma/client';

export class FeatureDto {
  @ApiProperty({ description: '기능명' })
  @IsString()
  name: string;

  @ApiProperty({ description: '기능 설명', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '가격' })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({ description: '필수 여부' })
  @IsBoolean()
  required: boolean;
}

export class SaveAnalysisDto {
  @ApiProperty({
    enum: Feasibility,
    description: '개발 가능성',
    example: 'FEASIBLE',
  })
  @IsEnum(Feasibility)
  feasibility: Feasibility;

  @ApiProperty({ description: '최소 견적', example: 1000000 })
  @IsInt()
  @Min(0)
  estimatedMin: number;

  @ApiProperty({ description: '최대 견적', example: 1500000 })
  @IsInt()
  @Min(0)
  estimatedMax: number;

  @ApiProperty({ description: '예상 개발 일수', example: 30 })
  @IsInt()
  @Min(1)
  estimatedDays: number;

  @ApiProperty({ description: '기능 목록', type: [FeatureDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  features: FeatureDto[];

  @ApiProperty({
    description: '리스크 목록',
    example: ['API 연동 필요', '외부 라이브러리 의존'],
  })
  @IsArray()
  @IsString({ each: true })
  risks: string[];

  @ApiProperty({
    description: '거절 사유 (INFEASIBLE인 경우)',
    required: false,
  })
  @IsString()
  @IsOptional()
  rejectReason?: string;
}
