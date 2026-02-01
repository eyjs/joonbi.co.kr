import { Module } from '@nestjs/common';
import {
  PaymentsController,
  AdminPaymentsController,
} from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { DiscordModule } from '../discord/discord.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [PrismaModule, DiscordModule, ProjectsModule],
  controllers: [PaymentsController, AdminPaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
