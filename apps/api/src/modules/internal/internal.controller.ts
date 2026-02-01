import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiParam,
} from '@nestjs/swagger';
import { InternalService } from './internal.service';
import { InternalApiGuard } from './guards/internal-api.guard';
import {
  SaveAnalysisDto,
  UploadDocumentsDto,
  SaveDesignsDto,
  AnalysisFailDto,
} from './dto';

@ApiTags('Internal API (Clawdbot)')
@ApiSecurity('internal-api-key')
@Controller('internal')
@UseGuards(InternalApiGuard)
export class InternalController {
  constructor(private readonly internalService: InternalService) {}

  @Get('consultations/pending')
  @ApiOperation({ summary: '분석 대기 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '분석 대기 중인 상담 목록',
  })
  async getPendingConsultations() {
    return this.internalService.getPendingConsultations();
  }

  @Get('consultations/:id')
  @ApiOperation({ summary: '상담 상세 조회' })
  @ApiParam({ name: 'id', description: '상담 ID' })
  @ApiResponse({
    status: 200,
    description: '상담 상세 정보',
  })
  @ApiResponse({
    status: 404,
    description: '상담을 찾을 수 없습니다',
  })
  async getConsultation(@Param('id') id: string) {
    return this.internalService.getConsultation(id);
  }

  @Post('consultations/:id/analysis/start')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '분석 시작 마킹' })
  @ApiParam({ name: 'id', description: '상담 ID' })
  @ApiResponse({
    status: 200,
    description: '분석 상태가 PROCESSING으로 변경됨',
  })
  @ApiResponse({
    status: 404,
    description: '상담을 찾을 수 없습니다',
  })
  async startAnalysis(@Param('id') id: string) {
    return this.internalService.startAnalysis(id);
  }

  @Post('consultations/:id/analysis')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '분석 결과 저장' })
  @ApiParam({ name: 'id', description: '상담 ID' })
  @ApiResponse({
    status: 200,
    description: '분석 결과 저장 완료, Discord 알림 전송',
  })
  @ApiResponse({
    status: 404,
    description: '상담을 찾을 수 없습니다',
  })
  async saveAnalysis(
    @Param('id') id: string,
    @Body() saveAnalysisDto: SaveAnalysisDto,
  ) {
    return this.internalService.saveAnalysis(id, saveAnalysisDto);
  }

  @Post('consultations/:id/analysis/fail')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '분석 실패 처리' })
  @ApiParam({ name: 'id', description: '상담 ID' })
  @ApiResponse({
    status: 200,
    description: '분석 실패 상태로 변경됨',
  })
  @ApiResponse({
    status: 404,
    description: '상담을 찾을 수 없습니다',
  })
  async failAnalysis(
    @Param('id') id: string,
    @Body() analysisFailDto: AnalysisFailDto,
  ) {
    return this.internalService.failAnalysis(id, analysisFailDto);
  }

  @Post('consultations/:id/documents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '문서 업로드' })
  @ApiParam({ name: 'id', description: '상담 ID' })
  @ApiResponse({
    status: 201,
    description: '문서 업로드 완료',
  })
  @ApiResponse({
    status: 404,
    description: '상담을 찾을 수 없습니다',
  })
  async uploadDocuments(
    @Param('id') id: string,
    @Body() uploadDocumentsDto: UploadDocumentsDto,
  ) {
    return this.internalService.uploadDocuments(id, uploadDocumentsDto);
  }

  @Post('consultations/:id/designs')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '화면설계 저장' })
  @ApiParam({ name: 'id', description: '상담 ID' })
  @ApiResponse({
    status: 201,
    description: '화면설계 저장 완료, 상담 상태 COMPLETED로 변경',
  })
  @ApiResponse({
    status: 404,
    description: '상담을 찾을 수 없습니다',
  })
  async saveDesigns(
    @Param('id') id: string,
    @Body() saveDesignsDto: SaveDesignsDto,
  ) {
    return this.internalService.saveDesigns(id, saveDesignsDto);
  }
}
