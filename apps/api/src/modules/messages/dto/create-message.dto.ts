import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: '메시지 내용',
    example: '안녕하세요. 프로젝트 진행 관련 문의드립니다.',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: '첨부 파일 정보 (JSON)',
    example: { files: [{ name: 'document.pdf', url: 'https://...' }] },
    required: false,
  })
  @IsOptional()
  @IsObject()
  attachments?: Record<string, any>;
}
