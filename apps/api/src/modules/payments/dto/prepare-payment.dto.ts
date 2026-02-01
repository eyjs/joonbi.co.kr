import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '@prisma/client';

export class PreparePaymentDto {
  @ApiProperty({
    description: '결제 타입',
    enum: PaymentType,
    example: 'CONSULTATION',
  })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({
    description: '결제 금액',
    example: 100000,
  })
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: '프로젝트 ID (선택)',
    required: false,
  })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({
    description: '주문명',
    example: '분석 상담 비용',
  })
  @IsString()
  orderName: string;
}
