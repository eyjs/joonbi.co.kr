import { ApiProperty } from '@nestjs/swagger';
import { ConsultationFile } from '@prisma/client';

export class ConsultationFileResponseDto {
  @ApiProperty({
    description: '파일 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '상담 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  consultationId: string;

  @ApiProperty({
    description: '파일 타입',
    example: 'application/pdf',
  })
  fileType: string;

  @ApiProperty({
    description: '파일명',
    example: '상담결과서.pdf',
  })
  fileName: string;

  @ApiProperty({
    description: '파일 경로',
    example: 'consultations/uuid/result.pdf',
  })
  filePath: string;

  @ApiProperty({
    description: '파일 크기 (bytes)',
    example: 1024000,
  })
  fileSize: number | null;

  @ApiProperty({
    description: '생성일시',
    example: '2026-02-01T10:00:00.000Z',
  })
  createdAt: Date;

  constructor(file: ConsultationFile) {
    Object.assign(this, file);
  }
}
