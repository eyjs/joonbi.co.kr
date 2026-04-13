import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';

interface UploadedFileInfo {
  url: string;
  fileName: string;
}

const MAX_FILE_SIZES: Record<string, number> = {
  video: 500 * 1024 * 1024,    // 500MB
  document: 50 * 1024 * 1024,  // 50MB
  image: 10 * 1024 * 1024,     // 10MB
};

const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  document: ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'],
  image: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
};

@Injectable()
export class PortfolioUploadService {
  private readonly logger = new Logger(PortfolioUploadService.name);
  private readonly uploadPath: string | null;
  private readonly backendUrl: string;

  // GCS fallback — lazily initialized only when needed
  private gcsStorage: unknown | null = null;
  private gcsBucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadPath = this.configService.get<string>('UPLOAD_PATH', '') || null;
    this.backendUrl = this.configService.get<string>('BACKEND_URL', 'http://localhost:4000');
    this.gcsBucketName = this.configService.get<string>('GCS_BUCKET', 'joonbi-portfolio');
  }

  async uploadFile(
    file: Express.Multer.File,
    portfolioId: string,
    sectionType: string,
  ): Promise<UploadedFileInfo> {
    const fileCategory = this.getFileCategory(sectionType);
    this.validateFile(file, fileCategory);

    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const relativePath = `portfolios/${portfolioId}/${sectionType.toLowerCase()}/${timestamp}-${sanitizedName}`;

    // Local filesystem upload (primary)
    if (this.uploadPath) {
      return this.uploadToLocal(file, relativePath);
    }

    // GCS fallback
    return this.uploadToGcs(file, relativePath);
  }

  private async uploadToLocal(
    file: Express.Multer.File,
    relativePath: string,
  ): Promise<UploadedFileInfo> {
    const fullPath = path.join(this.uploadPath!, relativePath);
    const directory = path.dirname(fullPath);

    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(fullPath, file.buffer);

    // URL served by NestJS static file serving at /uploads/*
    const url = `${this.backendUrl}/uploads/${relativePath}`;

    this.logger.log(`File uploaded (local): ${relativePath}`);

    return {
      url,
      fileName: file.originalname,
    };
  }

  private async uploadToGcs(
    file: Express.Multer.File,
    relativePath: string,
  ): Promise<UploadedFileInfo> {
    try {
      const storage = await this.getGcsStorage();
      if (!storage) {
        throw new Error('GCS is not configured and UPLOAD_PATH is not set');
      }

      const bucket = (storage as { bucket: (name: string) => { file: (path: string) => { save: (buffer: Buffer, opts: Record<string, unknown>) => Promise<void>; makePublic: () => Promise<void> } } }).bucket(this.gcsBucketName);
      const blob = bucket.file(relativePath);

      await blob.save(file.buffer, {
        contentType: file.mimetype,
        metadata: { originalName: file.originalname },
      });

      await blob.makePublic();

      const url = `https://storage.googleapis.com/${this.gcsBucketName}/${relativePath}`;

      this.logger.log(`File uploaded (GCS): ${relativePath}`);

      return {
        url,
        fileName: file.originalname,
      };
    } catch (error) {
      this.logger.error('GCS upload failed', error);
      throw new BadRequestException('파일 업로드에 실패했습니다. 스토리지 설정을 확인하세요.');
    }
  }

  /**
   * Lazily initialize GCS Storage to avoid import errors
   * when @google-cloud/storage is not installed.
   */
  private async getGcsStorage(): Promise<unknown | null> {
    if (this.gcsStorage) return this.gcsStorage;

    try {
      const { Storage } = await import('@google-cloud/storage');
      const keyFilename = this.configService.get<string>('GCS_KEY_FILE', 'gcs-key.json');
      this.gcsStorage = new Storage({ keyFilename });
      return this.gcsStorage;
    } catch {
      this.logger.warn('GCS SDK not available — falling back is not possible without UPLOAD_PATH');
      return null;
    }
  }

  private getFileCategory(sectionType: string): string {
    switch (sectionType.toUpperCase()) {
      case 'VIDEO':
        return 'video';
      case 'DOCUMENT':
        return 'document';
      case 'IMAGES':
      case 'OVERVIEW':
      case 'BRIEF':
        return 'image';
      default:
        return 'document';
    }
  }

  private validateFile(file: Express.Multer.File, category: string): void {
    const maxSize = MAX_FILE_SIZES[category];
    if (maxSize && file.size > maxSize) {
      throw new BadRequestException(
        `파일 크기가 제한을 초과했습니다. 최대: ${Math.round(maxSize / 1024 / 1024)}MB`,
      );
    }

    const allowedTypes = ALLOWED_MIME_TYPES[category];
    if (allowedTypes && !allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `지원하지 않는 파일 형식입니다. 허용: ${allowedTypes.join(', ')}`,
      );
    }
  }
}
