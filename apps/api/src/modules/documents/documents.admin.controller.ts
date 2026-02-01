import {
  Controller,
  Post,
  Patch,
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
  UploadDocumentDto,
  UpdateDocumentStatusDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('산출물 (관리자)')
@Controller('admin/documents')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class DocumentsAdminController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post(':id/upload')
  @ApiOperation({ summary: '산출물 파일 업로드' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '파일 업로드 성공 및 검토 상태로 변경',
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '관리자 권한 필요',
  })
  async uploadFile(
    @Param('id') id: string,
    @Body() uploadDocumentDto: UploadDocumentDto,
  ): Promise<DocumentResponseDto> {
    return this.documentsService.uploadFile(id, uploadDocumentDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '산출물 상태 변경' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '상태 변경 성공',
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '관리자 권한 필요',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateDocumentStatusDto,
  ): Promise<DocumentResponseDto> {
    return this.documentsService.updateStatus(id, updateStatusDto);
  }
}
