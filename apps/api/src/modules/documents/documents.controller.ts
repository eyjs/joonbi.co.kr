import {
  Controller,
  Get,
  Post,
  Body,
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
import { DocumentsService } from './documents.service';
import {
  DocumentResponseDto,
  CreateFeedbackDto,
  FeedbackResponseDto,
  ApproveDocumentDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('산출물 (고객)')
@Controller('documents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(':id')
  @ApiOperation({ summary: '산출물 상세 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '산출물 조회 성공',
    type: DocumentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '산출물을 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<DocumentResponseDto> {
    return this.documentsService.findById(id, user.id);
  }

  @Post(':id/feedbacks')
  @ApiOperation({ summary: '피드백 등록' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '피드백 등록 성공',
    type: FeedbackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '검토중 상태가 아니거나 피드백 제한 횟수 초과',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '산출물을 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async createFeedback(
    @Param('id') id: string,
    @Body() createFeedbackDto: CreateFeedbackDto,
    @CurrentUser() user: any,
  ): Promise<FeedbackResponseDto> {
    return this.documentsService.createFeedback(id, user.id, createFeedbackDto);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: '산출물 승인' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '승인 성공',
    type: DocumentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '검토중 상태에서만 승인 가능',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '산출물을 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async approve(
    @Param('id') id: string,
    @Body() approveDocumentDto: ApproveDocumentDto,
    @CurrentUser() user: any,
  ): Promise<DocumentResponseDto> {
    return this.documentsService.approve(id, user.id, approveDocumentDto);
  }
}
