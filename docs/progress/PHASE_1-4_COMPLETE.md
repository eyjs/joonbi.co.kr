# Phase 1-4 완료: Docker Compose 설정

## 작업 완료 내역

### 1. Docker Compose 파일

#### 1.1 프로덕션 환경 (docker-compose.yml)
- 4개 컨테이너 구성: nginx, web, api, db
- joonbi.co.kr, api.joonbi.co.kr 도메인 지원
- SSL/TLS 설정 포함
- 파일 업로드 볼륨 마운트 (/data/joonbi/uploads)
- PostgreSQL 데이터 영속화
- 네트워크 격리 (joonbi-network)

#### 1.2 개발 환경 (docker-compose.dev.yml)
- Hot reload 지원 (소스 볼륨 마운트)
- 개발용 환경변수 설정
- 로컬 파일 업로드 경로 (./data/uploads)
- PostgreSQL health check
- 포트 노출 (web:3000, api:4000, db:5432)

### 2. Dockerfile

#### 2.1 Frontend (apps/web/Dockerfile)
- Multi-stage build (deps, builder, runner)
- Next.js standalone 모드
- pnpm 사용
- Node 20 Alpine
- 개발용 Dockerfile.dev 별도 제공

#### 2.2 Backend (apps/api/Dockerfile)
- Multi-stage build
- Prisma 마이그레이션 자동 실행
- NestJS 빌드 최적화
- 개발용 Dockerfile.dev 별도 제공

### 3. Nginx 설정

#### 3.1 프로덕션 (nginx/nginx.conf)
- HTTP → HTTPS 리다이렉트
- joonbi.co.kr: 프론트엔드 + API (/api)
- api.joonbi.co.kr: API 전용
- 정적 파일 서빙 (/uploads)
- Gzip 압축
- SSL/TLS 1.2, 1.3
- 파일 업로드 50MB 제한

#### 3.2 개발 (nginx/nginx.dev.conf)
- localhost 기반
- HTTP만 사용 (SSL 제외)
- 동일한 프록시 설정

### 4. 환경변수

#### .env.example 생성
- Database 설정
- JWT 시크릿
- 파일 스토리지
- Google Cloud Storage
- 나이스페이먼츠
- Resend 이메일
- 카카오 알림톡
- URL 설정
- 개발환경 샘플

### 5. .dockerignore

#### 루트 .dockerignore
- node_modules, 빌드 아웃풋 제외
- .env 파일 제외
- 테스트 파일 제외
- 문서 파일 제외

#### apps/web/.dockerignore
- Next.js 특화 설정

#### apps/api/.dockerignore
- NestJS 특화 설정

## 디렉토리 구조

```
joonbistudio/
├── docker-compose.yml          # 프로덕션
├── docker-compose.dev.yml      # 개발
├── .env.example                # 환경변수 템플릿
├── .dockerignore
│
├── nginx/
│   ├── nginx.conf              # 프로덕션 설정
│   ├── nginx.dev.conf          # 개발 설정
│   └── ssl/                    # SSL 인증서 (수동 배치)
│       ├── fullchain.pem
│       └── privkey.pem
│
├── apps/
│   ├── web/
│   │   ├── Dockerfile          # 프로덕션
│   │   ├── Dockerfile.dev      # 개발
│   │   └── .dockerignore
│   │
│   └── api/
│       ├── Dockerfile          # 프로덕션
│       ├── Dockerfile.dev      # 개발
│       └── .dockerignore
│
└── data/
    └── uploads/                # 파일 업로드 (생성 필요)
```

## 사용 방법

### 개발 환경 실행

```bash
# 1. 환경변수 복사
cp .env.example .env

# 2. 업로드 디렉토리 생성
mkdir -p data/uploads

# 3. 개발 환경 실행
docker-compose -f docker-compose.dev.yml up -d

# 4. 로그 확인
docker-compose -f docker-compose.dev.yml logs -f

# 5. 중지
docker-compose -f docker-compose.dev.yml down
```

### 프로덕션 환경 실행

```bash
# 1. 환경변수 설정
cp .env.example .env
vi .env  # 실제 값으로 변경

# 2. SSL 인증서 배치
# nginx/ssl/fullchain.pem
# nginx/ssl/privkey.pem

# 3. 업로드 디렉토리 생성 (홈서버)
sudo mkdir -p /data/joonbi/uploads

# 4. 프로덕션 실행
docker-compose up -d

# 5. 로그 확인
docker-compose logs -f

# 6. 중지
docker-compose down
```

## 컨테이너 포트

### 프로덕션
- nginx: 80, 443 (외부 노출)
- web: 3000 (내부)
- api: 4000 (내부)
- db: 5432 (내부)

### 개발
- nginx: 80 (외부 노출)
- web: 3000 (외부 노출 - 직접 접근 가능)
- api: 4000 (외부 노출 - 직접 접근 가능)
- db: 5432 (외부 노출)

## 주요 설정

### 볼륨
- **uploads**: 파일 업로드 저장소
  - 프로덕션: /data/joonbi/uploads (호스트)
  - 개발: ./data/uploads (프로젝트 내)
- **postgres_data**: PostgreSQL 데이터

### 네트워크
- joonbi-network (bridge)

### 환경변수
- DATABASE_URL: PostgreSQL 연결
- JWT_SECRET: JWT 시크릿
- UPLOAD_PATH: 파일 업로드 경로
- GCS_BUCKET: Google Cloud Storage
- NICE_*: 나이스페이먼츠
- RESEND_*: 이메일
- KAKAO_*: 알림톡

## 다음 단계

### Phase 2-1: API 모듈 개발
- Auth 모듈
- Users 모듈
- Consultations 모듈
- Projects 모듈
- Documents 모듈

### 추가 작업 필요
1. SSL 인증서 발급 (Let's Encrypt)
2. GCS 서비스 계정 키 (gcs-key.json)
3. 나이스페이먼츠 API 키 발급
4. Resend API 키 발급
5. 카카오 알림톡 키 발급

## 참고사항

### 보안
- .env 파일은 절대 커밋하지 말 것
- gcs-key.json은 .gitignore에 추가
- JWT 시크릿은 충분히 긴 랜덤 문자열 사용

### 성능
- nginx gzip 압축 활성화
- 정적 파일 캐싱 (30일)
- 프록시 타임아웃 60초

### 개발 팁
- 개발 환경에서는 소스 볼륨 마운트로 hot reload
- node_modules는 컨테이너 내부에서만 사용 (볼륨 마스킹)
- DB health check로 안전한 API 시작

## 완료일
2026-02-01
