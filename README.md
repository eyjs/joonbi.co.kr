# Joonbi Studio - 외주관리시스템

외주 프로젝트 관리를 위한 풀스택 웹 애플리케이션

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | NestJS, TypeScript, PostgreSQL |
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Database | PostgreSQL 15+ |

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- PostgreSQL 15+

## Project Structure

```
joonbistudio/
├── backend/     # NestJS API Server (Port 3001)
├── frontend/    # Next.js Client (Port 3000)
├── CLAUDE.md    # Development guidelines
└── README.md    # This file
```

## Quick Start

### 1. Clone and Setup

```bash
cd joonbistudio
```

### 2. Database Setup

PostgreSQL 데이터베이스 생성:

```sql
CREATE DATABASE joonbistudio;
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://username:password@localhost:5432/joonbistudio
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=1d
PORT=3001
NODE_ENV=development
EOF

# Run development server
npm run start:dev
```

Backend will be available at `http://localhost:3001`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Development Commands

### Backend

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start in development mode with hot-reload |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Run linter |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Features (Planned)

- [ ] User authentication (JWT)
- [ ] Client management
- [ ] Project management
- [ ] Task tracking
- [ ] Invoice generation
- [ ] Payment tracking
- [ ] Dashboard & Analytics
- [ ] Document management

## API Documentation

API documentation will be available at `http://localhost:3001/api` (Swagger UI) after backend setup.

## Contributing

1. Create feature branch from `develop`
2. Follow conventional commits (`feat:`, `fix:`, `refactor:`, etc.)
3. Submit PR for review

## License

Private - All rights reserved
