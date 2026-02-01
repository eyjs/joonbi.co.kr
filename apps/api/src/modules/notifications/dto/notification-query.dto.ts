import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { NotificationType } from '@prisma/client';

export class NotificationQueryDto {
  @ApiPropertyOptional({
    enum: NotificationType,
    description: '알림 타입 필터',
    example: NotificationType.DOCUMENT_UPLOADED,
  })
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @ApiPropertyOptional({
    description: '읽지 않은 알림만 조회',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  unreadOnly?: boolean;
}
