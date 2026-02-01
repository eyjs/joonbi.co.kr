# Joonbi Studio - 외주관리시스템

## Project Overview

외주 프로젝트 및 클라이언트 관리를 위한 풀스택 웹 애플리케이션.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | NestJS 10.x, TypeScript, TypeORM |
| Frontend | Next.js 16.x (App Router), Tailwind CSS |
| Database | PostgreSQL 15+ |
| Auth | JWT + Passport |
| API Docs | Swagger/OpenAPI |
| Container | Docker, Docker Compose |

## Project Structure

```
joonbistudio/
├── .claude/                  # Claude Code 설정
│   ├── commands/            # 커스텀 명령어
│   ├── hooks/               # 훅
│   ├── rules/               # 코딩 규칙
│   └── settings.json        # 권한 설정
│
├── backend/                  # NestJS API Server
│   ├── src/
│   │   ├── common/          # 공통 유틸리티
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── config/          # 설정
│   │   ├── modules/         # 기능 모듈
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── clients/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   └── invoices/
│   │   └── main.ts
│   ├── test/
│   ├── .env
│   └── Dockerfile
│
├── frontend/                 # Next.js Client
│   └── src/
│       ├── app/             # App Router
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── types/
│
├── docker-compose.yml
├── CLAUDE.md                # This file
└── README.md
```

## Quick Start

```bash
# 1. DB 실행
docker-compose up -d db

# 2. Backend
cd backend && npm run start:dev

# 3. Frontend
cd frontend && npm run dev
```

## Coding Rules

### General
- No emojis in code/comments
- No console.log in production
- Explicit return types
- No `any` type

### Backend
- Controller: HTTP only
- Service: Business logic
- Entity: UUID primary key, audit fields
- DTO: class-validator

### Frontend
- Server Components default
- Tailwind for styling
- Zod for validation

### API Design
```typescript
// Response format
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 100 }
}
```

### Git
- Conventional commits: feat, fix, refactor, docs, test
- Feature branches from develop
- PR required for merge

## Commands

- `/setup` - 프로젝트 초기 설정
- `/gen-module <name>` - NestJS 모듈 생성
- `/gen-entity <name>` - TypeORM Entity 생성

## Environment Variables

### Backend (.env)
```bash
DATABASE_URL=postgresql://joonbi:joonbi123@localhost:5434/joonbistudio
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Domain Models

- **User**: 시스템 사용자 (관리자, PM)
- **Client**: 외주 클라이언트
- **Project**: 외주 프로젝트
- **Task**: 프로젝트 태스크/마일스톤
- **Invoice**: 청구서
- **Payment**: 결제 내역
