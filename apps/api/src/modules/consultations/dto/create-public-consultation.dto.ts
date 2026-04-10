import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class CreatePublicConsultationDto {
  @ApiProperty({
    description: '프로젝트 설명 (최소 50자)',
    example:
      '이커머스 쇼핑몰 웹사이트를 개발하고자 합니다. 상품 등록, 장바구니, 결제 기능이 필요합니다.',
  })
  @IsString()
  @MinLength(50, { message: '프로젝트 설명은 최소 50자 이상이어야 합니다.' })
  description: string;

  @ApiPropertyOptional({
    description: '참고 URL 목록',
    example: ['https://example.com'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  referenceUrls?: string[];

  @ApiPropertyOptional({
    description: '예산 범위',
    example: '500만원 ~ 1000만원',
  })
  @IsOptional()
  @IsString()
  budgetRange?: string;
}
