# 서버 환경변수 설정 가이드

## 📋 사전 준비

이 작업은 **Mac Studio (배포 서버)**에서 수행합니다.

## 🔧 설정 절차

### 1. 서버 접속

```bash
# Mac Studio에 접속 (또는 로컬에서 작업 중이라면 생략)
ssh user@mac-studio-ip
```

### 2. 프로젝트 디렉토리 이동

```bash
cd ~/path/to/joonbi.co.kr
```

### 3. .env 파일 생성

```bash
# 프로덕션 템플릿을 .env로 복사
cp .env.production.example .env
```

### 4. 실제 값으로 수정

```bash
# nano 또는 vim으로 편집
nano .env
```

**반드시 변경해야 할 값:**

```bash
# ===================
# JWT (강력한 키로 변경!)
# ===================
JWT_SECRET=$(openssl rand -base64 64)
JWT_REFRESH_SECRET=$(openssl rand -base64 64)

# ===================
# Resend Email (실제 API 키)
# ===================
RESEND_API_KEY=re_실제키입력

# ===================
# Discord (이미 설정됨)
# ===================
DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/1469145847454368009/G7oK-uYATjvxxToYFVRgAr1f_OUtHLPyPSlG5ABbG7eiywb20Mli7n791YzkzceExGxp

# ===================
# NICE Payments (실제 가맹점 정보)
# ===================
NICE_CLIENT_ID=실제클라이언트ID
NICE_CLIENT_SECRET=실제클라이언트시크릿

# ===================
# Internal API (강력한 키로 변경!)
# ===================
INTERNAL_API_KEY=$(openssl rand -hex 32)
```

### 5. 강력한 키 생성 명령어

```bash
# JWT Secret 생성
openssl rand -base64 64

# Internal API Key 생성
openssl rand -hex 32
```

생성된 키를 복사해서 `.env` 파일에 붙여넣습니다.

### 6. .env 파일 권한 설정

```bash
# 파일 권한을 소유자만 읽기/쓰기로 제한
chmod 600 .env

# 확인
ls -la .env
# 출력: -rw------- 1 user staff ... .env
```

### 7. Docker 컨테이너 재시작

```bash
# 기존 컨테이너 중지 및 제거
docker-compose down

# 새 환경변수로 재시작
docker-compose up -d

# 로그 확인
docker-compose logs -f api
```

## ✅ 검증

### 환경변수 로드 확인

```bash
# Docker 컨테이너 내부 환경변수 확인 (값은 숨김)
docker-compose exec api printenv | grep -E "JWT_SECRET|RESEND_API_KEY|INTERNAL_API_KEY"
```

### API 헬스체크

```bash
curl http://localhost:8081/health
```

**예상 응답:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-10T..."
}
```

## 🔐 보안 체크리스트

- [x] `.env` 파일이 `.gitignore`에 포함되어 있음
- [x] JWT_SECRET을 강력한 랜덤 키로 변경
- [x] INTERNAL_API_KEY를 강력한 랜덤 키로 변경
- [x] `.env` 파일 권한 600 설정
- [ ] RESEND_API_KEY 실제 키 입력
- [ ] NICE Payments 실제 키 입력 (테스트 시에는 테스트 키)
- [ ] Kakao 키 입력 (사용 시)

## 📝 주의사항

1. **절대로 .env 파일을 Git에 커밋하지 마세요**
2. **로컬 PC에서 .env 파일을 수정하지 마세요** (서버에서만 수정)
3. **프로덕션 키를 Slack/Discord에 붙여넣지 마세요**
4. **정기적으로 키를 갱신하세요** (3개월마다)

## 🆘 트러블슈팅

### Docker 컨테이너가 시작되지 않음

```bash
# 로그 확인
docker-compose logs api

# 환경변수 구문 오류 확인
docker-compose config
```

### API가 환경변수를 읽지 못함

```bash
# NestJS ConfigModule이 .env 파일을 로드하는지 확인
docker-compose exec api cat .env
```

### RESEND_API_KEY 오류

`.env`에서 `RESEND_API_KEY`가 비어있으면 EmailsService에서 에러가 발생합니다.
- 임시로 더미 값 입력: `RESEND_API_KEY=re_dummy_key_for_testing`
- 실제 키 발급: https://resend.com/api-keys
