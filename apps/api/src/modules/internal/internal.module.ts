import { Module } from '@nestjs/common';
import { InternalController } from './internal.controller';
import { InternalService } from './internal.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { DiscordModule } from '../discord/discord.module';

@Module({
  imports: [PrismaModule, DiscordModule],
  controllers: [InternalController],
  providers: [InternalService],
})
export class InternalModule {}
