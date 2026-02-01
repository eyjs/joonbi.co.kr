FROM node:20-alpine AS base

# 1. 의존성 설치 단계
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 워크스페이스 설정을 포함한 package.json 복사
COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/

# 전체 의존성 설치
RUN npm ci

# 2. 빌드 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma 클라이언트 생성 및 빌드
RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma
RUN npm run build -w @joonbi/api

# 3. 실행 단계
FROM base AS runner
RUN apk add --no-cache openssl libcrypto3
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# 전체 node_modules 복사 (워크스페이스 의존성 해결을 위해)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# API 앱 파일 복사
WORKDIR /app/apps/api
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/package.json ./dist/package.json
COPY --from=builder /app/apps/api/prisma ./prisma
# Prisma 엔진 파일 복사 (Bundler 대응)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 4000

# Prisma 마이그레이션 실행 후 서버 시작
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/main"]
