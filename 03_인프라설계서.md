# 준비스튜디오 인프라설계서

## 1. 인프라 개요

### 1.1 환경 구성

```
┌─────────────────────────────────────────────────────────────────┐
│                       배포 환경 전략                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [개발/스테이징]                    [프로덕션]                   │
│  Mac Studio 홈서버                  클라우드 (AWS/GCP/NCP)       │
│  ────────────────────               ────────────────────         │
│  • Docker Compose                   • Docker Compose             │
│  • Tailscale VPN                    • 또는 ECS/K8s               │
│  • 자체 도메인 + SSL                • 동일 이미지 사용           │
│                                                                 │
│  ※ 동일한 Docker 이미지로 어디서든 배포 가능                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 기술 스택

| 구분 | 개발환경 (홈서버) | 프로덕션 (클라우드) |
|------|------------------|-------------------|
| Frontend | Docker (Next.js) | 동일 이미지 |
| Backend | Docker (NestJS) | 동일 이미지 |
| Database | Docker (PostgreSQL) | 동일 이미지 or RDS |
| Reverse Proxy | Nginx (Docker) | 동일 or ALB |
| SSL | Let's Encrypt (Certbot) | ACM or 동일 |
| Storage | 로컬 볼륨 | S3 (선택) |
| 네트워크 | Tailscale | VPC |

> 💡 **심플 구성**: 트래픽이 적은 서비스이므로 Redis 없이 JWT 기반 인증만 사용. 캐시 필요시 NestJS 내장 메모리 캐시로 충분.

---

## 2. 시스템 아키텍처

### 2.1 Docker Compose 구성

```
┌─────────────────────────────────────────────────────────────────┐
│                      Mac Studio (홈서버)                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    Docker Network                          │ │
│  │                    (joonbi-network)                        │ │
│  │                                                            │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │ │
│  │  │   Nginx     │  │   Web       │  │    API      │        │ │
│  │  │  (Proxy)    │──│  (Next.js)  │  │  (NestJS)   │        │ │
│  │  │  :80/:443   │  │  :3000      │  │  :4000      │        │ │
│  │  └─────────────┘  └─────────────┘  └──────┬──────┘        │ │
│  │         │                                  │               │ │
│  │         │                                  │               │ │
│  │         │                                  ▼               │ │
│  │         │                           ┌─────────────┐        │ │
│  │         │                           │ PostgreSQL  │        │ │
│  │         │                           │   :5432     │        │ │
│  │         │                           └──────┬──────┘        │ │
│  │         │                                  │               │ │
│  │         │                                  ▼               │ │
│  │         │                           ┌─────────────┐        │ │
│  │         │                           │   Volumes   │        │ │
│  │         │                           │  (DB+파일)   │        │ │
│  │         └───────────────────────────┴─────────────┘        │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ════════════════════════════════════════════════════════════  │
│                    Clawdbot 자동화 연동                          │
│  ════════════════════════════════════════════════════════════  │
│                                                                 │
│  [NestJS API] ──── Discord Webhook ────► [Discord]             │
│                                               │                 │
│                                    Clawdbot 메시지 감지         │
│                                               │                 │
│  [NestJS API] ◄──── Internal API ────── [Clawdbot]             │
│       │                                       │                 │
│       │                              Stitch MCP (Figma)         │
│       │                                       │                 │
│       └──────────────────────────────────────►│                 │
│                                                                 │
│  Tailscale (VPN) ──── 외부 접속                                 │
│  Port Forward ──── 도메인 연결                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 컨테이너 구성

| 컨테이너 | 이미지 | 포트 | 역할 |
|---------|--------|------|------|
| nginx | nginx:alpine | 80, 443 | 리버스 프록시, SSL |
| web | joonbi-web:latest | 3000 | Next.js Frontend |
| api | joonbi-api:latest | 4000 | NestJS Backend |
| db | postgres:16-alpine | 5432 | PostgreSQL |

---

## 3. 프로젝트 구조

```
joonbi-studio/
├── docker-compose.yml              # 메인 Compose 파일
├── docker-compose.dev.yml          # 개발용 오버라이드
├── docker-compose.prod.yml         # 프로덕션용 오버라이드
├── .env.example                    # 환경변수 예시
├── .env                            # 실제 환경변수 (gitignore)
│
├── nginx/
│   ├── nginx.conf                  # Nginx 설정
│   ├── conf.d/
│   │   └── default.conf            # 사이트 설정
│   └── ssl/                        # SSL 인증서 (Let's Encrypt)
│       ├── fullchain.pem
│       └── privkey.pem
│
├── apps/
│   ├── web/                        # Next.js Frontend
│   │   ├── Dockerfile
│   │   ├── Dockerfile.dev
│   │   ├── package.json
│   │   └── src/
│   │
│   └── api/                        # NestJS Backend
│       ├── Dockerfile
│       ├── Dockerfile.dev
│       ├── package.json
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── src/
│
├── scripts/
│   ├── init-db.sh                  # DB 초기화
│   ├── backup-db.sh                # DB 백업
│   ├── restore-db.sh               # DB 복원
│   └── deploy.sh                   # 배포 스크립트
│
└── data/                           # 볼륨 마운트 (gitignore)
    ├── postgres/
    └── uploads/
```

