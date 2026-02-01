import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConsultationsService } from './consultations.service';
import {
  CreateConsultationDto,
  ConsultationResponseDto,
  ConsultationFileResponseDto,
  ConsultationDesignResponseDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('상담')
@Controller('consultations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Get()
  @ApiOperation({ summary: '내 상담 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '상담 목록 조회 성공',
    type: [ConsultationResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async findAll(
    @CurrentUser() user: any,
  ): Promise<ConsultationResponseDto[]> {
    return this.consultationsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: '상담 상세 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '상담 조회 성공',
    type: ConsultationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '상담을 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<ConsultationResponseDto> {
    return this.consultationsService.findById(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: '상담 신청' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '상담 신청 성공',
    type: ConsultationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      '잘못된 요청 (티켓 부족, 설명 100자 미만, 참고 URL 없음 등)',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async create(
    @Body() createConsultationDto: CreateConsultationDto,
    @CurrentUser() user: any,
  ): Promise<ConsultationResponseDto> {
    return this.consultationsService.create(user.id, createConsultationDto);
  }

  @Get(':id/files')
  @ApiOperation({ summary: '상담 산출물 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '상담 산출물 목록 조회 성공',
    type: [ConsultationFileResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '상담을 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async getFiles(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<ConsultationFileResponseDto[]> {
    return this.consultationsService.getFiles(id, user.id);
  }

  @Get(':id/designs')
  @ApiOperation({ summary: '상담 화면설계 링크 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '화면설계 링크 조회 성공',
    type: [ConsultationDesignResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '상담을 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async getDesigns(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<ConsultationDesignResponseDto[]> {
    return this.consultationsService.getDesigns(id, user.id);
  }

  @Post('upload')
  @ApiOperation({ summary: '상담 신청 첨부파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '파일 업로드 성공',
    schema: {
      type: 'object',
      properties: {
        filePath: { type: 'string', example: 'consultations/uuid/file.pdf' },
        fileName: { type: 'string', example: 'requirements.pdf' },
        fileSize: { type: 'number', example: 1024000 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '파일이 없거나 허용되지 않는 파일 형식',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any,
  ): Promise<{
    filePath: string;
    fileName: string;
    fileSize: number;
  }> {
    if (!file) {
      throw new BadRequestException('파일이 없습니다.');
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'application/zip',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        '허용되지 않는 파일 형식입니다. PDF, Word, 이미지(JPG, PNG), ZIP만 업로드 가능합니다.',
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException(
        '파일 크기는 10MB를 초과할 수 없습니다.',
      );
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    const filePath = `consultations/temp/${user.id}/${fileName}`;

    return {
      filePath,
      fileName: file.originalname,
      fileSize: file.size,
    };
  }
}
