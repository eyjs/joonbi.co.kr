import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FeedbackType, FeedbackStatus } from '@prisma/client';

export class FeedbackResponseDto {
  @ApiProperty({ description: '피드백 ID' })
  id: string;

  @ApiProperty({ description: '문서 ID' })
  documentId: string;

  @ApiProperty({ description: '피드백 내용' })
  content: string;

  @ApiProperty({ enum: FeedbackType, description: '피드백 타입' })
  type: FeedbackType;

  @ApiProperty({ description: '신규 기능 여부' })
  isNewFeature: boolean;

  @ApiPropertyOptional({ description: '추가 비용' })
  extraCost: number | null;

  @ApiProperty({ enum: FeedbackStatus, description: '피드백 상태' })
  status: FeedbackStatus;

  @ApiPropertyOptional({ description: '관리자 응답' })
  response: string | null;

  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @ApiProperty({ description: '수정일시' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: '문서 정보' })
  document?: {
    id: string;
    docCode: string;
    docName: string;
    docType: string;
  };
}

export class FeedbackListResponseDto {
  @ApiProperty({ type: [FeedbackResponseDto], description: '피드백 목록' })
  data: FeedbackResponseDto[];

  @ApiProperty({ description: '총 개수' })
  total: number;

  @ApiProperty({ description: '현재 페이지' })
  page: number;

  @ApiProperty({ description: '페이지 크기' })
  limit: number;

  @ApiProperty({ description: '총 페이지 수' })
  totalPages: number;
}
