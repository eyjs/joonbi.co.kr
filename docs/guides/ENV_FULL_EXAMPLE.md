# Mac Studio 서버용 .env 파일 전체 내용

아래 내용을 복사해서 Mac Studio의 프로젝트 루트에 `.env` 파일로 저장하세요.

## 프로덕션 환경 (서버 배포용)

```bash
# ===================
# Database
# ===================
DATABASE_URL=postgresql://admin:vmffpdl2@@db:5432/joonbi

# ===================
# JWT (강력한 키로 변경 필요!)
# ===================
# 아래 명령어로 생성: openssl rand -base64 64
JWT_SECRET=CHANGE_THIS_TO_STRONG_SECRET_KEY_IN_PRODUCTION
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=CHANGE_THIS_TO_STRONG_REFRESH_SECRET_KEY
JWT_REFRESH_EXPIRES_IN=7d

# ===================
# File Storage
# ===================
UPLOAD_PATH=/data/uploads
MAX_FILE_SIZE=52428800

# ===================
# Google Cloud Storage
# ===================
GCS_PROJECT_ID=your-gcp-project-id
GCS_BUCKET=joonbi-studio-archive
GCS_KEY_FILE=/app/gcs-key.json

# ===================
# Discord (실제 웹훅 URL)
# ===================
DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/1469145847454368009/G7oK-uYATjvxxToYFVRgAr1f_OUtHLPyPSlG5ABbG7eiywb20Mli7n791YzkzceExGxp

# 분석 에이전트 User ID (멘션용)
# DEPRECATED: CLAWDBOT_USER_ID=1466191190419443723

# ===================
# Resend Email
# ===================
RESEND_API_KEY=re_PRODUCTION_KEY_HERE
EMAIL_FROM=noreply@joonbi.co.kr

# ===================
# NICE Payments (실제 또는 테스트)
# ===================
NICE_CLIENT_ID=your-production-client-id
NICE_CLIENT_SECRET=your-production-client-secret
NICE_RETURN_URL=https://joonbi.co.kr/api/payments/callback
NICE_CANCEL_URL=https://joonbi.co.kr/my/payments/cancel

# ===================
# Kakao Alimtalk
# ===================
KAKAO_REST_API_KEY=your-kakao-rest-api-key
KAKAO_SENDER_KEY=your-kakao-sender-key

# ===================
# Internal API (강력한 키로 변경!)
# ===================
# 아래 명령어로 생성: openssl rand -hex 32
INTERNAL_API_KEY=CHANGE_THIS_TO_STRONG_RANDOM_KEY

# ===================
# URLs (Production)
# ===================
FRONTEND_URL=https://joonbi.co.kr
BACKEND_URL=https://api.joonbi.co.kr
PORT=4000
NODE_ENV=production
```

---

## 개발 환경 (로컬 테스트용)

만약 Mac Studio를 로컬 개발 환경으로 사용한다면:

```bash
# ===================
# Database (로컬)
# ===================
DATABASE_URL=postgresql://admin:vmffpdl2@@localhost:5435/joonbi_dev

# ===================
# JWT (개발용)
# ===================
JWT_SECRET=dev-jwt-secret-key-not-for-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=dev-refresh-secret-key-not-for-production
JWT_REFRESH_EXPIRES_IN=30d

# ===================
# File Storage
# ===================
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=52428800

# ===================
# Discord (실제 웹훅)
# ===================
DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/1469145847454368009/G7oK-uYATjvxxToYFVRgAr1f_OUtHLPyPSlG5ABbG7eiywb20Mli7n791YzkzceExGxp
# DEPRECATED: CLAWDBOT_USER_ID=1466191190419443723

# ===================
# Resend Email (테스트용)
# ===================
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=noreply@joonbi.co.kr

# ===================
# NICE Payments (테스트)
# ===================
NICE_CLIENT_ID=test-client-id
NICE_CLIENT_SECRET=test-client-secret
NICE_RETURN_URL=http://localhost:3000/api/payments/callback
NICE_CANCEL_URL=http://localhost:3000/my/payments/cancel

# ===================
# Internal API (개발용)
# ===================
INTERNAL_API_KEY=dev_internal_key_12345

# ===================
# URLs (Development)
# ===================
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8081
NEXT_PUBLIC_API_URL=http://localhost:8081
PORT=4000
NODE_ENV=development
```

---

## 🔧 Mac Studio에서 설정하기

### 1. 프로젝트 디렉토리로 이동
```bash
cd ~/joonbi.co.kr  # 또는 실제 경로
```

### 2. .env 파일 생성
```bash
nano .env
```

### 3. 위 내용 복사해서 붙여넣기
- 프로덕션이면 → 프로덕션 환경 내용
- 로컬 개발이면 → 개발 환경 내용

### 4. 강력한 키 생성 (프로덕션만)
```bash
# JWT_SECRET 생성
openssl rand -base64 64

# JWT_REFRESH_SECRET 생성
openssl rand -base64 64

# INTERNAL_API_KEY 생성
openssl rand -hex 32
```

생성된 키를 복사해서 `.env` 파일의 해당 위치에 붙여넣기

### 5. Docker 재시작
```bash
docker-compose down
docker-compose up -d

# 로그 확인
docker-compose logs -f api
```

---

## ✅ 확인사항

- [x] DISCORD_WEBHOOK_URL 설정됨
- [x] # DEPRECATED: CLAWDBOT_USER_ID 설정됨
- [ ] JWT_SECRET 강력한 키로 변경 (프로덕션만)
- [ ] INTERNAL_API_KEY 강력한 키로 변경 (프로덕션만)
- [ ] RESEND_API_KEY 실제 키 입력
- [ ] NICE 키 입력 (사용 시)

---

Mac Studio가 프로덕션 서버인가요, 아니면 로컬 개발 환경인가요?
