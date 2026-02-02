import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { PreparePaymentDto, CompletePaymentDto, PaymentWebhookDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '../../common/types';

@ApiTags('결제')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 결제 내역 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '결제 내역 조회 성공',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  async findAll(@CurrentUser() user: AuthenticatedUser): Promise<any[]> {
    return this.paymentsService.findAll(user.id);
  }

  @Post('prepare')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '결제 준비' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '결제 준비 성공',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청',
  })
  async prepare(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: PreparePaymentDto,
  ): Promise<{ paymentId: string; merchantUid: string; amount: number }> {
    return this.paymentsService.prepare(user.id, dto);
  }

  @Post('complete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '결제 완료 처리' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '결제 완료 성공',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '결제 정보를 찾을 수 없음',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '이미 처리된 결제',
  })
  async complete(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CompletePaymentDto,
  ): Promise<any> {
    return this.paymentsService.complete(user.id, dto);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'PG 웹훅 처리' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '웹훅 처리 성공',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '결제 정보를 찾을 수 없음',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '결제 금액 불일치',
  })
  async webhook(@Body() dto: PaymentWebhookDto): Promise<{ success: boolean }> {
    return this.paymentsService.webhook(dto);
  }
}

@ApiTags('관리자 - 결제')
@Controller('admin/payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminPaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: '전체 결제 내역 조회 (관리자)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '결제 내역 조회 성공',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '인증 필요',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '권한 없음',
  })
  async findAll(): Promise<any[]> {
    return this.paymentsService.findAllAdmin();
  }
}
