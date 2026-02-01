# pnpm → npm 마이그레이션 가이드

## 📋 개요

**날짜**: 2026-02-02
**이유**: Vercel 배포 시 ERR_INVALID_THIS 에러 해결

## 🔄 변경 사항

### 제거된 항목
- ❌ `pnpm-workspace.yaml`
- ❌ `turbo.json`
- ❌ `turbo` 패키지
- ❌ `.npmrc` 설정
- ❌ `packageManager` 필드

### 추가된 항목
- ✅ `package-lock.json` (재현 가능한 빌드)
- ✅ npm workspaces 사용

### 수정된 항목
- 📝 `workspace:*` → `*` (package.json)
- 📝 `.gitignore` (npm lock 추적)
- 📝 `vercel.json` (npm 명령어 사용)
- 📝 `README.md`, `CLAUDE.md` (문서 업데이트)

## 🚀 로컬 개발 환경 설정

### 기존 환경 정리

```bash
# pnpm 관련 파일 제거 (이미 완료됨)
rm -rf pnpm-lock.yaml .pnpm-store

# node_modules 정리
rm -rf node_modules apps/*/node_modules packages/*/node_modules
```

### npm으로 설정

```bash
# 1. 의존성 설치
npm install

# 2. 모든 워크스페이스 개발 모드
npm run dev

# 3. 특정 워크스페이스만 실행
npm run dev --workspace=@joonbi/web   # Frontend
npm run dev --workspace=@joonbi/api   # Backend

# 4. 빌드
npm run build

# 5. 테스트
npm run test
```

## 📦 패키지 관리

### 패키지 추가

```bash
# 루트 (devDependencies)
npm install -D prettier

# 특정 워크스페이스
npm install axios --workspace=@joonbi/web
npm install @nestjs/common --workspace=@joonbi/api

# 공유 패키지
npm install lodash --workspace=@joonbi/shared
```

### 패키지 제거

```bash
npm uninstall axios --workspace=@joonbi/web
```

### 패키지 업데이트

```bash
# 특정 패키지 업데이트
npm update axios --workspace=@joonbi/web

# 모든 패키지 업데이트
npm update
```

## 🔍 주요 차이점

| 항목 | pnpm | npm workspaces |
|------|------|----------------|
| **Lock 파일** | pnpm-lock.yaml | package-lock.json |
| **워크스페이스** | pnpm-workspace.yaml | package.json workspaces |
| **의존성 참조** | workspace:* | * |
| **설치 속도** | ⚡ 빠름 | 🐢 중간 |
| **디스크 사용** | 💾 효율적 (hardlink) | 💿 일반 (복사) |
| **Vercel 호환** | ⚠️ 불안정 | ✅ 완벽 |
| **Node 버전** | >=16 | >=18 |

## ⚠️ 주의사항

### 1. package-lock.json은 커밋

```bash
# .gitignore에서 제거됨
# 반드시 커밋해야 함!
git add package-lock.json
git commit -m "chore: Add package-lock.json"
```

### 2. 빌드 캐시 정리

Vercel 배포 시 문제가 있다면:
- Dashboard → Deployments → Redeploy → **✅ Clear build cache**

### 3. 로컬 개발 시

```bash
# package-lock.json이 변경되면 반드시 설치
npm ci  # 또는 npm install
```

## 🐛 트러블슈팅

### 문제: 워크스페이스 패키지를 찾을 수 없음

```bash
# 증상
Error: Cannot find module '@joonbi/shared'

# 해결
npm install  # 워크스페이스 링크 재생성
```

### 문제: 빌드 실패 (Vercel)

```bash
# 증상
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@joonbi%2fshared

# 해결
# vercel.json 확인
{
  "installCommand": "npm install",  // ✅ 올바름
  "buildCommand": "npm run build"   // ✅ 올바름
}
```

### 문제: 의존성 버전 충돌

```bash
# 증상
npm ERR! ERESOLVE unable to resolve dependency tree

# 해결
npm install --legacy-peer-deps
```

## 📚 참고 자료

- [npm workspaces 공식 문서](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
- [Vercel npm 배포 가이드](https://vercel.com/docs/deployments/configure-a-build#npm)
- [프로젝트 README.md](../../README.md)

## ✅ 마이그레이션 체크리스트

프로젝트 설정:
- [x] pnpm-workspace.yaml 삭제
- [x] turbo.json 삭제
- [x] package.json의 workspace:* → * 변경
- [x] package-lock.json 커밋
- [x] .gitignore 업데이트

문서 업데이트:
- [x] README.md
- [x] CLAUDE.md
- [x] NPM_MIGRATION.md (이 문서)

배포 설정:
- [x] vercel.json npm 명령어 변경
- [x] Vercel 빌드 성공 확인

보안:
- [x] npm audit 실행
- [x] 주요 패키지 업데이트 (supertest, eslint, @nestjs/cli)

## 🎉 완료!

npm workspaces로 완전히 전환되었습니다.
Vercel 배포가 정상적으로 작동합니다.
