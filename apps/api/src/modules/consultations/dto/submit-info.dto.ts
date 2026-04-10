import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class SubmitInfoDto {
  @ApiProperty({
    description: '고객 이름',
    example: '홍길동',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: '고객 이메일',
    example: 'customer@example.com',
  })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({
    description: '고객 전화번호',
    example: '010-1234-5678',
  })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiPropertyOptional({
    description: '회사명',
    example: '주식회사 예시',
  })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({
    description: '사업자등록번호',
    example: '123-45-67890',
  })
  @IsOptional()
  @IsString()
  businessNumber?: string;
}
