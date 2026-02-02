import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import {
  consultationResultTemplate,
  ConsultationResultData,
  paymentRequestTemplate,
  PaymentRequestData,
  documentReadyTemplate,
  DocumentReadyData,
  reviewReminderTemplate,
  ReviewReminderData,
  projectCompletedTemplate,
  ProjectCompletedData,
} from './templates';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger(EmailsService.name);
  private readonly resend: Resend;
  private readonly emailFrom: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.emailFrom = this.configService.get<string>('EMAIL_FROM', 'noreply@joonbistudio.com');

    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY is not configured. Email service will not work.');
      this.resend = null;
    } else {
      this.resend = new Resend(apiKey);
    }
  }

  async sendConsultationResult(
    email: string,
    consultation: ConsultationResultData,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.resend) {
      this.logger.warn('Email service is not configured. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      this.logger.log(`Sending consultation result email to ${email}`);

      const html = consultationResultTemplate(consultation);

      const result = await this.resend.emails.send({
        from: this.emailFrom,
        to: email,
        subject: `[Joonbi Studio] 상담 결과 안내 - ${consultation.projectType}`,
        html,
      });

      if (result.error) {
        this.logger.error(`Failed to send consultation result email: ${result.error.message}`);
        return { success: false, error: result.error.message };
      }

      this.logger.log(`Consultation result email sent successfully: ${result.data.id}`);
      return { success: true, messageId: result.data.id };
    } catch (error) {
      this.logger.error(`Error sending consultation result email: ${error.message}`, error.stack);
      return { success: false, error: error.message };
    }
  }

  async sendPaymentRequest(
    email: string,
    payment: PaymentRequestData,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.resend) {
      this.logger.warn('Email service is not configured. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      this.logger.log(`Sending payment request email to ${email}`);

      const html = paymentRequestTemplate(payment);

      const result = await this.resend.emails.send({
        from: this.emailFrom,
        to: email,
        subject: `[Joonbi Studio] 결제 요청 - ${payment.projectName} (${payment.paymentType})`,
        html,
      });

      if (result.error) {
        this.logger.error(`Failed to send payment request email: ${result.error.message}`);
        return { success: false, error: result.error.message };
      }

      this.logger.log(`Payment request email sent successfully: ${result.data.id}`);
      return { success: true, messageId: result.data.id };
    } catch (error) {
      this.logger.error(`Error sending payment request email: ${error.message}`, error.stack);
      return { success: false, error: error.message };
    }
  }

  async sendDocumentReady(
    email: string,
    document: DocumentReadyData,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.resend) {
      this.logger.warn('Email service is not configured. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      this.logger.log(`Sending document ready email to ${email}`);

      const html = documentReadyTemplate(document);

      const result = await this.resend.emails.send({
        from: this.emailFrom,
        to: email,
        subject: `[Joonbi Studio] 산출물 준비 완료 - ${document.projectName} (${document.documentType})`,
        html,
      });

      if (result.error) {
        this.logger.error(`Failed to send document ready email: ${result.error.message}`);
        return { success: false, error: result.error.message };
      }

      this.logger.log(`Document ready email sent successfully: ${result.data.id}`);
      return { success: true, messageId: result.data.id };
    } catch (error) {
      this.logger.error(`Error sending document ready email: ${error.message}`, error.stack);
      return { success: false, error: error.message };
    }
  }

  async sendReviewReminder(
    email: string,
    reminder: ReviewReminderData,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.resend) {
      this.logger.warn('Email service is not configured. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      this.logger.log(`Sending review reminder email to ${email}`);

      const html = reviewReminderTemplate(reminder);

      const urgencyPrefix = reminder.daysRemaining <= 2 ? '[긴급] ' : '';
      const result = await this.resend.emails.send({
        from: this.emailFrom,
        to: email,
        subject: `${urgencyPrefix}[Joonbi Studio] 검토 마감 리마인더 - ${reminder.projectName} (D-${reminder.daysRemaining})`,
        html,
      });

      if (result.error) {
        this.logger.error(`Failed to send review reminder email: ${result.error.message}`);
        return { success: false, error: result.error.message };
      }

      this.logger.log(`Review reminder email sent successfully: ${result.data.id}`);
      return { success: true, messageId: result.data.id };
    } catch (error) {
      this.logger.error(`Error sending review reminder email: ${error.message}`, error.stack);
      return { success: false, error: error.message };
    }
  }

  async sendProjectCompleted(
    email: string,
    project: ProjectCompletedData,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.resend) {
      this.logger.warn('Email service is not configured. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      this.logger.log(`Sending project completed email to ${email}`);

      const html = projectCompletedTemplate(project);

      const result = await this.resend.emails.send({
        from: this.emailFrom,
        to: email,
        subject: `[Joonbi Studio] 프로젝트 완료 축하 - ${project.projectName}`,
        html,
      });

      if (result.error) {
        this.logger.error(`Failed to send project completed email: ${result.error.message}`);
        return { success: false, error: result.error.message };
      }

      this.logger.log(`Project completed email sent successfully: ${result.data.id}`);
      return { success: true, messageId: result.data.id };
    } catch (error) {
      this.logger.error(`Error sending project completed email: ${error.message}`, error.stack);
      return { success: false, error: error.message };
    }
  }

  async sendBulkEmails(
    emails: string[],
    subject: string,
    htmlContent: string,
  ): Promise<{
    success: boolean;
    sent: number;
    failed: number;
    errors?: string[];
  }> {
    if (!this.resend) {
      this.logger.warn('Email service is not configured. Skipping bulk email send.');
      return { success: false, sent: 0, failed: emails.length, errors: ['Email service not configured'] };
    }

    this.logger.log(`Sending bulk emails to ${emails.length} recipients`);

    const results = await Promise.allSettled(
      emails.map((email) =>
        this.resend.emails.send({
          from: this.emailFrom,
          to: email,
          subject,
          html: htmlContent,
        }),
      ),
    );

    const sent = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;
    const errors = results
      .filter((r) => r.status === 'rejected')
      .map((r) => (r as PromiseRejectedResult).reason?.message);

    this.logger.log(`Bulk email sent: ${sent} succeeded, ${failed} failed`);

    return {
      success: failed === 0,
      sent,
      failed,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
