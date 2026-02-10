import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Consultation, Feasibility } from '@prisma/client';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
  private readonly webhookUrl: string;

  constructor(private readonly config: ConfigService) {
    this.webhookUrl = this.config.get<string>('DISCORD_WEBHOOK_URL');
  }

  async requestFullAnalysis(consultation: Consultation): Promise<void> {
    if (!this.webhookUrl) {
      this.logger.warn('DISCORD_WEBHOOK_URL이 설정되지 않았습니다.');
      return;
    }

    // Clawdbot User ID (환경변수로 설정 권장)
    const clawbotUserId = this.config.get<string>('CLAWDBOT_USER_ID');
    const mentionPrefix = clawbotUserId ? `<@${clawbotUserId}> ` : '';

    const message = {
      content: [
        `${mentionPrefix}[JOONBI_FULL_ANALYSIS]`,
        `ID: ${consultation.id}`,
        `PROJECT: ${consultation.projectName}`,
        `BUDGET: ${consultation.budgetRange || '미정'}`,
        `URLS: ${consultation.referenceUrls.join(' | ')}`,
        `DESC: ${consultation.description.slice(0, 500)}`,
        `---`,
        `1. 분석 수행 후 POST /internal/consultations/${consultation.id}/analysis`,
        `2. 문서 생성 후 POST /internal/consultations/${consultation.id}/documents`,
        `3. 화면설계 후 POST /internal/consultations/${consultation.id}/designs`,
      ].join('\n'),
    };

    try {
      await axios.post(this.webhookUrl, message);
      this.logger.log(
        `전체 분석 요청 전송 완료: ${consultation.id} - ${consultation.projectName}`,
      );
    } catch (error) {
      this.logger.error(
        `Discord 웹훅 전송 실패: ${error.message}`,
        error.stack,
      );
      // Discord 전송 실패는 무시 (상담 생성은 계속 진행)
    }
  }

  async notifyAnalysisComplete(consultation: Consultation): Promise<void> {
    if (!this.webhookUrl) {
      this.logger.warn('DISCORD_WEBHOOK_URL이 설정되지 않았습니다.');
      return;
    }

    const feasibilityEmoji: Record<Feasibility, string> = {
      FEASIBLE: '✅',
      CONDITIONAL: '⚠️',
      INFEASIBLE: '❌',
    };

    const feasibility = consultation.aiFeasibility;
    const emoji = feasibility ? feasibilityEmoji[feasibility] : '❓';

    const estimatedRange =
      consultation.aiEstimatedMin && consultation.aiEstimatedMax
        ? `${consultation.aiEstimatedMin.toLocaleString()}~${consultation.aiEstimatedMax.toLocaleString()}원`
        : '미정';

    const estimatedDays = consultation.aiEstimatedDays
      ? `${consultation.aiEstimatedDays}일`
      : '미정';

    const color =
      feasibility === Feasibility.FEASIBLE
        ? 0x00ff00
        : feasibility === Feasibility.CONDITIONAL
          ? 0xffaa00
          : 0xff0000;

    const message = {
      embeds: [
        {
          title: `${emoji} 분석 완료: ${consultation.projectName}`,
          color,
          fields: [
            {
              name: '판정',
              value: feasibility || '미정',
              inline: true,
            },
            {
              name: '예상 견적',
              value: estimatedRange,
              inline: true,
            },
            {
              name: '예상 기간',
              value: estimatedDays,
              inline: true,
            },
          ],
          url: `${this.config.get('FRONTEND_URL')}/admin/consults/${consultation.id}`,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      await axios.post(this.webhookUrl, message);
      this.logger.log(
        `분석 완료 알림 전송 완료: ${consultation.id} - ${consultation.projectName}`,
      );
    } catch (error) {
      this.logger.error(
        `Discord 웹훅 전송 실패: ${error.message}`,
        error.stack,
      );
      // Discord 전송 실패는 무시
    }
  }

  async notifyPayment(data: {
    type: string;
    userName: string;
    projectName?: string;
    amount: number;
    message: string;
  }): Promise<void> {
    if (!this.webhookUrl) {
      this.logger.warn('DISCORD_WEBHOOK_URL이 설정되지 않았습니다.');
      return;
    }

    const colorMap: Record<string, number> = {
      '상담 비용 결제': 0x3498db,
      '계약금 결제': 0x2ecc71,
      '잔금 결제': 0x9b59b6,
      '추가 비용 결제': 0xf39c12,
    };

    const message = {
      embeds: [
        {
          title: `💳 ${data.type}`,
          color: colorMap[data.type] || 0x95a5a6,
          fields: [
            {
              name: '고객',
              value: data.userName,
              inline: true,
            },
            ...(data.projectName
              ? [
                  {
                    name: '프로젝트',
                    value: data.projectName,
                    inline: true,
                  },
                ]
              : []),
            {
              name: '금액',
              value: `${data.amount.toLocaleString()}원`,
              inline: true,
            },
            {
              name: '메시지',
              value: data.message,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      await axios.post(this.webhookUrl, message);
      this.logger.log(`결제 알림 전송 완료: ${data.type} - ${data.userName}`);
    } catch (error) {
      this.logger.error(
        `Discord 웹훅 전송 실패: ${error.message}`,
        error.stack,
      );
      // Discord 전송 실패는 무시
    }
  }
}
