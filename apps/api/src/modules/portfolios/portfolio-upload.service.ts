import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';

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
  private storage: Storage;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const keyFilename = this.configService.get<string>('GCS_KEY_FILE', 'gcs-key.json');
    this.bucketName = this.configService.get<string>('GCS_BUCKET', 'joonbi-portfolio');

    this.storage = new Storage({ keyFilename });
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
    const filePath = `portfolios/${portfolioId}/${sectionType.toLowerCase()}/${timestamp}-${sanitizedName}`;

    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(filePath);

    await blob.save(file.buffer, {
      contentType: file.mimetype,
      metadata: {
        originalName: file.originalname,
      },
    });

    await blob.makePublic();

    const url = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;

    this.logger.log(`File uploaded: ${filePath}`);

    return {
      url,
      fileName: file.originalname,
    };
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
