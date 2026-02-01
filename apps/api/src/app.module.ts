import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConsultationsModule } from './modules/consultations/consultations.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { EventsModule } from './modules/events/events.module';
import { DiscordModule } from './modules/discord/discord.module';
import { InternalModule } from './modules/internal/internal.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmailsModule } from './modules/emails/emails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    ConsultationsModule,
    ProjectsModule,
    DocumentsModule,
    FeedbacksModule,
    EventsModule,
    DiscordModule,
    InternalModule,
    PaymentsModule,
    NotificationsModule,
    EmailsModule,
  ],
})
export class AppModule {}
