import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import { FeedbackResponseDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Feedbacks')
@Controller('api/feedbacks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get(':id')
  @ApiOperation({ summary: '피드백 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '피드백 상세 정보',
    type: FeedbackResponseDto,
  })
  @ApiResponse({ status: 404, description: '피드백을 찾을 수 없습니다.' })
  async findOne(@Param('id') id: string): Promise<FeedbackResponseDto> {
    return this.feedbacksService.findOne(id);
  }
}
