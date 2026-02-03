import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  UpdateUserDto,
  ChangePasswordDto,
  UpdateRoleDto,
  UserResponseDto,
  UserListResponseDto,
} from './dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '@/common/types';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '내 정보 조회 성공',
    type: UserResponseDto,
  })
  async getMe(@CurrentUser() user: AuthenticatedUser): Promise<UserResponseDto> {
    return this.usersService.findMe(user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiResponse({
    status: 200,
    description: '정보 수정 성공',
    type: UserResponseDto,
  })
  async updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateMe(user.id, dto);
  }

  @Patch('me/password')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiResponse({ status: 204, description: '비밀번호 변경 성공' })
  @ApiResponse({ status: 401, description: '현재 비밀번호 불일치' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangePasswordDto,
  ): Promise<void> {
    return this.usersService.changePassword(user.id, dto);
  }
}

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '[관리자] 사용자 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '사용자 목록 조회 성공',
    type: UserListResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<UserListResponseDto> {
    return this.usersService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '[관리자] 사용자 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '사용자 상세 조회 성공',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: '[관리자] 사용자 역할 변경' })
  @ApiResponse({
    status: 200,
    description: '역할 변경 성공',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다' })
  @ApiResponse({ status: 409, description: '이미 동일한 역할입니다' })
  async updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateRole(id, dto);
  }
}
