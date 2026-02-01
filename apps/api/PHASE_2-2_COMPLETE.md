# Phase 2-2 완료: 상담 모듈 재작업

## 변경 사항

### 1. consultations.service.ts

#### 변경 내용:
- TicketsService 의존성 제거 (티켓 시스템 제거)
- `create()` 메서드 수정:
  - 상담 생성 시 `type`이 `ANALYSIS`면 `analysisStatus`를 `PENDING`으로 설정
  - 상담 생성 시 `type`이 `SIMPLE`이면 `analysisStatus`를 `SKIPPED`로 설정
  - `aiRisks` 빈 배열로 초기화
- `findById()` 메서드 수정:
  - `include: { files: true, designs: true }` 추가하여 산출물과 화면설계 함께 조회
- `getDesigns()` 메서드 추가:
  - 상담 ID로 화면설계 목록 조회
  - `ConsultationDesignResponseDto`로 변환하여 반환
- `updateStatus()`, `canAccessConsultation()`, `getStatsByStatus()` 유지

### 2. consultations.controller.ts

#### 변경 내용:
- `GET /api/consultations/:id/designs` 엔드포인트 추가
  - 상담의 화면설계 링크 조회
  - `ConsultationDesignResponseDto[]` 반환
  - Swagger 문서화 완료

### 3. dto/create-consultation.dto.ts

#### 변경 내용:
- `attachmentPath` 필드 제거 (첨부파일 시스템 간소화)
- 필수 필드:
  - `type`: ConsultationType (SIMPLE | ANALYSIS)
  - `projectName`: string
  - `description`: string (최소 100자)
  - `referenceUrls`: string[] (최소 1개)
- 선택 필드:
  - `budgetRange`: string
  - `desiredDate`: string (ISO 8601)

### 4. dto/consultation-response.dto.ts

#### 완전 재작성:
- 티켓 관련 필드 제거 (`ticketId`, `attachmentPath`)
- AI 분석 필드 추가:
  - `analysisStatus`: AnalysisStatus
  - `analysisStartedAt`: DateTime
  - `analysisError`: string
  - `aiAnalyzedAt`: DateTime
  - `aiFeasibility`: Feasibility (FEASIBLE | CONDITIONAL | INFEASIBLE)
  - `aiEstimatedMin`: number
  - `aiEstimatedMax`: number
  - `aiEstimatedDays`: number
  - `aiFeatures`: Json (기능 목록)
  - `aiRisks`: string[]
  - `aiRejectReason`: string
  - `aiAnalysis`: Json (전체 분석 결과)

### 5. dto/consultation-design-response.dto.ts

#### 신규 생성:
- 화면설계 응답 DTO
- 필드:
  - `id`: string
  - `consultationId`: string
  - `figmaFileUrl`: string
  - `screens`: Json (화면별 정보)
  - `createdAt`: DateTime

### 6. dto/index.ts

#### 변경 내용:
- `ConsultationDesignResponseDto` export 추가

## API 엔드포인트

### 기존 엔드포인트:
- `GET /api/consultations` - 내 상담 목록 조회
- `GET /api/consultations/:id` - 상담 상세 조회 (files, designs 포함)
- `POST /api/consultations` - 상담 신청
- `GET /api/consultations/:id/files` - 상담 산출물 목록 조회

### 신규 엔드포인트:
- `GET /api/consultations/:id/designs` - 화면설계 링크 조회

## 데이터베이스 스키마 대응

### Consultation 모델:
- type (ConsultationType)
- projectName, description, referenceUrls, budgetRange, desiredDate
- status (ConsultationStatus)
- analysisStatus (AnalysisStatus) - 생성 시 자동 설정
- analysisStartedAt, analysisError
- aiAnalyzedAt, aiFeasibility, aiEstimatedMin, aiEstimatedMax, aiEstimatedDays
- aiFeatures (Json), aiRisks (string[]), aiRejectReason, aiAnalysis (Json)

### ConsultationFile 모델:
- fileType, fileName, filePath
- consultationId 관계

### ConsultationDesign 모델:
- figmaFileUrl, screens (Json)
- consultationId 관계

## 테스트 필요 사항

1. 상담 생성 시 `analysisStatus` 자동 설정 확인
   - ANALYSIS → PENDING
   - SIMPLE → SKIPPED

2. 상담 상세 조회 시 files, designs 포함 확인

3. 산출물 조회 엔드포인트 동작 확인

4. 화면설계 조회 엔드포인트 동작 확인

5. Swagger 문서 생성 확인

## 서비스 메서드

```typescript
findAll(userId: string): Promise<ConsultationResponseDto[]>
findById(id: string, userId: string): Promise<ConsultationResponseDto>
create(userId: string, dto: CreateConsultationDto): Promise<ConsultationResponseDto>
getFiles(consultationId: string, userId: string): Promise<ConsultationFileResponseDto[]>
getDesigns(consultationId: string, userId: string): Promise<ConsultationDesignResponseDto[]>
canAccessConsultation(consultationId: string, userId: string): Promise<boolean>
getStatsByStatus(userId: string): Promise<Record<ConsultationStatus, number>>
```

## 코딩 규칙 준수

- No emojis in code/comments
- No console.log in production
- Explicit return types
- No `any` type (일부 Json 필드 제외)
- Controller: HTTP only
- Service: Business logic
- DTO: class-validator
- Swagger documentation (@ApiTags, @ApiOperation, @ApiResponse)

## 다음 단계

### Internal API 모듈 구현 (Clawdbot 연동)
- `POST /api/internal/consultations/:id/analysis/start` - 분석 시작
- `POST /api/internal/consultations/:id/analysis` - 분석 결과 저장
- `POST /api/internal/consultations/:id/analysis/fail` - 분석 실패
- `POST /api/internal/consultations/:id/documents` - 문서 업로드
- `POST /api/internal/consultations/:id/designs` - 화면설계 저장

### Discord 웹훅 서비스 구현
- 상담 신청 시 Discord 웹훅 전송
- 분석 완료 시 관리자 알림

## 완료 시각
2026-02-01
