# 준비스튜디오 (Joonbi Studio)

외주 프로젝트 및 클라이언트 관리를 위한 풀스택 웹 애플리케이션

## 개요

"참고사이트만 주세요, 나머지는 저희가 다 합니다"

기획서 작성 능력이 없는 소상공인/스타트업을 위한 웹개발 외주 서비스.
AI 자동화로 분석부터 화면설계까지 30분 내 완료.

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | NestJS 10, Prisma, PostgreSQL 15 |
| **Infrastructure** | Docker, Docker Compose, Nginx |
| **Deployment** | Frontend (Vercel), Backend (Docker) |
| **Automation** | Discord Webhook, Clawdbot |

## 프로젝트 구조

```
joonbistudio/
├── apps/
│   ├── web/              # Next.js Frontend
│   └── api/              # NestJS Backend
├── packages/
│   └── shared/           # 공유 타입/유틸
├── docs/                 # 문서
│   ├── 01_서비스기획안.md
│   ├── 02_기술설계서.md
│   ├── 03_인프라설계서.md
│   ├── guides/          # 가이드 문서
│   └── progress/        # 진행 상황
├── nginx/               # Nginx 설정
└── docker-compose.yml   # Docker 설정
```

## 빠른 시작

### 1. 환경변수 설정

```bash
cp .env.example .env
# .env 파일을 열어 필요한 값들을 설정하세요
```

### 2. 개발 모드 실행

```bash
# Docker Compose로 백엔드 실행
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# 또는 개별 실행
cd apps/api && pnpm install && pnpm dev
cd apps/web && pnpm install && pnpm dev
```

### 3. 접속

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000
- **API Docs**: http://localhost:4000/api/docs
- **Database**: localhost:5435

## 배포

### Frontend (Vercel)

1. GitHub 레포지토리 연결
2. Vercel Dashboard 설정:
   - Root Directory: `apps/web`
   - Framework: Next.js
   - Environment Variables 설정

### Backend (Docker)

```bash
docker-compose up -d
```

## 주요 기능

### 자동화 파이프라인
- Discord 웹훅으로 Clawdbot 트리거
- AI 기반 프로젝트 분석 (30분)
- 자동 문서 생성 (분석서, 명세서, 견적서)
- Stitch MCP 화면설계 자동화

### 프로젝트 관리
- 상담 관리 (간편/분석)
- 프로젝트 진행률 추적
- 산출물 관리
- 피드백 시스템

### 결제 시스템
- NICE 결제 연동
- 2단계 결제 (계약금 30% + 잔금 70%)
- 포트폴리오 할인 정책

## 문서

- [서비스 기획안](./docs/01_서비스기획안.md)
- [기술 설계서](./docs/02_기술설계서.md)
- [인프라 설계서](./docs/03_인프라설계서.md)
- [설정 가이드](./docs/guides/SETUP.md)
- [정리 가이드](./docs/guides/CLEANUP_GUIDE.md)

## 포트 설정

| 서비스 | 개발 | 프로덕션 |
|--------|------|----------|
| Frontend | 3000 | - (Vercel) |
| Backend | 4000 | - (내부) |
| Nginx | 8080 | 80, 443 |
| Database | 5435 | 5435 |

## 라이선스

Private - All Rights Reserved

## 문의

준비스튜디오 팀
