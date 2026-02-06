# Vercel 환경변수 설정 가이드

## 🎯 목적
프로덕션 환경에서 Backend API와 통신하도록 환경변수 설정

## 📋 설정 단계

### 1. Vercel 대시보드 접속
https://vercel.com/eyjs/joonbi-co-kr

### 2. Settings → Environment Variables 이동

### 3. 환경변수 추가

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://api.joonbi.co.kr` | Production |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8081` | Preview, Development |

### 4. 재배포
- Settings → Deployments → 최신 배포 선택
- **Redeploy** 버튼 클릭
- 또는 새로운 커밋을 푸시하여 자동 배포

## 🔍 확인 방법

### 브라우저 개발자 도구
```javascript
// Console에서 확인
console.log(process.env.NEXT_PUBLIC_API_URL)
// 출력: https://api.joonbi.co.kr
```

### Network 탭
- API 요청 URL이 `https://api.joonbi.co.kr/api/...`로 가는지 확인

## ⚠️ 주의사항

1. **NEXT_PUBLIC_** 접두사 필수
   - 클라이언트에서 접근하려면 `NEXT_PUBLIC_`로 시작해야 함

2. **재배포 필수**
   - 환경변수 변경 후 반드시 재배포해야 적용됨

3. **CloudFlare Tunnel 설정 필요**
   - `https://api.joonbi.co.kr`가 작동하려면 CloudFlare Tunnel 설정 완료해야 함
   - 현재 상태: 설정 필요 (DEPLOYMENT_STATUS.md 참고)

## 📞 트러블슈팅

### API 요청이 여전히 localhost로 감
→ 재배포 확인, 브라우저 캐시 삭제

### CORS 에러 발생
→ Backend API에서 `https://joonbi.co.kr` origin 허용 필요

### CloudFlare Tunnel 미설정
→ 임시로 ngrok 또는 로컬 터널 사용 가능
