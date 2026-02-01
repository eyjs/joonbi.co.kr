import { ApiProperty } from '@nestjs/swagger';

export class EventResponseDto {
  @ApiProperty({
    description: '이벤트 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '이벤트 타입',
    example: 'OPENING_EVENT',
  })
  eventType: string;

  @ApiProperty({
    description: '총 슬롯 수',
    example: 10,
  })
  totalSlots: number;

  @ApiProperty({
    description: '사용된 슬롯 수',
    example: 5,
  })
  usedSlots: number;

  @ApiProperty({
    description: '남은 슬롯 수',
    example: 5,
  })
  remainingSlots: number;

  @ApiProperty({
    description: '이벤트 활성화 여부',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: '생성 일시',
    example: '2026-02-01T10:00:00.000Z',
  })
  createdAt: Date;
}
