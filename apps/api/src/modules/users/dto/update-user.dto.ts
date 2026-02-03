import { IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '이름', example: '홍길동' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ description: '전화번호', example: '010-1234-5678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}

export class ChangePasswordDto {
  @ApiPropertyOptional({ description: '현재 비밀번호', example: 'OldPassword123!' })
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @ApiPropertyOptional({
    description: '새 비밀번호 (8자 이상, 대소문자+숫자 포함)',
    example: 'NewPassword123!',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다',
  })
  newPassword: string;
}
