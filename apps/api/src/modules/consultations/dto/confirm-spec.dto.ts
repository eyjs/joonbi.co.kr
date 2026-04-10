import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ConfirmSpecDto {
  @ApiPropertyOptional({
    description: '고객 코멘트',
    example: '기능 목록에서 A 기능은 필요 없을 것 같습니다.',
  })
  @IsOptional()
  @IsString()
  customerComment?: string;
}
