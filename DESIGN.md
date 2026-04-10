# 준비스튜디오 디자인 문서

## 디자인 방향 (2026-04 리디자인)

- **톤앤매너**: 라이트/클린 (흰 배경, 블루 포인트)
- **레퍼런스**: https://litmers.com/ (포트폴리오 중심형, 단 라이트 테마)
- **포인트 컬러**: Blue (#3B82F6)
- **폰트**: Pretendard (한국어 최적화)
- **금지 요소**: 네온 글로우, 다크 배경(어드민 제외), 그라데이션 텍스트

## 페이지 구성

### 1. 홈페이지 (6개 섹션)

| 순서 | 섹션 | 컴포넌트 |
|------|------|----------|
| 1 | Hero | `hero-section.tsx` |
| 2 | 포트폴리오 갤러리 | `portfolio-gallery-section.tsx` |
| 3 | 작업 프로세스 | `work-process-section.tsx` |
| 4 | 대시보드 소개 | `dashboard-intro-section.tsx` |
| 5 | 고객 후기 | `testimonials-section.tsx` |
| 6 | 상담 CTA | `consultation-cta-section.tsx` |

### 2. 포트폴리오 목록 (`/portfolio`)

- 갤러리형 카드 레이아웃
- 카테고리 필터 (전체, 웹, 시스템, 앱 등)
- 카드: 대표 이미지 + 프로젝트명 + 기술스택 태그

### 3. 포트폴리오 상세 (`/portfolio/[slug]`)

스텝 네비게이션 인터랙션:

```
01 과제 → 02 솔루션 → 03 결과 → 04 아키텍처
```

- 상단 스텝 바 (현재 위치 하이라이트)
- IntersectionObserver 기반 자동 스텝 전환
- 섹션 타입: OVERVIEW (마크다운), DIAGRAM (Mermaid), BRIEF, VIDEO, IMAGES

### 4. 상담 신청 (`/consultation`)

6단계 플로우:
1. 간단 폼 (프로젝트 설명, 참고 URL, 예산)
2. 대기 화면 (10초 폴링)
3. 명세서 뷰어 (AI 분석 결과 + 확인)
4. 정보 수집 (이름, 연락처)
5. 다이어그램 뷰어 (Mermaid)
6. 결제 (목업)

### 5. 대시보드 (`/dashboard/[uuid]`)

- UUID 기반 접근 (로그인 불필요)
- 프로젝트 진행 상태, 문서 뷰어/다운로드
- 라이트 테마

### 6. 어드민 (`/admin/*`)

- 다크 테마 유지
- 로그인: `/admin/login`
- 대시보드, 포트폴리오 관리, 상담 관리

## CSS 토큰 체계

```css
/* 라이트 테마 (기본) */
--background: 0 0% 100%;
--foreground: 222 47% 11%;
--primary: 217 91% 60%;        /* Blue #3B82F6 */
--primary-foreground: 0 0% 100%;
--muted: 210 40% 96%;
--border: 214 32% 91%;
```

## Stitch 프로젝트 (레거시)

> 아래는 초기 다크 테마 시절 Stitch MCP로 생성한 화면 목록입니다. 리디자인 후 미사용.

- **Project ID**: `3879481212836281318`
- **생성일**: 2026-02-02
