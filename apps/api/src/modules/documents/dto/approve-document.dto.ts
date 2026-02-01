import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ApproveDocumentDto {
  @ApiPropertyOptional({
    description: '승인 메모',
    example: '검토 완료했습니다. 승인합니다.',
  })
  @IsOptional()
  @IsString()
  memo?: string;
}
