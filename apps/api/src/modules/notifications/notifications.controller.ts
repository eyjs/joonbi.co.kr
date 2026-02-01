import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { NotificationResponseDto, NotificationQueryDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('알림')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: '내 알림 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '알림 목록 조회 성공',
    type: [NotificationResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async findAll(
    @CurrentUser() user: any,
    @Query() query: NotificationQueryDto,
  ): Promise<NotificationResponseDto[]> {
    return this.notificationsService.findAll(user.id, query);
  }

  @Get('unread-count')
  @ApiOperation({ summary: '미읽음 알림 개수 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '미읽음 알림 개수 조회 성공',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 5 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async getUnreadCount(
    @CurrentUser() user: any,
  ): Promise<{ count: number }> {
    return this.notificationsService.getUnreadCount(user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: '알림 읽음 처리' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '알림 읽음 처리 성공',
    type: NotificationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '알림을 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationsService.markAsRead(
      id,
      user.id,
    );

    if (!notification) {
      throw new NotFoundException('알림을 찾을 수 없습니다.');
    }

    return notification;
  }

  @Patch('read-all')
  @ApiOperation({ summary: '전체 알림 읽음 처리' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '전체 알림 읽음 처리 성공',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 10 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async markAllAsRead(
    @CurrentUser() user: any,
  ): Promise<{ count: number }> {
    return this.notificationsService.markAllAsRead(user.id);
  }
}
