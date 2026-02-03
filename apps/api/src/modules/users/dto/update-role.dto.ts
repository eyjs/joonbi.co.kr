import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateRoleDto {
  @ApiProperty({ description: '역할', enum: Role, example: Role.ADMIN })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
