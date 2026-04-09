import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfoliosService } from './portfolios.service';
import { PortfolioUploadService } from './portfolio-upload.service';
import {
  CreatePortfolioDto,
  UpdatePortfolioDto,
  CreateSectionDto,
  UpdateSectionDto,
  ReorderSectionsDto,
  PortfolioResponseDto,
  PortfolioListResponseDto,
  PortfolioSectionResponseDto,
} from './dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

// ==================== 공개 API ====================

@ApiTags('portfolios')
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Get()
  @ApiOperation({ summary: '공개 포트폴리오 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '포트폴리오 목록 조회 성공',
    type: PortfolioListResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PortfolioListResponseDto> {
    return this.portfoliosService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Get(':idOrSlug')
  @ApiOperation({ summary: '포트폴리오 상세 조회 (ID 또는 slug)' })
  @ApiResponse({
    status: 200,
    description: '포트폴리오 상세 조회 성공',
    type: PortfolioResponseDto,
  })
  @ApiResponse({ status: 404, description: '포트폴리오를 찾을 수 없습니다' })
  async findOne(@Param('idOrSlug') idOrSlug: string): Promise<PortfolioResponseDto> {
    // UUID 형식이면 id로 조회, 아니면 slug로 조회
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    if (isUuid) {
      return this.portfoliosService.findOne(idOrSlug);
    }

    return this.portfoliosService.findBySlug(idOrSlug);
  }
}

// ==================== 관리자 API ====================

@ApiTags('admin/portfolios')
@Controller('admin/portfolios')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminPortfoliosController {
  constructor(
    private readonly portfoliosService: PortfoliosService,
    private readonly uploadService: PortfolioUploadService,
  ) {}

  @Get()
  @ApiOperation({ summary: '[관리자] 포트폴리오 전체 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '포트폴리오 전체 목록 조회 성공',
    type: PortfolioListResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PortfolioListResponseDto> {
    return this.portfoliosService.findAllAdmin(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '[관리자] 포트폴리오 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '포트폴리오 상세 조회 성공',
    type: PortfolioResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<PortfolioResponseDto> {
    return this.portfoliosService.findOneAdmin(id);
  }

  @Post()
  @ApiOperation({ summary: '[관리자] 포트폴리오 등록' })
  @ApiResponse({
    status: 201,
    description: '포트폴리오 등록 성공',
    type: PortfolioResponseDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 409, description: '이미 등록된 프로젝트 또는 중복된 slug' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePortfolioDto): Promise<PortfolioResponseDto> {
    return this.portfoliosService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '[관리자] 포트폴리오 수정' })
  @ApiResponse({
    status: 200,
    description: '포트폴리오 수정 성공',
    type: PortfolioResponseDto,
  })
  @ApiResponse({ status: 404, description: '포트폴리오를 찾을 수 없습니다' })
  @ApiResponse({ status: 409, description: '중복된 slug' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePortfolioDto,
  ): Promise<PortfolioResponseDto> {
    return this.portfoliosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '[관리자] 포트폴리오 삭제' })
  @ApiResponse({ status: 204, description: '포트폴리오 삭제 성공' })
  @ApiResponse({ status: 404, description: '포트폴리오를 찾을 수 없습니다' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.portfoliosService.delete(id);
  }

  // ============ Section CRUD ============

  @Post(':id/sections')
  @ApiOperation({ summary: '[관리자] 포트폴리오 섹션 추가' })
  @ApiResponse({
    status: 201,
    description: '섹션 추가 성공',
    type: PortfolioSectionResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async addSection(
    @Param('id') portfolioId: string,
    @Body() dto: CreateSectionDto,
  ): Promise<PortfolioSectionResponseDto> {
    return this.portfoliosService.addSection(portfolioId, dto);
  }

  @Patch(':id/sections/:sectionId')
  @ApiOperation({ summary: '[관리자] 포트폴리오 섹션 수정' })
  @ApiResponse({
    status: 200,
    description: '섹션 수정 성공',
    type: PortfolioSectionResponseDto,
  })
  async updateSection(
    @Param('id') portfolioId: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: UpdateSectionDto,
  ): Promise<PortfolioSectionResponseDto> {
    return this.portfoliosService.updateSection(portfolioId, sectionId, dto);
  }

  @Delete(':id/sections/:sectionId')
  @ApiOperation({ summary: '[관리자] 포트폴리오 섹션 삭제' })
  @ApiResponse({ status: 204, description: '섹션 삭제 성공' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSection(
    @Param('id') portfolioId: string,
    @Param('sectionId') sectionId: string,
  ): Promise<void> {
    return this.portfoliosService.deleteSection(portfolioId, sectionId);
  }

  @Patch(':id/sections/reorder')
  @ApiOperation({ summary: '[관리자] 포트폴리오 섹션 순서 변경' })
  @ApiResponse({
    status: 200,
    description: '섹션 순서 변경 성공',
    type: [PortfolioSectionResponseDto],
  })
  async reorderSections(
    @Param('id') portfolioId: string,
    @Body() dto: ReorderSectionsDto,
  ): Promise<PortfolioSectionResponseDto[]> {
    return this.portfoliosService.reorderSections(portfolioId, dto);
  }

  // ============ File Upload ============

  @Post('upload')
  @ApiOperation({ summary: '[관리자] 포트폴리오 파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: '파일 업로드 성공',
  })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('portfolioId') portfolioId: string,
    @Query('sectionType') sectionType: string,
  ): Promise<{ url: string; fileName: string }> {
    return this.uploadService.uploadFile(file, portfolioId, sectionType);
  }
}
