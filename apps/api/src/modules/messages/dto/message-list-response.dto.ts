import { ApiProperty } from '@nestjs/swagger';
import { MessageResponseDto } from './message-response.dto';

export class MessageListResponseDto {
  @ApiProperty({ description: '메시지 목록', type: [MessageResponseDto] })
  messages: MessageResponseDto[];

  @ApiProperty({ description: '전체 메시지 수' })
  total: number;

  constructor(messages: MessageResponseDto[], total: number) {
    this.messages = messages;
    this.total = total;
  }
}
