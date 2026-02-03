import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ description: '사용자 ID' })
  id: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiPropertyOptional({ description: '전화번호' })
  phone?: string;

  @ApiProperty({ description: '역할', enum: Role })
  role: Role;

  @ApiProperty({ description: '생성 시각' })
  createdAt: Date;

  @ApiProperty({ description: '수정 시각' })
  updatedAt: Date;
}

export class UserListResponseDto {
  @ApiProperty({ description: '사용자 목록', type: [UserResponseDto] })
  data: UserResponseDto[];

  @ApiProperty({
    description: '메타데이터',
    example: { total: 100, page: 1, limit: 20 },
  })
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
