import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AnalysisFailDto {
  @ApiProperty({ description: '에러 메시지', example: 'AI 분석 중 오류 발생' })
  @IsString()
  error: string;
}
