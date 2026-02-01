import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@prisma/client';

export class MessageResponseDto {
  @ApiProperty({ description: '메시지 ID' })
  id: string;

  @ApiProperty({ description: '프로젝트 ID' })
  projectId: string;

  @ApiProperty({ description: '발신자 ID' })
  senderId: string;

  @ApiProperty({ description: '메시지 내용' })
  content: string;

  @ApiProperty({ description: '읽음 여부' })
  isRead: boolean;

  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  constructor(message: Message) {
    this.id = message.id;
    this.projectId = message.projectId;
    this.senderId = message.senderId;
    this.content = message.content;
    this.isRead = message.isRead;
    this.createdAt = message.createdAt;
  }
}
