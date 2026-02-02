import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class InternalApiGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-internal-api-key'];

    const validKey = this.configService.get<string>('INTERNAL_API_KEY');

    if (!apiKey || !validKey) {
      throw new UnauthorizedException('Invalid internal API key');
    }

    // 타이밍 공격 방지를 위한 상수 시간 비교
    const apiKeyBuffer = Buffer.from(apiKey);
    const validKeyBuffer = Buffer.from(validKey);

    if (apiKeyBuffer.length !== validKeyBuffer.length) {
      throw new UnauthorizedException('Invalid internal API key');
    }

    if (!timingSafeEqual(apiKeyBuffer, validKeyBuffer)) {
      throw new UnauthorizedException('Invalid internal API key');
    }

    return true;
  }
}
