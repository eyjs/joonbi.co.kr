import { IsEnum, IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FeedbackStatus } from '@prisma/client';

export class UpdateFeedbackDto {
  @ApiPropertyOptional({ enum: FeedbackStatus, description: '피드백 상태' })
  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;

  @ApiPropertyOptional({ description: '관리자 응답' })
  @IsOptional()
  @IsString()
  response?: string;

  @ApiPropertyOptional({ description: '추가 비용', minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  extraCost?: number;
}
