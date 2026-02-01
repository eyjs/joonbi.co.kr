# Phase 2-4: Internal API 모듈 구현 완료

## 구현 내용

### 1. DTOs (Data Transfer Objects)

#### `dto/save-analysis.dto.ts`
- `FeatureDto`: 기능 정보 (이름, 설명, 가격, 필수여부)
- `SaveAnalysisDto`: 분석 결과 (개발가능성, 견적범위, 예상일수, 기능목록, 리스크, 거절사유)

#### `dto/upload-documents.dto.ts`
- `DocumentType`: 문서 타입 enum (analysis, requirements, plan, quotation)
- `DocumentDto`: 개별 문서 정보
- `UploadDocumentsDto`: 문서 목록

#### `dto/save-designs.dto.ts`
- `ScreenDto`: 화면 정보 (ID, 이름, Figma URL)
- `SaveDesignsDto`: 화면설계 정보 (Figma 파일 URL, 화면 목록)

#### `dto/analysis-fail.dto.ts`
- `AnalysisFailDto`: 분석 실패 정보 (에러 메시지)

### 2. Guards

#### `guards/internal-api.guard.ts`
- `x-internal-api-key` 헤더로 API 키 검증
- ConfigService에서 `INTERNAL_API_KEY` 환경변수 사용
- 유효하지 않은 키인 경우 UnauthorizedException 발생

### 3. Service

#### `internal.service.ts`
구현 메서드:
- `getPendingConsultations()`: 분석 대기 중인 상담 목록 조회 (최대 10개)
- `getConsultation(id)`: 상담 상세 조회 (사용자 정보 포함)
- `startAnalysis(id)`: 분석 시작 마킹 (상태를 PROCESSING으로 변경)
- `saveAnalysis(id, dto)`: 분석 결과 저장 및 Discord 알림 전송
- `failAnalysis(id, dto)`: 분석 실패 처리
- `uploadDocuments(id, dto)`: 문서 업로드 (ConsultationFile 생성)
- `saveDesigns(id, dto)`: 화면설계 저장 (ConsultationDesign, ConsultationFile 생성, 상담 상태 COMPLETED로 변경)

### 4. Controller

#### `internal.controller.ts`
엔드포인트:
- `GET /api/internal/consultations/pending`: 분석 대기 목록
- `GET /api/internal/consultations/:id`: 상담 상세
- `POST /api/internal/consultations/:id/analysis/start`: 분석 시작
- `POST /api/internal/consultations/:id/analysis`: 분석 결과 저장
- `POST /api/internal/consultations/:id/analysis/fail`: 분석 실패
- `POST /api/internal/consultations/:id/documents`: 문서 업로드
- `POST /api/internal/consultations/:id/designs`: 화면설계 저장

모든 엔드포인트에 InternalApiGuard 적용

### 5. Module

#### `internal.module.ts`
- PrismaModule, DiscordModule 의존성 주입
- InternalController, InternalService 등록

### 6. 환경 설정

#### `.env.example`
```bash
INTERNAL_API_KEY=joonbi_internal_key_xxxxxx
```

#### `app.module.ts`
- InternalModule 등록

#### `main.ts`
- Swagger API 키 인증 설정 추가 (internal-api-key)

## 파일 구조

```
apps/api/src/modules/internal/
├── dto/
│   ├── save-analysis.dto.ts
│   ├── upload-documents.dto.ts
│   ├── save-designs.dto.ts
│   ├── analysis-fail.dto.ts
│   └── index.ts
├── guards/
│   └── internal-api.guard.ts
├── internal.controller.ts
├── internal.service.ts
└── internal.module.ts
```

## 주요 기능

### 분석 결과 저장 시 동작
1. Consultation 엔티티 업데이트 (분석 결과 저장)
2. DiscordService.notifyAnalysisComplete() 호출하여 관리자에게 알림

### 화면설계 저장 시 동작
1. ConsultationDesign 생성 (Figma 파일 URL, 화면 목록)
2. ConsultationFile 생성 (화면설계 파일 정보)
3. 상담 상태를 COMPLETED로 변경

## 보안

- 모든 Internal API 엔드포인트는 InternalApiGuard로 보호됨
- `x-internal-api-key` 헤더 필수
- 환경변수로 관리되는 API 키와 일치해야 접근 가능

## API 문서

Swagger UI에서 확인 가능:
- http://localhost:4000/api/docs
- "Internal API (Clawdbot)" 태그로 구분됨
- API 키 인증 스키마 표시됨

## 다음 단계

Clawdbot 구현 시 이 Internal API를 사용하여:
1. 분석 대기 목록 조회
2. 분석 시작 마킹
3. 분석 결과 저장
4. 문서 업로드
5. 화면설계 저장

## 완료 일시

2026-02-01
