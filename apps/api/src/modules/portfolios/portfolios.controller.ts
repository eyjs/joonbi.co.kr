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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { PortfoliosService } from './portfolios.service';
import {
  CreatePortfolioDto,
  UpdatePortfolioDto,
  PortfolioResponseDto,
  PortfolioListResponseDto,
} from './dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

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

  @Get(':id')
  @ApiOperation({ summary: '포트폴리오 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '포트폴리오 상세 조회 성공',
    type: PortfolioResponseDto,
  })
  @ApiResponse({ status: 404, description: '포트폴리오를 찾을 수 없습니다' })
  async findOne(@Param('id') id: string): Promise<PortfolioResponseDto> {
    return this.portfoliosService.findOne(id);
  }
}

@ApiTags('admin/portfolios')
@Controller('admin/portfolios')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminPortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

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
}
