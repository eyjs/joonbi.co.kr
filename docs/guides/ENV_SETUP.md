# 환경변수 설정 가이드

## 📁 파일 구조

```
프로젝트 루트/
├── .env.example              # 템플릿 (Git 추적)
├── .env.development          # 로컬 개발용 (Git 추적 X)
├── .env.production.example   # 프로덕션 템플릿 (Git 추적)
├── .env                      # 실제 사용 (Git 추적 X)
└── docker-compose.yml        # .env 파일 읽음
```

## 🔧 환경별 설정

### 로컬 개발 환경

**사용 파일**: `.env.development`

```bash
# 1. .env.development를 .env로 복사
cp .env.development .env

# 2. Docker Compose 실행
docker-compose up -d
```

**주요 설정**:
- Database: `localhost:5435`
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`
- JWT Secret: 개발용 간단한 키

### 프로덕션 서버

**사용 파일**: `.env.production.example` → `.env`

```bash
# 서버에서 실행
cd /path/to/joonbi.co.kr

# 1. 프로덕션 템플릿 복사
cp .env.production.example .env

# 2. 실제 값으로 수정
nano .env

# 3. Docker Compose 실행
docker-compose up -d
```

**반드시 변경해야 할 값**:
- ✅ `JWT_SECRET` - 강력한 랜덤 키
- ✅ `JWT_REFRESH_SECRET` - 강력한 랜덤 키
- ✅ `INTERNAL_API_KEY` - 강력한 랜덤 키
- ✅ `DISCORD_WEBHOOK_URL` - 프로덕션 웹훅 (개발용과 분리)
- ✅ `RESEND_API_KEY` - 실제 API 키
- ✅ `NICE_CLIENT_ID`, `NICE_CLIENT_SECRET` - 실제 가맹점 정보

**강력한 키 생성**:
```bash
# JWT_SECRET 생성
openssl rand -base64 64

# INTERNAL_API_KEY 생성
openssl rand -hex 32
```

## 🔐 보안 체크리스트

### Git에 절대 커밋하지 말 것
- [ ] `.env`
- [ ] `.env.development` (실제 키 포함 시)
- [ ] `.env.production`

### Git에 커밋해도 되는 것
- [x] `.env.example`
- [x] `.env.production.example` (placeholder만)

### 프로덕션 서버에서 확인
```bash
# 환경변수 확인 (값은 숨김)
docker-compose config | grep -E "JWT_SECRET|DISCORD_WEBHOOK_URL|RESEND_API_KEY"

# 실제 값 확인 (조심!)
cat .env | grep "JWT_SECRET"
```

## 📊 환경별 차이점

| 항목 | 개발 | 프로덕션 |
|------|------|----------|
| Database | localhost:5435 | db:5432 (Docker 내부) |
| Frontend URL | localhost:3000 | https://joonbi.co.kr |
| Backend URL | localhost:8081 | https://api.joonbi.co.kr |
| JWT Secret | 간단한 키 | 강력한 랜덤 키 |
| Discord 웹훅 | 개발용 채널 | 프로덕션 채널 |
| NICE 결제 | 테스트 키 | 실제 가맹점 키 |
| NODE_ENV | development | production |

## 🚀 빠른 시작

### 로컬에서 처음 시작할 때
```bash
# 1. 개발 환경변수 복사
cp .env.development .env

# 2. 필요시 Discord 웹훅 URL 수정
nano .env

# 3. Docker 실행
docker-compose up -d
```

### 서버에 처음 배포할 때
```bash
# 1. 프로덕션 템플릿 복사
cp .env.production.example .env

# 2. 모든 값을 실제 값으로 변경
nano .env

# 3. 강력한 키 생성 및 입력
openssl rand -base64 64

# 4. Docker 실행
docker-compose up -d
```

## ⚠️ 주의사항

1. **절대로 .env 파일을 Git에 커밋하지 마세요**
2. **프로덕션 키는 반드시 강력한 랜덤 키로 변경**
3. **개발/프로덕션 Discord 웹훅은 분리** (잘못된 알림 방지)
4. **프로덕션 .env는 서버에서만 관리** (로컬에 다운로드 금지)
