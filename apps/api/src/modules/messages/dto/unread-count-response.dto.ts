import { ApiProperty } from '@nestjs/swagger';

export class UnreadCountResponseDto {
  @ApiProperty({ description: '안 읽은 메시지 수' })
  count: number;

  constructor(count: number) {
    this.count = count;
  }
}
