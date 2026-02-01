import {
  Controller,
  Get,
  Post,
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
import { MessagesService } from './messages.service';
import {
  CreateMessageDto,
  MessageResponseDto,
  MessageListResponseDto,
  UnreadCountResponseDto,
} from './dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User, Role } from '@prisma/client';

@ApiTags('projects/messages')
@Controller('projects/:projectId/messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @ApiOperation({ summary: '프로젝트 메시지 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '메시지 목록 조회 성공',
    type: MessageListResponseDto,
  })
  @ApiResponse({ status: 403, description: '접근 권한이 없습니다' })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
  async findAll(
    @CurrentUser() user: User,
    @Param('projectId') projectId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<MessageListResponseDto> {
    return this.messagesService.findByProject(
      projectId,
      user.id,
      page ? Number(page) : 1,
      limit ? Number(limit) : 50,
    );
  }

  @Post()
  @ApiOperation({ summary: '메시지 전송' })
  @ApiResponse({
    status: 201,
    description: '메시지 전송 성공',
    type: MessageResponseDto,
  })
  @ApiResponse({ status: 403, description: '접근 권한이 없습니다' })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: User,
    @Param('projectId') projectId: string,
    @Body() dto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    return this.messagesService.create(projectId, user.id, dto);
  }
}

@ApiTags('messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessagesUnreadController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('unread-count')
  @ApiOperation({ summary: '안 읽은 메시지 수 조회' })
  @ApiResponse({
    status: 200,
    description: '안 읽은 메시지 수 조회 성공',
    type: UnreadCountResponseDto,
  })
  async getUnreadCount(@CurrentUser() user: User): Promise<UnreadCountResponseDto> {
    return this.messagesService.getUnreadCount(user.id);
  }
}

@ApiTags('admin/projects/messages')
@Controller('admin/projects/:projectId/messages')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminMessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @ApiOperation({ summary: '[관리자] 프로젝트 메시지 조회' })
  @ApiResponse({
    status: 200,
    description: '메시지 목록 조회 성공',
    type: MessageListResponseDto,
  })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
  async findAll(
    @Param('projectId') projectId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<MessageListResponseDto> {
    return this.messagesService.findByProjectAdmin(
      projectId,
      page ? Number(page) : 1,
      limit ? Number(limit) : 50,
    );
  }

  @Post()
  @ApiOperation({ summary: '[관리자] 관리자 답변 전송' })
  @ApiResponse({
    status: 201,
    description: '메시지 전송 성공',
    type: MessageResponseDto,
  })
  @ApiResponse({ status: 404, description: '프로젝트를 찾을 수 없습니다' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: User,
    @Param('projectId') projectId: string,
    @Body() dto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    return this.messagesService.createAdmin(projectId, user.id, dto);
  }
}
