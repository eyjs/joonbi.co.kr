import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FeedbackStatus, FeedbackType } from '@prisma/client';

export class FeedbackResponseDto {
  @ApiProperty({ description: '피드백 ID', example: 'uuid' })
  id: string;

  @ApiProperty({ description: '산출물 ID', example: 'uuid' })
  documentId: string;

  @ApiProperty({
    description: '피드백 내용',
    example: '로그인 화면에서 비밀번호 찾기 버튼이 보이지 않습니다.',
  })
  content: string;

  @ApiProperty({
    enum: FeedbackType,
    description: '피드백 타입',
    example: FeedbackType.BUG,
  })
  type: FeedbackType;

  @ApiProperty({ description: '신규 기능 여부', example: false })
  isNewFeature: boolean;

  @ApiPropertyOptional({ description: '추가 비용', example: 500000 })
  extraCost?: number;

  @ApiProperty({
    enum: FeedbackStatus,
    description: '처리 상태',
    example: FeedbackStatus.PENDING,
  })
  status: FeedbackStatus;

  @ApiPropertyOptional({ description: '관리자 응답', example: '수정 완료했습니다.' })
  response?: string;

  @ApiProperty({ description: '생성일', example: '2026-02-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2026-02-01T00:00:00.000Z' })
  updatedAt: Date;
}
