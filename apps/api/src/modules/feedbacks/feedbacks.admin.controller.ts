import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import {
  UpdateFeedbackDto,
  QueryFeedbackDto,
  FeedbackResponseDto,
  FeedbackListResponseDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Admin - Feedbacks')
@Controller('api/admin/feedbacks')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class FeedbacksAdminController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get()
  @ApiOperation({ summary: '전체 피드백 목록 조회 (관리자)' })
  @ApiResponse({
    status: 200,
    description: '피드백 목록',
    type: FeedbackListResponseDto,
  })
  async findAll(
    @Query() query: QueryFeedbackDto,
  ): Promise<FeedbackListResponseDto> {
    return this.feedbacksService.findAll(query);
  }

  @Patch(':id')
  @ApiOperation({ summary: '피드백 처리 (상태 변경, 응답 작성)' })
  @ApiResponse({
    status: 200,
    description: '피드백이 성공적으로 업데이트되었습니다.',
    type: FeedbackResponseDto,
  })
  @ApiResponse({ status: 404, description: '피드백을 찾을 수 없습니다.' })
  @ApiResponse({
    status: 400,
    description: '추가 비용은 0 이상이어야 합니다.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    return this.feedbacksService.update(id, updateFeedbackDto);
  }

  @Get('statistics')
  @ApiOperation({ summary: '피드백 통계 조회' })
  @ApiResponse({
    status: 200,
    description: '피드백 통계',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number' },
        byStatus: { type: 'object' },
        byType: { type: 'object' },
        newFeatureCount: { type: 'number' },
      },
    },
  })
  async getStatistics(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byType: Record<string, number>;
    newFeatureCount: number;
  }> {
    return this.feedbacksService.getStatistics();
  }
}
