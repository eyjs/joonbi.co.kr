import {
  Controller,
  Get,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { ConsultationResponseDto } from './dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin/consultations')
@Controller('admin/consultations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Get()
  @ApiOperation({ summary: '[관리자] 전체 상담 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '전체 상담 목록 조회 성공',
    type: [ConsultationResponseDto],
  })
  async findAll(): Promise<ConsultationResponseDto[]> {
    return this.consultationsService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: '[관리자] 상담 상세 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '상담 상세 조회 성공',
    type: ConsultationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '상담을 찾을 수 없습니다.',
  })
  async findOne(@Param('id') id: string): Promise<ConsultationResponseDto> {
    return this.consultationsService.findByIdAdmin(id);
  }
}
