import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  // Serve uploaded files at /uploads/* before setting the global API prefix.
  // UPLOAD_PATH defaults to /data/uploads in Docker (see docker-compose.yml).
  const uploadPath = process.env.UPLOAD_PATH;
  if (uploadPath) {
    app.use('/uploads', express.static(path.resolve(uploadPath), {
      maxAge: '7d',
      immutable: true,
    }));
    logger.log(`Static file serving enabled: /uploads → ${uploadPath}`);
  }

  app.setGlobalPrefix('api');

  // CORS 설정: 여러 Frontend URL 허용
  const allowedOrigins = [
    'http://localhost:3000', // 로컬 개발
    'https://joonbi.co.kr', // 프로덕션 (커스텀 도메인)
    'https://joonbi-co-kr-web.vercel.app', // Vercel 자동 생성 URL
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // origin이 없는 경우 (같은 도메인 요청) 허용
      if (!origin) return callback(null, true);

      // Vercel preview 배포 (*.vercel.app) 모두 허용
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }

      // 허용된 도메인 체크
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('준비스튜디오 API')
    .setDescription('외주관리시스템 API 문서')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-internal-api-key',
        in: 'header',
      },
      'internal-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
