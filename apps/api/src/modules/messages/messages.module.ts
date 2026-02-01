import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { MessagesService } from './messages.service';
import {
  MessagesController,
  MessagesUnreadController,
  AdminMessagesController,
} from './messages.controller';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [
    MessagesController,
    MessagesUnreadController,
    AdminMessagesController,
  ],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
