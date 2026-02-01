# 준비스튜디오 - 모노레포 셋업 가이드

## Phase 1-1 완료: 모노레포 구조 셋업

### 구조 개요

```
joonbistudio/
├── apps/
│   ├── web/          # Next.js 14 (App Router)
│   └── api/          # NestJS
├── packages/
│   └── shared/       # 공유 타입, 상수
├── package.json
├── turbo.json
└── pnpm-workspace.yaml
```

## 다음 단계: 수동 작업 필요

### 1. 기존 디렉토리 이동

현재 `frontend/`와 `backend/` 디렉토리를 새로운 구조로 이동해야 합니다:

```bash
# frontend의 내용을 apps/web으로 복사
cp -r frontend/src apps/web/ 2>/dev/null || true
cp -r frontend/public apps/web/ 2>/dev/null || true
cp frontend/.gitignore apps/web/ 2>/dev/null || true

# backend의 내용을 apps/api로 복사
cp -r backend/src apps/api/ 2>/dev/null || true
cp -r backend/test apps/api/ 2>/dev/null || true
cp backend/.gitignore apps/api/ 2>/dev/null || true

# 기존 디렉토리 삭제
rm -rf frontend backend
```

또는 제공된 스크립트 사용:

```bash
chmod +x setup-monorepo.sh
./setup-monorepo.sh
```

### 2. 의존성 설치

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm@8.15.0

# 모든 워크스페이스 의존성 설치
pnpm install

# Prisma 클라이언트 생성
cd apps/api
pnpm prisma generate
```

### 3. 환경 변수 설정

#### apps/web/.env.local
```bash
cp apps/web/.env.local.example apps/web/.env.local
# 필요한 값 수정
```

#### apps/api/.env
```bash
cp apps/api/.env.example apps/api/.env
# 필요한 값 수정 (특히 DATABASE_URL)
```

### 4. 데이터베이스 설정

```bash
# PostgreSQL 컨테이너 실행 (docker-compose 사용)
docker-compose up -d db

# Prisma 마이그레이션
cd apps/api
pnpm prisma migrate dev --name init
```

### 5. 개발 서버 실행

#### 전체 실행 (Turborepo)
```bash
pnpm dev
```

#### 개별 실행
```bash
# Frontend (별도 터미널)
cd apps/web
pnpm dev

# Backend (별도 터미널)
cd apps/api
pnpm dev
```

## 완료된 작업

### ✅ Workspace 설정
- [x] pnpm-workspace.yaml
- [x] Root package.json
- [x] Turborepo 설정 (turbo.json)

### ✅ apps/web (Next.js)
- [x] package.json (Next.js 14)
- [x] TypeScript 설정
- [x] Tailwind CSS 설정
- [x] App Router 구조
- [x] API 클라이언트 (axios)
- [x] 기본 레이아웃 및 페이지

### ✅ apps/api (NestJS)
- [x] package.json
- [x] TypeScript 설정
- [x] NestJS 기본 모듈
- [x] Prisma 설정
- [x] Swagger 설정
- [x] 전체 스키마 (TECH_SPEC 기반)

### ✅ packages/shared
- [x] 공유 타입 정의
  - User, Project, Consultation
  - Document, Payment, Ticket
  - Common types (ApiResponse, Pagination)
- [x] 공유 상수
  - Document weights, status completion
  - Status labels (KR)
  - API/App routes
- [x] TypeScript 설정

## 다음 Phase

Phase 1-1이 완료되었습니다. 다음은:

- **Phase 1-2**: 인증 모듈 구현 (JWT, Passport)
- **Phase 1-3**: 기본 CRUD 모듈 구현

## 문제 해결

### pnpm 설치 오류
```bash
npm install -g pnpm@8.15.0
```

### Prisma 생성 오류
```bash
cd apps/api
pnpm add -D prisma
pnpm add @prisma/client
pnpm prisma generate
```

### 포트 충돌
- Frontend: 기본 3000번 포트
- Backend: 기본 4000번 포트
- PostgreSQL: 기본 5432번 포트

포트 변경은 각 .env 파일에서 가능합니다.

## 추가 정보

- Turborepo 문서: https://turbo.build/repo/docs
- Prisma 문서: https://www.prisma.io/docs
- Next.js 14 문서: https://nextjs.org/docs
- NestJS 문서: https://docs.nestjs.com
