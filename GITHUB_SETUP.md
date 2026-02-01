# GitHub 레포지토리 설정 가이드

## ✅ 로컬 커밋 완료

현재 상태: 모든 변경사항이 커밋되었습니다.

```
commit 1c4ca6f
Author: 사용자 <email>
Date: 오늘

refactor: 프로젝트 구조 개선 및 문서 정리
```

## 📋 GitHub 레포지토리 생성 단계

### 1. GitHub 웹사이트에서 레포지토리 생성

1. https://github.com/new 접속
2. 설정:
   - **Repository name**: `joonbi.co.kr`
   - **Description**: 외주 프로젝트 관리 시스템
   - **Visibility**: `Private` 선택
   - **Initialize**: 아무것도 체크하지 않음 (README, .gitignore 등)
3. "Create repository" 클릭

### 2. 로컬에서 원격 저장소 연결 및 푸시

GitHub에 표시되는 명령어를 실행하거나, 아래 명령어를 실행하세요:

```bash
# 기존 origin이 있다면 제거
git remote remove origin 2>/dev/null || true

# 새 origin 추가 (YOUR_USERNAME을 실제 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/joonbi.co.kr.git

# 또는 SSH를 사용한다면:
# git remote add origin git@github.com:YOUR_USERNAME/joonbi.co.kr.git

# 브랜치 이름을 main으로 확정
git branch -M main

# 푸시
git push -u origin main
```

### 3. 확인

푸시 완료 후 https://github.com/YOUR_USERNAME/joonbi.co.kr에서 확인

---

## 🚀 다음 단계: Vercel 배포

GitHub 푸시 완료 후:

### 1. Vercel 연결

1. https://vercel.com 접속
2. "Add New Project" 클릭
3. GitHub 레포지토리 `joonbi.co.kr` 선택

### 2. 빌드 설정

| 설정 | 값 |
|------|-----|
| Framework Preset | Next.js |
| Root Directory | `apps/web` |
| Build Command | `cd ../.. && pnpm build --filter=@joonbi/web` |
| Output Directory | `.next` (기본값) |
| Install Command | `pnpm install` |

### 3. 환경변수

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.joonbi.co.kr` (실제 API 도메인) |

### 4. 배포

"Deploy" 클릭하여 배포 시작

---

## 🐳 백엔드 Docker 배포

로컬에서:

```bash
# 개발 모드
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# 프로덕션 모드
docker-compose up -d
```

접속 주소:
- Frontend (개발): http://localhost:3000
- Backend (개발): http://localhost:4000
- Database: localhost:5435

---

## 📝 체크리스트

- [ ] GitHub 레포지토리 생성 완료
- [ ] 로컬에서 푸시 완료
- [ ] Vercel 연결 및 배포 완료
- [ ] 백엔드 Docker 실행 확인
- [ ] 환경변수 설정 완료
- [ ] API와 Frontend 연동 확인
