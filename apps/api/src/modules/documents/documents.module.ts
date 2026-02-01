import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsAdminController } from './documents.admin.controller';
import { DocumentsService } from './documents.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentsController, DocumentsAdminController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
