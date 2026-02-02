import {
  Controller,
  Get,
  Post,
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
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectResponseDto,
  ProjectListResponseDto,
  ProjectProgressDto,
} from './dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '@/common/types';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: '내 프로젝트 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '프로젝트 목록 조회 성공',
    type: ProjectListResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ProjectListResponseDto> {
    return this.projectsService.findAll(
      user.id,
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '프로젝트 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '프로젝트 상세 조회 성공',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  async findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ): Promise<ProjectResponseDto> {
    return this.projectsService.findOne(id, user.id);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: '프로젝트 진행률 조회' })
  @ApiResponse({
    status: 200,
    description: '진행률 조회 성공',
    type: ProjectProgressDto,
  })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  async getProgress(@Param('id') id: string): Promise<ProjectProgressDto> {
    return this.projectsService.getProgress(id);
  }
}

@ApiTags('admin/projects')
@Controller('admin/projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: '[관리자] 전체 프로젝트 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '프로젝트 목록 조회 성공',
    type: ProjectListResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ProjectListResponseDto> {
    return this.projectsService.findAll(
      undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Post()
  @ApiOperation({ summary: '[관리자] 프로젝트 생성 (상담 전환)' })
  @ApiResponse({
    status: 201,
    description: '프로젝트 생성 성공',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProjectDto): Promise<ProjectResponseDto> {
    return this.projectsService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '[관리자] 프로젝트 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '프로젝트 상세 조회 성공',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '[관리자] 프로젝트 수정' })
  @ApiResponse({
    status: 200,
    description: '프로젝트 수정 성공',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.projectsService.update(id, dto);
  }
}
