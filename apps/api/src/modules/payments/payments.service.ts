import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { DiscordService } from '../discord/discord.service';
import { ProjectsService } from '../projects/projects.service';
import {
  PreparePaymentDto,
  CompletePaymentDto,
  PaymentWebhookDto,
  WebhookStatus,
} from './dto';
import { PaymentType, PaymentStatus, ProjectStatus } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  private readonly portOneApiKey: string;
  private readonly portOneApiSecret: string;
  private readonly portOneMerchantId: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly discordService: DiscordService,
    private readonly projectsService: ProjectsService,
  ) {
    this.portOneApiKey = this.configService.get('PORTONE_API_KEY');
    this.portOneApiSecret = this.configService.get('PORTONE_API_SECRET');
    this.portOneMerchantId = this.configService.get('PORTONE_MERCHANT_ID');
  }

  async findAll(userId: string): Promise<any[]> {
    const payments = await this.prisma.payment.findMany({
      where: { userId },
      include: {
        project: {
          select: {
            projectCode: true,
            projectName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return payments;
  }

  async findAllAdmin(): Promise<any[]> {
    const payments = await this.prisma.payment.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        project: {
          select: {
            projectCode: true,
            projectName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return payments;
  }

  async prepare(
    userId: string,
    dto: PreparePaymentDto,
  ): Promise<{ paymentId: string; merchantUid: string; amount: number }> {
    const payment = await this.prisma.payment.create({
      data: {
        userId,
        projectId: dto.projectId,
        paymentType: dto.paymentType,
        amount: dto.amount,
        status: PaymentStatus.PENDING,
      },
    });

    const merchantUid = `payment_${payment.id}_${Date.now()}`;

    return {
      paymentId: payment.id,
      merchantUid,
      amount: dto.amount,
    };
  }

  async complete(userId: string, dto: CompletePaymentDto): Promise<any> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        id: dto.paymentId,
        userId,
      },
      include: {
        project: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('결제 정보를 찾을 수 없습니다');
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException('이미 처리된 결제입니다');
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.COMPLETED,
        pgProvider: dto.pgProvider,
        pgTid: dto.pgTid,
        paidAt: new Date(),
      },
      include: {
        project: true,
      },
    });

    await this.handlePaymentComplete(updatedPayment);

    return updatedPayment;
  }

  async webhook(dto: PaymentWebhookDto): Promise<{ success: boolean }> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        id: dto.merchant_uid.split('_')[1],
      },
      include: {
        project: true,
        user: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('결제 정보를 찾을 수 없습니다');
    }

    if (dto.status === WebhookStatus.PAID) {
      if (payment.amount !== dto.amount) {
        throw new BadRequestException('결제 금액이 일치하지 않습니다');
      }

      const updatedPayment = await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.COMPLETED,
          pgProvider: 'PortOne',
          pgTid: dto.imp_uid,
          paidAt: new Date(),
        },
        include: {
          project: true,
        },
      });

      await this.handlePaymentComplete(updatedPayment);
    } else if (dto.status === WebhookStatus.FAILED) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED,
        },
      });
    } else if (dto.status === WebhookStatus.CANCELLED) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.REFUNDED,
        },
      });
    }

    return { success: true };
  }

  private async handlePaymentComplete(payment: any): Promise<void> {
    switch (payment.paymentType) {
      case PaymentType.CONSULTATION:
        await this.handleConsultationPayment(payment);
        break;
      case PaymentType.CONTRACT:
        await this.handleContractPayment(payment);
        break;
      case PaymentType.FINAL:
        await this.handleFinalPayment(payment);
        break;
      case PaymentType.EXTRA:
        await this.handleExtraPayment(payment);
        break;
    }
  }

  private async handleConsultationPayment(payment: any): Promise<void> {
    await this.discordService.notifyPayment({
      type: '상담 비용 결제',
      userName: payment.user?.name || '고객',
      amount: payment.amount,
      message: '분석 상담 분석을 시작하세요',
    });
  }

  private async handleContractPayment(payment: any): Promise<void> {
    if (!payment.projectId) {
      return;
    }

    await this.prisma.project.update({
      where: { id: payment.projectId },
      data: {
        status: ProjectStatus.IN_PROGRESS,
        startDate: new Date(),
      },
    });

    await this.discordService.notifyPayment({
      type: '계약금 결제',
      userName: payment.user?.name || '고객',
      projectName: payment.project?.projectName,
      amount: payment.amount,
      message: '프로젝트가 진행중 상태로 변경되었습니다',
    });
  }

  private async handleFinalPayment(payment: any): Promise<void> {
    if (!payment.projectId) {
      return;
    }

    await this.prisma.project.update({
      where: { id: payment.projectId },
      data: {
        status: ProjectStatus.COMPLETED,
        actualEndDate: new Date(),
      },
    });

    await this.discordService.notifyPayment({
      type: '잔금 결제',
      userName: payment.user?.name || '고객',
      projectName: payment.project?.projectName,
      amount: payment.amount,
      message: '프로젝트가 완료 상태로 변경되었습니다',
    });
  }

  private async handleExtraPayment(payment: any): Promise<void> {
    await this.discordService.notifyPayment({
      type: '추가 비용 결제',
      userName: payment.user?.name || '고객',
      projectName: payment.project?.projectName,
      amount: payment.amount,
      message: '추가 비용이 결제되었습니다',
    });
  }

  private async verifyPortOnePayment(
    impUid: string,
    amount: number,
  ): Promise<boolean> {
    try {
      const tokenResponse = await axios.post(
        'https://api.iamport.kr/users/getToken',
        {
          imp_key: this.portOneApiKey,
          imp_secret: this.portOneApiSecret,
        },
      );

      const accessToken = tokenResponse.data.response.access_token;

      const paymentResponse = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const paymentData = paymentResponse.data.response;

      return (
        paymentData.status === 'paid' && paymentData.amount === amount
      );
    } catch (error) {
      throw new InternalServerErrorException('결제 검증에 실패했습니다');
    }
  }
}
