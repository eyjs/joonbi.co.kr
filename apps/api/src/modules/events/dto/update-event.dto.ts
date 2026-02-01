import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    description: '이벤트 타입',
    example: 'OPENING_EVENT',
    required: false,
  })
  @IsString()
  @IsOptional()
  eventType?: string;

  @ApiProperty({
    description: '총 슬롯 수',
    example: 10,
    minimum: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  totalSlots?: number;

  @ApiProperty({
    description: '사용된 슬롯 수',
    example: 5,
    minimum: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  usedSlots?: number;

  @ApiProperty({
    description: '이벤트 활성화 여부',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
