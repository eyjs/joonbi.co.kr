import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import {
  CreateEventDto,
  UpdateEventDto,
  ClaimSlotDto,
  EventResponseDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('이벤트 슬롯')
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('events/slots')
  @ApiOperation({ summary: '이벤트 슬롯 현황 조회 (Public)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '활성화된 이벤트 슬롯 목록',
    type: [EventResponseDto],
  })
  async getActiveSlots(): Promise<EventResponseDto[]> {
    return this.eventsService.findActive();
  }

  @Get('events/slots/:id/status')
  @ApiOperation({ summary: '이벤트 슬롯 상태 조회 (Public)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '이벤트 슬롯 상태',
    schema: {
      type: 'object',
      properties: {
        totalSlots: { type: 'number', example: 10 },
        usedSlots: { type: 'number', example: 5 },
        remainingSlots: { type: 'number', example: 5 },
        isActive: { type: 'boolean', example: true },
        isAvailable: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '이벤트를 찾을 수 없습니다.',
  })
  async getSlotStatus(
    @Param('id') id: string,
  ): Promise<{
    totalSlots: number;
    usedSlots: number;
    remainingSlots: number;
    isActive: boolean;
    isAvailable: boolean;
  }> {
    return this.eventsService.getSlotStatus(id);
  }

  @Post('events/slots/claim')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트 슬롯 사용 (User)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '이벤트 슬롯 사용 성공 - EVENT 티켓 발급',
    schema: {
      type: 'object',
      properties: {
        event: { $ref: '#/components/schemas/EventResponseDto' },
        ticketId: {
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '활성화되지 않은 이벤트',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: '이벤트 슬롯이 모두 사용되었습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '이벤트를 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async claimSlot(
    @Body() claimSlotDto: ClaimSlotDto,
    @CurrentUser() user: any,
  ): Promise<{ event: EventResponseDto; ticketId: string }> {
    return this.eventsService.claimSlot(user.id, claimSlotDto);
  }

  @Post('admin/events')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트 생성 (Admin)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '이벤트 생성 성공',
    type: EventResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '관리자 권한 필요',
  })
  async createEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<EventResponseDto> {
    return this.eventsService.create(createEventDto);
  }

  @Get('admin/events')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 이벤트 조회 (Admin)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '이벤트 목록',
    type: [EventResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '관리자 권한 필요',
  })
  async getAllEvents(): Promise<EventResponseDto[]> {
    return this.eventsService.findAll();
  }

  @Get('admin/events/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트 상세 조회 (Admin)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '이벤트 상세 정보',
    type: EventResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '이벤트를 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '관리자 권한 필요',
  })
  async getEvent(@Param('id') id: string): Promise<EventResponseDto> {
    return this.eventsService.findById(id);
  }

  @Patch('admin/events/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트 수정 (Admin)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '이벤트 수정 성공',
    type: EventResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '총 슬롯 수는 사용된 슬롯 수보다 작을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '이벤트를 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '관리자 권한 필요',
  })
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete('admin/events/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '이벤트 삭제 (Admin)' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '이벤트 삭제 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '이미 사용된 슬롯이 있는 이벤트는 삭제할 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '이벤트를 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '관리자 권한 필요',
  })
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return this.eventsService.delete(id);
  }
}
