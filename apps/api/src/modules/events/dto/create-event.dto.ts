import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: '이벤트 타입',
    example: 'OPENING_EVENT',
  })
  @IsString()
  eventType: string;

  @ApiProperty({
    description: '총 슬롯 수',
    example: 10,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  totalSlots: number;

  @ApiProperty({
    description: '이벤트 활성화 여부',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
