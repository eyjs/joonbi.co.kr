import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum WebhookStatus {
  PAID = 'paid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export class PaymentWebhookDto {
  @ApiProperty({
    description: 'PG 거래 ID',
    example: 'imp_123456789',
  })
  @IsString()
  imp_uid: string;

  @ApiProperty({
    description: '가맹점 거래 ID',
    example: 'merchant_123456',
  })
  @IsString()
  merchant_uid: string;

  @ApiProperty({
    description: '결제 상태',
    enum: WebhookStatus,
  })
  @IsEnum(WebhookStatus)
  status: WebhookStatus;

  @ApiProperty({
    description: '결제 금액',
    example: 100000,
  })
  @IsInt()
  amount: number;

  @ApiProperty({
    description: '실패 사유',
    required: false,
  })
  @IsOptional()
  @IsString()
  fail_reason?: string;
}
