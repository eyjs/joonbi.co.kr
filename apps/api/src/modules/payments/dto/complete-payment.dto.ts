import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompletePaymentDto {
  @ApiProperty({
    description: '결제 ID',
    example: 'uuid-xxxx',
  })
  @IsString()
  paymentId: string;

  @ApiProperty({
    description: 'PG 거래 ID',
    example: 'imp_123456789',
  })
  @IsString()
  pgTid: string;

  @ApiProperty({
    description: 'PG Provider',
    example: 'PortOne',
  })
  @IsString()
  pgProvider: string;
}
