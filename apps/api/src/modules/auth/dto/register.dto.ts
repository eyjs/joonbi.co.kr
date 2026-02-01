import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '유효한 이메일 주소를 입력하세요.' })
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: '비밀번호 (영문 대소문자, 숫자 포함 8자 이상)',
    example: 'Password123!',
  })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @IsString()
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional({
    description: '연락처',
    example: '010-1234-5678',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
