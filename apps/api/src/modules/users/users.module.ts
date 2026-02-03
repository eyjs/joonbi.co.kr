import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController, AdminUsersController } from './users.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
