import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';
import { FeedbackType } from '@prisma/client';

export class CreateFeedbackDto {
  @ApiProperty({
    description: '피드백 내용 (최소 10자)',
    example: '로그인 화면에서 비밀번호 찾기 버튼이 보이지 않습니다.',
  })
  @IsString()
  @MinLength(10, { message: '피드백 내용은 최소 10자 이상이어야 합니다.' })
  content: string;

  @ApiProperty({
    enum: FeedbackType,
    description: '피드백 타입',
    example: FeedbackType.BUG,
  })
  @IsEnum(FeedbackType)
  type: FeedbackType;

  @ApiPropertyOptional({
    description: '신규 기능 여부',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isNewFeature?: boolean;

  @ApiPropertyOptional({
    description: '추가 비용 (신규 기능인 경우)',
    example: 500000,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  extraCost?: number;
}
