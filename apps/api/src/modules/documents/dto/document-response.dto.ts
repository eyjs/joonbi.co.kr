import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DocumentStatus, DocumentType } from '@prisma/client';

export class DocumentResponseDto {
  @ApiProperty({ description: '산출물 ID', example: 'uuid' })
  id: string;

  @ApiProperty({ description: '프로젝트 ID', example: 'uuid' })
  projectId: string;

  @ApiProperty({ description: '산출물 코드', example: 'DOC-01' })
  docCode: string;

  @ApiProperty({
    enum: DocumentType,
    description: '산출물 타입',
    example: DocumentType.REQUIREMENTS,
  })
  docType: DocumentType;

  @ApiProperty({ description: '산출물 이름', example: '요구사항명세서' })
  docName: string;

  @ApiProperty({
    enum: DocumentStatus,
    description: '상태',
    example: DocumentStatus.WAITING,
  })
  status: DocumentStatus;

  @ApiProperty({ description: '가중치 (%)', example: 20 })
  weight: number;

  @ApiPropertyOptional({ description: '파일 경로', example: '/uploads/doc.pdf' })
  filePath?: string;

  @ApiPropertyOptional({
    description: '검토 마감일',
    example: '2026-02-10T00:00:00.000Z',
  })
  reviewDeadline?: Date;

  @ApiProperty({ description: '피드백 개수', example: 2 })
  feedbackItemCount: number;

  @ApiProperty({ description: '피드백 제한 개수', example: 5 })
  feedbackLimit: number;

  @ApiProperty({ description: '생성일', example: '2026-02-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2026-02-01T00:00:00.000Z' })
  updatedAt: Date;
}
