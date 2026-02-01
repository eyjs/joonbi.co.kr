import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { DocumentStatus } from '@prisma/client';

export class UpdateDocumentStatusDto {
  @ApiProperty({
    enum: DocumentStatus,
    description: '변경할 상태',
    example: DocumentStatus.WORKING,
  })
  @IsEnum(DocumentStatus)
  status: DocumentStatus;
}