---

## 4. Docker 설정

### 4.1 docker-compose.yml (기본)

```yaml
# docker-compose.yml

version: '3.8'

name: joonbi-studio

services:
  # ==================== Nginx ====================
  nginx:
    image: nginx:alpine
    container_name: joonbi-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./data/uploads:/var/www/uploads:ro
    depends_on:
      - web
      - api
    networks:
      - joonbi-network

  # ==================== Frontend ====================
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    image: joonbi-web:latest
    container_name: joonbi-web
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=${API_URL}
    depends_on:
      - api
    networks:
      - joonbi-network

  # ==================== Backend ====================
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    image: joonbi-api:latest
    container_name: joonbi-api
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}?schema=public
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
      - UPLOAD_PATH=/app/uploads
      - FRONTEND_URL=${FRONTEND_URL}
      - INTERNAL_API_KEY=${INTERNAL_API_KEY}
      - DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL}
    volumes:
      - ./data/uploads:/app/uploads
    depends_on:
      db:
        condition: service_healthy
    networks:
      - joonbi-network

  # ==================== Database ====================
  db:
    image: postgres:16-alpine
    container_name: joonbi-db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
      - ./scripts/init-db.sh:/docker-entrypoint-initdb.d/init-db.sh:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - joonbi-network

networks:
  joonbi-network:
    driver: bridge

volumes:
  postgres-data:
  uploads-data:
```

### 4.2 docker-compose.dev.yml (개발용 오버라이드)

```yaml
# docker-compose.dev.yml

version: '3.8'

services:
  # 개발시 Nginx 없이 직접 접근
  nginx:
    profiles:
      - prod-only  # 개발시 비활성화

  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./apps/web:/app
      - /app/node_modules
      - /app/.next
    command: pnpm dev

  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile.dev
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./apps/api:/app
      - /app/node_modules
    command: pnpm start:dev

  db:
    ports:
      - "5432:5432"  # 외부에서 직접 접근 가능 (DBeaver 등)
```

### 4.3 docker-compose.prod.yml (프로덕션용)

```yaml
# docker-compose.prod.yml

version: '3.8'

services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G

  api:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  db:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
```

---

## 5. Dockerfile

### 5.1 Frontend (Next.js)

```dockerfile
# apps/web/Dockerfile

# ==================== Base ====================
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ==================== Dependencies ====================
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ==================== Builder ====================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm build

# ==================== Runner ====================
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 5.2 Frontend 개발용

```dockerfile
# apps/web/Dockerfile.dev

FROM node:20-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]
```

### 5.3 Backend (NestJS)

```dockerfile
# apps/api/Dockerfile

# ==================== Base ====================
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ==================== Dependencies ====================
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ==================== Builder ====================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma generate
RUN pnpm prisma generate
RUN pnpm build

# ==================== Runner ====================
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# 업로드 디렉토리
RUN mkdir -p /app/uploads && chown nestjs:nodejs /app/uploads

USER nestjs

EXPOSE 4000

# 마이그레이션 후 시작
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/main.js"]
```

### 5.4 Backend 개발용

```dockerfile
# apps/api/Dockerfile.dev

FROM node:20-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm prisma generate

