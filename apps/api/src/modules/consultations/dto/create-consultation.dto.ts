import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsArray,
  IsOptional,
  MinLength,
  IsDateString,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';
import { ConsultationType } from '@prisma/client';

export class CreateConsultationDto {
  @ApiProperty({
    enum: ConsultationType,
    description: '상담 타입 (SIMPLE: 간편상담/무료, ANALYSIS: 분석상담/10만원)',
    example: ConsultationType.SIMPLE,
  })
  @IsEnum(ConsultationType)
  type: ConsultationType;

  @ApiProperty({
    description: '프로젝트명',
    example: '쇼핑몰 웹사이트 개발',
  })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({
    description: '프로젝트 설명 (최소 100자)',
    example:
      '의류 쇼핑몰 웹사이트를 개발하고자 합니다. 상품 등록, 장바구니, 결제 기능이 필요하며, 관리자 페이지도 포함되어야 합니다. 반응형 디자인으로 모바일에서도 이용 가능해야 합니다.',
  })
  @IsString()
  @MinLength(100, { message: '프로젝트 설명은 최소 100자 이상이어야 합니다.' })
  description: string;

  @ApiProperty({
    description: '참고 URL 목록 (최소 1개)',
    example: ['https://example.com', 'https://reference.com'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1, { message: '참고 URL을 최소 1개 이상 입력해주세요.' })
  @IsString({ each: true })
  referenceUrls: string[];

  @ApiPropertyOptional({
    description: '예산 범위',
    example: '500만원 ~ 1000만원',
  })
  @IsOptional()
  @IsString()
  budgetRange?: string;

  @ApiPropertyOptional({
    description: '희망 완료 날짜',
    example: '2026-03-31T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  desiredDate?: string;
}
