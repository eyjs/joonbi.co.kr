import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty({
    description: '업로드된 파일 경로',
    example: '/uploads/documents/uuid/requirements.pdf',
  })
  @IsString()
  @IsNotEmpty()
  filePath: string;
}
