import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';

export class NotificationResponseDto {
  @ApiProperty({
    description: '알림 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId: string;

  @ApiProperty({
    enum: NotificationType,
    description: '알림 타입',
    example: NotificationType.DOCUMENT_UPLOADED,
  })
  type: NotificationType;

  @ApiProperty({
    description: '알림 제목',
    example: '산출물이 업로드되었습니다',
  })
  title: string;

  @ApiProperty({
    description: '알림 내용',
    example: '요구사항명세서가 업로드되었습니다. 검토를 진행해주세요.',
  })
  content: string;

  @ApiPropertyOptional({
    description: '관련 링크',
    example: '/projects/550e8400-e29b-41d4-a716-446655440002/documents/DOC-01',
  })
  link?: string | null;

  @ApiProperty({
    description: '읽음 여부',
    example: false,
  })
  isRead: boolean;

  @ApiProperty({
    description: '생성일시',
    example: '2026-02-01T10:00:00.000Z',
  })
  createdAt: Date;

  constructor(notification: any) {
    Object.assign(this, notification);
  }
}
