# 연동 서비스 설정 가이드

## 📋 연동 서비스 목록

### 1. Discord 웹훅 (필수) ⚡

**용도**: 상담 신청 시 Clawdbot에게 자동 분석 요청

**설정 방법**:
1. Discord 서버 생성 또는 기존 서버 선택
2. 채널 설정 → 연동 → 웹훅 생성
3. 웹훅 URL 복사
4. `.env` 파일에 추가:
   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
   ```

**사용 위치**:
- `apps/api/src/modules/discord/discord.service.ts`
- 분석 상담 신청 시 자동 호출

**메시지 형식**:
```
[JOONBI_FULL_ANALYSIS]
ID: uuid-here
PROJECT: A사 쇼핑몰
BUDGET: 300~500만원
URLS: https://example.com
DESC: 프로젝트 설명...
```

### 2. Resend 이메일 (필수) 📧

**용도**: 고객에게 분석 결과, 결제 요청 등 이메일 전송

**설정 방법**:
1. https://resend.com 가입
2. API Key 생성
3. 도메인 인증 (joonbi.co.kr)
4. `.env` 파일에 추가:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   EMAIL_FROM=noreply@joonbi.co.kr
   ```

**사용 위치**:
- `apps/api/src/modules/emails/emails.service.ts`
- 상담 결과, 결제 요청, 문서 준비 알림

**템플릿**:
- `consultationResultTemplate` - 분석 결과 전송
- `paymentRequestTemplate` - 결제 요청
- `documentReadyTemplate` - 문서 준비 완료
- `reviewReminderTemplate` - 검토 리마인더
- `projectCompletedTemplate` - 프로젝트 완료

### 3. NICE 결제 (옵션) 💳

**용도**: 분석 상담 비용, 계약금, 잔금 결제

**설정 방법**:
1. NICE페이먼츠 가맹점 신청
2. Client ID, Secret 발급
3. `.env` 파일에 추가:
   ```env
   NICE_CLIENT_ID=your-client-id
   NICE_CLIENT_SECRET=your-client-secret
   NICE_RETURN_URL=https://joonbi.co.kr/api/payments/callback
   NICE_CANCEL_URL=https://joonbi.co.kr/my/payments/cancel
   ```

**사용 위치**:
- `apps/api/src/modules/payments/payments.service.ts`

### 4. Kakao 알림톡 (옵션) 💬

**용도**: 고객에게 카카오톡으로 알림 전송

**설정 방법**:
1. 카카오 비즈니스 채널 생성
2. REST API 키 발급
3. 알림톡 템플릿 등록
4. `.env` 파일에 추가:
   ```env
   KAKAO_REST_API_KEY=your-rest-api-key
   KAKAO_SENDER_KEY=your-sender-key
   ```

### 5. Clawdbot (자동화 엔진) 🤖

**용도**: Discord 웹훅 메시지를 감지하고 자동 분석 수행

**설정**:
- 별도 서버 (Mac Studio)에서 실행
- Discord 채널 모니터링
- `[JOONBI_FULL_ANALYSIS]` 메시지 감지 시:
  1. 참고사이트 크롤링 및 분석
  2. 문서 4종 생성 (업무분석서, 요구사항명세서, 견적서, 샘플기획서)
  3. Stitch MCP로 화면설계 생성
  4. API 호출하여 결과 저장:
     - `POST /internal/consultations/{id}/analysis`
     - `POST /internal/consultations/{id}/documents`
     - `POST /internal/consultations/{id}/designs`

**필요 도구**:
- Claude Code CLI
- Stitch MCP
- Discord.js 또는 유사 라이브러리

### 6. Google Cloud Storage (파일 저장) ☁️

**용도**: PDF 문서, 화면설계 이미지 저장

**설정 방법**:
1. GCP 프로젝트 생성
2. Cloud Storage 버킷 생성
3. 서비스 계정 키 발급
4. `.env` 파일에 추가:
   ```env
   GCS_PROJECT_ID=your-project-id
   GCS_BUCKET=joonbi-studio-archive
   GCS_KEY_FILE=/app/gcs-key.json
   ```

---

## 🔐 환경변수 우선순위

### 필수 (즉시 설정)
1. ✅ `DATABASE_URL`
2. ✅ `JWT_SECRET`, `JWT_REFRESH_SECRET`
3. ⚠️ `DISCORD_WEBHOOK_URL` - Discord 웹훅 URL
4. ⚠️ `RESEND_API_KEY` - 이메일 전송용

### 선택 (나중에 설정)
5. `NICE_CLIENT_ID`, `NICE_CLIENT_SECRET` - 결제 기능
6. `KAKAO_REST_API_KEY` - 알림톡
7. `GCS_*` - 파일 저장

---

## 📊 현재 구현 상태

| 서비스 | 코드 구현 | 환경변수 | 테스트 |
|--------|-----------|----------|--------|
| Discord 웹훅 | ✅ 완료 | ⚠️ .env.example 추가 필요 | ❌ 미실행 |
| Resend 이메일 | ✅ 완료 | ✅ 준비됨 | ❌ 미실행 |
| NICE 결제 | ✅ 완료 | ✅ 준비됨 | ❌ 미실행 |
| Kakao 알림톡 | ⚠️ 환경변수만 | ✅ 준비됨 | ❌ 미구현 |
| Clawdbot | ❌ 별도 서버 | - | ❌ 미설정 |
| GCS | ✅ 완료 | ✅ 준비됨 | ❌ 미실행 |

---

## 🚀 다음 단계

1. Discord 웹훅 URL 발급 및 설정
2. Resend API Key 발급 및 설정
3. Docker 컨테이너 실행 및 테스트
4. Clawdbot 서버 설정 (Mac Studio)
5. 전체 자동화 파이프라인 테스트