EXPOSE 4000
CMD ["pnpm", "start:dev"]
```

---

## 6. Nginx 설정

### 6.1 nginx.conf

```nginx
# nginx/nginx.conf

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript 
               application/rss+xml application/atom+xml image/svg+xml;

    # 업로드 크기 제한
    client_max_body_size 50M;

    include /etc/nginx/conf.d/*.conf;
}
```

### 6.2 사이트 설정

```nginx
# nginx/conf.d/default.conf

# Upstream
upstream web {
    server web:3000;
}

upstream api {
    server api:4000;
}

# HTTP → HTTPS 리다이렉트
server {
    listen 80;
    server_name joonbi.co.kr www.joonbi.co.kr;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name joonbi.co.kr www.joonbi.co.kr;

    # SSL 인증서
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    # SSL 설정
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # API
    location /api {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 업로드 파일
    location /uploads {
        alias /var/www/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Frontend
    location / {
        proxy_pass http://web;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 7. 환경 변수

### 7.1 .env.example

```bash
# .env.example

# ==================== General ====================
NODE_ENV=development
TZ=Asia/Seoul

# ==================== URLs ====================
FRONTEND_URL=https://joonbi.co.kr
API_URL=https://joonbi.co.kr/api

# ==================== Database ====================
DB_HOST=db
DB_PORT=5432
DB_NAME=joonbi
DB_USER=joonbi
DB_PASSWORD=your_secure_password_here

# Prisma
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public

# ==================== JWT ====================
JWT_SECRET=your_jwt_secret_here_at_least_32_characters
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=30d

# ==================== Internal API (Clawdbot) ====================
INTERNAL_API_KEY=joonbi_internal_key_xxxxxxxxxxxxxx

# ==================== Discord ====================
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx/xxxxx

# ==================== File Upload ====================
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=52428800  # 50MB

# ==================== Email (Resend) ====================
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=no-reply@joonbi.co.kr

# ==================== Payment (PortOne) ====================
PORTONE_API_KEY=your_api_key
PORTONE_API_SECRET=your_api_secret
PORTONE_MERCHANT_ID=your_merchant_id

# ==================== External (Optional) ====================
# S3 (프로덕션 전환 시)
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_S3_BUCKET=
# AWS_S3_REGION=ap-northeast-2
```

---

## 8. 스크립트

### 8.1 배포 스크립트

```bash
#!/bin/bash
# scripts/deploy.sh

set -e

echo "🚀 준비스튜디오 배포 시작..."

# 환경 확인
if [ ! -f .env ]; then
    echo "❌ .env 파일이 없습니다."
    exit 1
fi

# 이미지 빌드
echo "📦 Docker 이미지 빌드 중..."
docker compose build --no-cache

# 기존 컨테이너 중지
echo "🛑 기존 컨테이너 중지..."
docker compose down

# DB 백업 (있으면)
if docker compose ps db | grep -q "Up"; then
    echo "💾 DB 백업 중..."
    ./scripts/backup-db.sh
fi

# 컨테이너 시작
echo "🔄 컨테이너 시작..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 마이그레이션 대기
echo "⏳ DB 마이그레이션 대기..."
sleep 10

# 헬스체크
echo "🏥 헬스체크..."
for i in {1..30}; do
    if curl -s http://localhost:4000/api/health > /dev/null; then
        echo "✅ API 서버 정상"
        break
    fi
    echo "대기 중... ($i/30)"
    sleep 2
done

echo "✨ 배포 완료!"
docker compose ps
```

### 8.2 DB 백업 스크립트

```bash
#!/bin/bash
# scripts/backup-db.sh

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/joonbi_${TIMESTAMP}.sql.gz"

mkdir -p $BACKUP_DIR

echo "💾 DB 백업 시작: ${BACKUP_FILE}"

docker compose exec -T db pg_dump -U ${DB_USER:-joonbi} ${DB_NAME:-joonbi} | gzip > $BACKUP_FILE

# 7일 이상 된 백업 삭제
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "✅ 백업 완료: ${BACKUP_FILE}"
ls -lh $BACKUP_FILE
```

### 8.3 DB 복원 스크립트

```bash
#!/bin/bash
# scripts/restore-db.sh

set -e

if [ -z "$1" ]; then
    echo "사용법: ./restore-db.sh <백업파일>"
    echo "예시: ./restore-db.sh ./backups/joonbi_20250130_120000.sql.gz"
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ 파일을 찾을 수 없습니다: $BACKUP_FILE"
    exit 1
fi

echo "⚠️  주의: 기존 데이터가 모두 삭제됩니다!"
read -p "계속하시겠습니까? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "취소됨"
    exit 0
fi

echo "🔄 DB 복원 시작..."

# 기존 연결 종료
docker compose exec db psql -U ${DB_USER:-joonbi} -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${DB_NAME:-joonbi}' AND pid <> pg_backend_pid();"

# DB 재생성
docker compose exec db dropdb -U ${DB_USER:-joonbi} ${DB_NAME:-joonbi} --if-exists
docker compose exec db createdb -U ${DB_USER:-joonbi} ${DB_NAME:-joonbi}

# 복원
gunzip -c $BACKUP_FILE | docker compose exec -T db psql -U ${DB_USER:-joonbi} ${DB_NAME:-joonbi}

echo "✅ 복원 완료!"
```

### 8.4 개발 시작 스크립트

```bash
#!/bin/bash
# scripts/dev.sh

set -e

echo "🔧 개발 환경 시작..."

# .env 확인
if [ ! -f .env ]; then
    echo "📝 .env.example에서 .env 생성..."
    cp .env.example .env
    echo "⚠️  .env 파일을 수정해주세요!"
fi

# 개발 모드로 실행
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

echo ""
echo "✨ 개발 환경 준비 완료!"
echo ""
echo "📌 접속 주소:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend:  http://localhost:4000"
echo "   - API Docs: http://localhost:4000/api/docs"
echo "   - DB:       localhost:5432"
echo ""
echo "📝 로그 보기: docker compose logs -f"
echo "🛑 중지: docker compose down"
```

---

## 9. 클라우드 전환 가이드

### 9.1 AWS 전환 시

```
┌─────────────────────────────────────────────────────────────────┐
│                      AWS 배포 구성                               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                        Route 53                            │ │
│  │                     (DNS: joonbi.co.kr)                    │ │
│  └─────────────────────────────┬─────────────────────────────┘ │
│                                │                                │
│                                ▼                                │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                   Application Load Balancer                │ │
│  │                   (SSL: ACM Certificate)                   │ │
│  └─────────────────────────────┬─────────────────────────────┘ │
│                                │                                │
│           ┌────────────────────┴────────────────────┐          │
│           │                                         │          │
│           ▼                                         ▼          │
│  ┌─────────────────┐                       ┌─────────────────┐ │
│  │   ECS Fargate   │                       │   ECS Fargate   │ │
│  │   (Web x 1)     │                       │   (API x 1)     │ │
│  └─────────────────┘                       └────────┬────────┘ │
│                                                     │          │
│                          ┌──────────────────────────┤          │
│                          │                          │          │
│                          ▼                          ▼          │
│                 ┌─────────────────┐        ┌─────────────────┐ │
│                 │   RDS Postgres  │        │      S3         │ │
│                 │   (db.t3.micro) │        │   (Uploads)     │ │
│                 └─────────────────┘        └─────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 변경 사항

| 항목 | 홈서버 | AWS |
|------|--------|-----|
| 이미지 저장소 | 로컬 | ECR |
| DB | Docker PostgreSQL | RDS |
| 파일 저장 | 로컬 볼륨 | S3 |
| SSL | Let's Encrypt | ACM |
| 오케스트레이션 | Docker Compose | ECS Fargate |

### 9.3 환경변수 변경점

```bash
# AWS 전환 시 변경할 환경변수

# Database (RDS)
DATABASE_URL=postgresql://user:pass@xxxxx.rds.amazonaws.com:5432/joonbi

# File Storage (S3)
STORAGE_TYPE=s3
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_S3_BUCKET=joonbi-uploads
AWS_S3_REGION=ap-northeast-2
```

---

## 10. 운영 가이드

### 10.1 일상 명령어

```bash
# 상태 확인
docker compose ps

# 로그 보기
docker compose logs -f
docker compose logs -f api  # 특정 서비스만

# 재시작
docker compose restart api

# 컨테이너 접속
docker compose exec api sh
docker compose exec db psql -U joonbi

# 리소스 사용량
docker stats
```

### 10.2 문제 해결

```bash
# 컨테이너 완전 재시작
docker compose down
docker compose up -d

# 이미지 재빌드
docker compose build --no-cache api
docker compose up -d api

# 볼륨 초기화 (주의!)
docker compose down -v

# 네트워크 재생성
docker network prune
docker compose up -d
```

### 10.3 모니터링

```bash
# 헬스체크 엔드포인트
curl http://localhost:4000/api/health

# DB 연결 확인
docker compose exec db pg_isready -U joonbi

# 디스크 사용량
du -sh ./data/*

# 도커 시스템 정리
docker system prune -a
```

---

## 11. 보안 체크리스트

- [ ] .env 파일 gitignore에 추가
- [ ] DB 비밀번호 강력하게 설정
- [ ] JWT_SECRET 32자 이상
- [ ] INTERNAL_API_KEY 복잡하게 설정
- [ ] Nginx에서 rate limiting 설정
- [ ] 방화벽 설정 (필요한 포트만 오픈)
- [ ] Tailscale 인증 키 관리
- [ ] 정기 백업 스케줄 (crontab)
- [ ] 로그 로테이션 설정
- [ ] SSL 인증서 자동 갱신 (certbot)

---

## 12. Clawdbot 연동 설정

### 12.1 Discord 웹훅 설정

1. Discord 서버에서 채널 생성 (#joonbi-bot)
2. 채널 설정 → 연동 → 웹훅 생성
3. 웹훅 URL 복사 → .env의 `DISCORD_WEBHOOK_URL`에 설정

### 12.2 Internal API Key 설정

```bash
# 랜덤 키 생성
openssl rand -hex 32

# .env에 설정
INTERNAL_API_KEY=생성된_키
```

### 12.3 Clawdbot에 설정

Clawdbot이 접근할 수 있도록:
1. API URL: `https://api.joonbi.co.kr`
2. 인증 헤더: `x-internal-api-key: {INTERNAL_API_KEY}`
3. Discord 채널에서 `[JOONBI_FULL_ANALYSIS]` 패턴 감지 설정
