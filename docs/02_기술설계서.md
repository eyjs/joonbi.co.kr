# 준비스튜디오 기술설계서

## 1. 기술 스택

### 1.1 Frontend

| 항목 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| UI Components | shadcn/ui | latest |
| State | Zustand | 4.x |
| Data Fetching | TanStack Query | 5.x |
| Form | React Hook Form + Zod | |

### 1.2 Backend

| 항목 | 기술 | 버전 |
|------|------|------|
| Framework | NestJS | 10.x |
| Language | TypeScript | 5.x |
| ORM | Prisma | 5.x |
| Validation | class-validator | |
| Auth | Passport.js + JWT | |
| API Docs | Swagger | |

### 1.3 Database

| 항목 | 기술 |
|------|------|
| RDBMS | PostgreSQL 16 |

> 💡 트래픽이 적은 서비스이므로 Redis 없이 JWT 기반 인증만 사용. 캐시 필요시 NestJS 내장 메모리 캐시 활용.

### 1.4 Infrastructure

| 항목 | 기술 |
|------|------|
| Container | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| SSL | Let's Encrypt |
| 개발 서버 | Mac Studio (홈서버) |
| 프로덕션 | AWS/NCP (전환 시) |

### 1.5 External Services

| 서비스 | 용도 |
|--------|------|
| PortOne | PG 결제 |
| Resend | 이메일 발송 |
| Discord Webhook | Clawdbot 트리거 |
| Stitch MCP | 화면설계 자동화 |

---

## 2. 시스템 아키텍처

### 2.1 전체 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                      시스템 아키텍처                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Client]                                                       │
│     │                                                           │
│     │ HTTPS                                                     │
│     ▼                                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      Nginx                               │   │
│  │                   (Reverse Proxy)                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│           │                              │                      │
│           │ /                            │ /api                 │
│           ▼                              ▼                      │
│  ┌─────────────────┐          ┌─────────────────┐              │
│  │    Next.js      │          │    NestJS       │              │
│  │   (Frontend)    │          │   (Backend)     │              │
│  │    :3000        │          │    :4000        │              │
│  └─────────────────┘          └────────┬────────┘              │
│                                        │                        │
│                          ┌─────────────┼─────────────┐         │
│                          │             │             │         │
│                          ▼             ▼             ▼         │
│                   ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│                   │PostgreSQL│  │  Resend  │  │ PortOne  │    │
│                   │  :5432   │  │ (Email)  │  │  (PG)    │    │
│                   └──────────┘  └──────────┘  └──────────┘    │
│                                                                 │
│  ════════════════════════════════════════════════════════════  │
│                    자동화 파이프라인                             │
│  ════════════════════════════════════════════════════════════  │
│                                                                 │
│  [NestJS] ──── Discord Webhook ────► [Discord]                 │
│                                           │                     │
│                                           │ 메시지 감지         │
│                                           ▼                     │
│                                     [Clawdbot]                  │
│                                     (Mac Studio)                │
│                                           │                     │
│                                           │ Internal API        │
│  [NestJS] ◄───────────────────────────────┘                    │
│     │                                                           │
│     │                                                           │
│     └──── Stitch MCP ────► [Figma]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 프로젝트 구조

```
joonbi-studio/
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env.example
│
├── nginx/
│   ├── nginx.conf
│   ├── conf.d/
│   └── ssl/
│
├── apps/
│   ├── web/                          # Next.js Frontend
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── src/
│   │       ├── app/
│   │       │   ├── (public)/         # 공개 페이지
│   │       │   │   ├── page.tsx      # 랜딩
│   │       │   │   ├── portfolio/
│   │       │   │   ├── services/
│   │       │   │   └── pricing/
│   │       │   ├── (auth)/           # 인증
│   │       │   │   ├── login/
│   │       │   │   └── register/
│   │       │   ├── (customer)/       # 고객 페이지
│   │       │   │   ├── dashboard/
│   │       │   │   ├── consults/
│   │       │   │   ├── projects/
│   │       │   │   └── payments/
│   │       │   └── (admin)/          # 관리자 페이지
│   │       │       ├── dashboard/
│   │       │       ├── consults/
│   │       │       ├── projects/
│   │       │       └── customers/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── lib/
│   │       └── types/
│   │
│   └── api/                          # NestJS Backend
│       ├── Dockerfile
│       ├── package.json
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── src/
│           ├── main.ts
│           ├── app.module.ts
│           ├── common/
│           │   ├── guards/
│           │   ├── decorators/
│           │   └── filters/
│           └── modules/
│               ├── auth/
│               ├── users/
│               ├── consultations/
│               ├── projects/
│               ├── documents/
│               ├── payments/
│               ├── notifications/
│               ├── discord/          # Discord 연동
│               └── internal/         # Internal API (Clawdbot용)
│
├── scripts/
│   ├── deploy.sh
│   ├── backup-db.sh
│   └── dev.sh
│
└── docs/
    ├── clawdbot-guide.md             # Clawdbot 지침서
    └── api-spec.md
```

---

## 4. Database 스키마

### 4.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== 사용자 ====================

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  name          String
  phone         String?
  role          Role      @default(CUSTOMER)
  
  consultations Consultation[]
  projects      Project[]
  payments      Payment[]
  notifications Notification[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

// ==================== 상담 ====================

model Consultation {
  id              String             @id @default(uuid())
  userId          String
  user            User               @relation(fields: [userId], references: [id])
  
  // 기본 정보
  type            ConsultationType
  projectName     String
  description     String
  referenceUrls   String[]
  budgetRange     String?
  desiredDate     DateTime?
  
  // 상태
  status          ConsultationStatus @default(PENDING)
  
  // AI 분석 상태
  analysisStatus  AnalysisStatus     @default(PENDING)
  analysisStartedAt DateTime?
  analysisError   String?
  
  // AI 분석 결과
  aiAnalyzedAt    DateTime?
  aiFeasibility   Feasibility?
  aiEstimatedMin  Int?
  aiEstimatedMax  Int?
  aiEstimatedDays Int?
  aiFeatures      Json?              // 기능 목록
  aiRisks         String[]
  aiRejectReason  String?
  aiAnalysis      Json?              // 전체 분석 결과
  
  // 관계
  files           ConsultationFile[]
  designs         ConsultationDesign[]
  project         Project?
  
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt
}

enum ConsultationType {
  SIMPLE    // 간편 상담 (무료)
  ANALYSIS  // 분석 상담 (유료)
}

enum ConsultationStatus {
  PENDING     // 대기
  PROCESSING  // 처리중
  COMPLETED   // 완료
  REJECTED    // 거절
  CONVERTED   // 프로젝트 전환
}

enum AnalysisStatus {
  PENDING     // 분석 대기
  PROCESSING  // 분석 중
  DONE        // 분석 완료
  FAILED      // 분석 실패
  SKIPPED     // 건너뜀 (간편상담)
}

enum Feasibility {
  FEASIBLE      // 개발 가능
  CONDITIONAL   // 조건부 가능
  INFEASIBLE    // 개발 불가
}

// 상담 산출물 (자동 생성 문서)
model ConsultationFile {
  id              String       @id @default(uuid())
  consultationId  String
  consultation    Consultation @relation(fields: [consultationId], references: [id])
  
  fileType        String       // analysis, requirements, plan, quotation
  fileName        String
  filePath        String       // 파일 경로 또는 URL
  
  createdAt       DateTime     @default(now())
}

// 화면설계 (Stitch 생성)
model ConsultationDesign {
  id              String       @id @default(uuid())
  consultationId  String
  consultation    Consultation @relation(fields: [consultationId], references: [id])
  
  figmaFileUrl    String       // 전체 Figma 파일 링크
  screens         Json         // 화면별 정보 [{screenId, screenName, figmaUrl}]
  
  createdAt       DateTime     @default(now())
}

// ==================== 프로젝트 ====================

model Project {
  id              String        @id @default(uuid())
  userId          String
  user            User          @relation(fields: [userId], references: [id])
  
  consultationId  String?       @unique
  consultation    Consultation? @relation(fields: [consultationId], references: [id])
  
  // 기본 정보
  projectCode     String        @unique  // PROJ-001
  projectName     String
  status          ProjectStatus @default(CONTRACT)
  
  // 금액
  totalAmount     Int           // 총 견적
  contractAmount  Int           // 계약금
  finalAmount     Int           // 잔금
  
  // 일정
  startDate       DateTime?
  expectedEndDate DateTime?
  actualEndDate   DateTime?
  
  // 포트폴리오 동의
  portfolioAgreed Boolean       @default(false)
  
  // 관계
  documents       Document[]
  messages        Message[]
  payments        Payment[]
  portfolio       Portfolio?
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum ProjectStatus {
  CONTRACT      // 계약 대기
  IN_PROGRESS   // 진행중
  REVIEW        // 검수중
  COMPLETED     // 완료
  CANCELLED     // 취소
}

// ==================== 산출물 ====================

model Document {
  id              String          @id @default(uuid())
  projectId       String
  project         Project         @relation(fields: [projectId], references: [id])
  
  docCode         String          // DOC-01, DOC-02...
  docType         DocumentType
  docName         String
  
  status          DocumentStatus  @default(WAITING)
  weight          Int             // 가중치 (%)
  
  filePath        String?
  reviewDeadline  DateTime?       // 검토 마감일
  
  feedbackItemCount Int           @default(0)
  feedbackLimit     Int           @default(5)
  
  feedbacks       DocumentFeedback[]
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
}

enum DocumentType {
  REQUIREMENTS    // 요구사항명세서
  SOURCE_CODE     // 소스코드
  MANUAL          // 운영매뉴얼
  CREDENTIALS     // 관리자계정정보
  SCREEN_DESIGN   // 화면설계서 (선택)
  ERD             // ERD (선택)
  API_SPEC        // API명세서 (선택)
  ARCHITECTURE    // 시스템아키텍처 (선택)
  TEST_RESULT     // 테스트결과서 (선택)
}

enum DocumentStatus {
  WAITING         // 대기
  WORKING         // 작업중
  REVIEW          // 검토중
  FEEDBACK        // 피드백
  APPROVED        // 승인
  DELIVERED       // 납품완료
}

// ==================== 피드백 ====================

model DocumentFeedback {
  id              String        @id @default(uuid())
  documentId      String
  document        Document      @relation(fields: [documentId], references: [id])
  
  content         String
  type            FeedbackType
  isNewFeature    Boolean       @default(false)  // 신규 기능 여부
  extraCost       Int?          // 추가 비용
  
  status          FeedbackStatus @default(PENDING)
  response        String?       // 관리자 응답
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum FeedbackType {
  BUG             // 버그
  CHANGE          // 수정 요청
  QUESTION        // 질문
  NEW_FEATURE     // 신규 기능
}

enum FeedbackStatus {
  PENDING         // 대기
  IN_PROGRESS     // 처리중
  RESOLVED        // 해결
  REJECTED        // 거절
}

// ==================== 결제 ====================

model Payment {
  id              String        @id @default(uuid())
  userId          String
  user            User          @relation(fields: [userId], references: [id])
  projectId       String?
  project         Project?      @relation(fields: [projectId], references: [id])
  
  paymentType     PaymentType
  amount          Int
  
  pgProvider      String?       // PortOne
  pgTid           String?       // 거래 ID
  
  status          PaymentStatus @default(PENDING)
  paidAt          DateTime?
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum PaymentType {
  CONSULTATION    // 상담 비용
  CONTRACT        // 계약금
  FINAL           // 잔금
  EXTRA           // 추가 비용
}

enum PaymentStatus {
  PENDING         // 대기
  COMPLETED       // 완료
  FAILED          // 실패
  REFUNDED        // 환불
}

// ==================== 메시지 ====================

model Message {
  id              String    @id @default(uuid())
  projectId       String
  project         Project   @relation(fields: [projectId], references: [id])
  
  senderId        String
  content         String
  isRead          Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
}

// ==================== 알림 ====================

model Notification {
  id              String           @id @default(uuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id])
  
  type            NotificationType
  title           String
  content         String
  link            String?
  isRead          Boolean          @default(false)
  
  createdAt       DateTime         @default(now())
}

enum NotificationType {
  CONSULTATION_RESULT    // 상담 결과
  PAYMENT_REQUEST        // 결제 요청
  DOCUMENT_UPLOADED      // 산출물 업로드
  REVIEW_REQUEST         // 검토 요청
  REVIEW_DEADLINE        // 검토 마감 임박
  FEEDBACK_REPLIED       // 피드백 답변
  PROJECT_COMPLETED      // 프로젝트 완료
  MESSAGE_RECEIVED       // 메시지 수신
}

// ==================== 포트폴리오 ====================

model Portfolio {
  id              String           @id @default(uuid())
  projectId       String           @unique
  project         Project          @relation(fields: [projectId], references: [id])
  
  title           String
  slug            String           @unique
  description     String?
  thumbnailUrl    String?
  displayType     PortfolioDisplay @default(ANONYMOUS)
  isPublic        Boolean          @default(false)
  
  images          PortfolioImage[]
  
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

enum PortfolioDisplay {
  FULL            // 전체 공개
  ANONYMOUS       // 익명 공개
  PRIVATE         // 비공개
}

model PortfolioImage {
  id              String    @id @default(uuid())
  portfolioId     String
  portfolio       Portfolio @relation(fields: [portfolioId], references: [id])
  
  imageUrl        String
  displayOrder    Int
  
  createdAt       DateTime  @default(now())
}

// ==================== 이벤트 ====================

model EventSlot {
  id              String    @id @default(uuid())
  eventType       String    // free_consultation
  totalSlots      Int       @default(10)
  usedSlots       Int       @default(0)
  isActive        Boolean   @default(true)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

---

## 5. API 설계

### 5.1 Public API

#### Auth

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | /api/auth/register | 회원가입 |
| POST | /api/auth/login | 로그인 |
| POST | /api/auth/logout | 로그아웃 |
| POST | /api/auth/refresh | 토큰 갱신 |
| GET | /api/auth/me | 내 정보 |

#### Consultations (Customer)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/consultations | 내 상담 목록 |
| POST | /api/consultations | 상담 신청 |
| GET | /api/consultations/:id | 상담 상세 |
| GET | /api/consultations/:id/files | 상담 산출물 |
| GET | /api/consultations/:id/designs | 화면설계 링크 |

#### Projects (Customer)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/projects | 내 프로젝트 목록 |
| GET | /api/projects/:id | 프로젝트 상세 |
| GET | /api/projects/:id/documents | 산출물 목록 |
| GET | /api/projects/:id/messages | 메시지 목록 |
| POST | /api/projects/:id/messages | 메시지 전송 |

#### Documents (Customer)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/documents/:id | 산출물 상세 |
| POST | /api/documents/:id/feedbacks | 피드백 등록 |
| POST | /api/documents/:id/approve | 승인 |

#### Payments

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/payments | 결제 내역 |
| POST | /api/payments/prepare | 결제 준비 |
| POST | /api/payments/complete | 결제 완료 |
| POST | /api/payments/webhook | PG 웹훅 |

### 5.2 Admin API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/admin/dashboard | 대시보드 통계 |
| GET | /api/admin/consultations | 상담 목록 |
| PATCH | /api/admin/consultations/:id | 상담 상태 변경 |
| POST | /api/admin/consultations/:id/convert | 프로젝트 전환 |
| GET | /api/admin/projects | 프로젝트 목록 |
| PATCH | /api/admin/projects/:id | 프로젝트 수정 |
| POST | /api/admin/documents/:id/upload | 산출물 업로드 |
| GET | /api/admin/customers | 고객 목록 |
| GET | /api/admin/payments | 결제 내역 |

### 5.3 Internal API (Clawdbot용) ⭐

> **인증**: `x-internal-api-key` 헤더로 API Key 인증

#### 상담 분석

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/internal/consultations/pending | 분석 대기 목록 |
| GET | /api/internal/consultations/:id | 상담 상세 |
| POST | /api/internal/consultations/:id/analysis/start | 분석 시작 |
| POST | /api/internal/consultations/:id/analysis | 분석 결과 저장 |
| POST | /api/internal/consultations/:id/analysis/fail | 분석 실패 |

#### 문서 생성

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | /api/internal/consultations/:id/documents | 문서 업로드 |

#### 화면설계

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | /api/internal/consultations/:id/designs | 화면설계 저장 |

---

## 6. Discord 연동

### 6.1 웹훅 발송 (NestJS → Discord)

```typescript
// modules/discord/discord.service.ts

@Injectable()
export class DiscordService {
  private readonly webhookUrl: string;

  constructor(private config: ConfigService) {
    this.webhookUrl = this.config.get('DISCORD_WEBHOOK_URL');
  }

  // 전체 분석 요청 (분석 + 문서 + 화면설계)
  async requestFullAnalysis(consultation: Consultation) {
    const message = {
      content: [
        `[JOONBI_FULL_ANALYSIS]`,
        `ID: ${consultation.id}`,
        `PROJECT: ${consultation.projectName}`,
        `BUDGET: ${consultation.budgetRange || '미정'}`,
        `URLS: ${consultation.referenceUrls.join(' | ')}`,
        `DESC: ${consultation.description.slice(0, 500)}`,
        `---`,
        `1. 분석 수행 후 POST /internal/consultations/${consultation.id}/analysis`,
        `2. 문서 생성 후 POST /internal/consultations/${consultation.id}/documents`,
        `3. 화면설계 후 POST /internal/consultations/${consultation.id}/designs`,
      ].join('\n'),
    };

    await axios.post(this.webhookUrl, message);
  }

  // 분석 완료 알림 (관리자용)
  async notifyAnalysisComplete(consultation: Consultation) {
    const feasibilityEmoji = {
      FEASIBLE: '✅',
      CONDITIONAL: '⚠️',
      INFEASIBLE: '❌',
    };

    const message = {
      embeds: [{
        title: `${feasibilityEmoji[consultation.aiFeasibility]} 분석 완료: ${consultation.projectName}`,
        color: consultation.aiFeasibility === 'FEASIBLE' ? 0x00FF00 : 
               consultation.aiFeasibility === 'CONDITIONAL' ? 0xFFAA00 : 0xFF0000,
        fields: [
          { name: '판정', value: consultation.aiFeasibility, inline: true },
          { name: '예상 견적', value: `${consultation.aiEstimatedMin?.toLocaleString()}~${consultation.aiEstimatedMax?.toLocaleString()}원`, inline: true },
          { name: '예상 기간', value: `${consultation.aiEstimatedDays}일`, inline: true },
        ],
        url: `https://joonbi.co.kr/admin/consults/${consultation.id}`,
      }],
    };

    await axios.post(this.webhookUrl, message);
  }
}
```

### 6.2 상담 신청 시 트리거

```typescript
// modules/consultations/consultations.service.ts

@Injectable()
export class ConsultationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly discordService: DiscordService,
  ) {}

  async create(dto: CreateConsultationDto, user: User) {
    // 1. 상담 생성
    const consultation = await this.prisma.consultation.create({
      data: {
        userId: user.id,
        type: dto.type,
        projectName: dto.projectName,
        description: dto.description,
        referenceUrls: dto.referenceUrls,
        budgetRange: dto.budgetRange,
        desiredDate: dto.desiredDate,
        analysisStatus: dto.type === 'ANALYSIS' ? 'PENDING' : 'SKIPPED',
      },
    });

    // 2. 분석 상담이면 Discord로 Clawdbot 트리거
    if (dto.type === 'ANALYSIS') {
      await this.discordService.requestFullAnalysis(consultation);
    }

    return consultation;
  }
}
```

---

## 7. Internal API 구현

### 7.1 API Key Guard

```typescript
// common/guards/internal-api.guard.ts

@Injectable()
export class InternalApiGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-internal-api-key'];
    
    const validKey = this.configService.get('INTERNAL_API_KEY');
    
    if (!apiKey || apiKey !== validKey) {
      throw new UnauthorizedException('Invalid internal API key');
    }
    
    return true;
  }
}
```

### 7.2 Internal Controller

```typescript
// modules/internal/internal.controller.ts

@Controller('internal')
@UseGuards(InternalApiGuard)
export class InternalController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly discordService: DiscordService,
    private readonly notificationService: NotificationService,
    private readonly fileService: FileService,
  ) {}

  // ==================== 분석 ====================

  // 분석 대기 목록
  @Get('consultations/pending')
  async getPendingConsultations() {
    return this.prisma.consultation.findMany({
      where: {
        type: 'ANALYSIS',
        analysisStatus: 'PENDING',
      },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });
  }

  // 상담 상세
  @Get('consultations/:id')
  async getConsultation(@Param('id') id: string) {
    return this.prisma.consultation.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
  }

  // 분석 시작
  @Post('consultations/:id/analysis/start')
  async startAnalysis(@Param('id') id: string) {
    return this.prisma.consultation.update({
      where: { id },
      data: {
        analysisStatus: 'PROCESSING',
        analysisStartedAt: new Date(),
      },
    });
  }

  // 분석 결과 저장
  @Post('consultations/:id/analysis')
  async saveAnalysis(
    @Param('id') id: string,
    @Body() dto: SaveAnalysisDto,
  ) {
    const updated = await this.prisma.consultation.update({
      where: { id },
      data: {
        analysisStatus: 'DONE',
        aiAnalyzedAt: new Date(),
        aiFeasibility: dto.feasibility,
        aiEstimatedMin: dto.estimatedMin,
        aiEstimatedMax: dto.estimatedMax,
        aiEstimatedDays: dto.estimatedDays,
        aiFeatures: dto.features,
        aiRisks: dto.risks,
        aiRejectReason: dto.rejectReason,
        aiAnalysis: dto,
      },
    });

    // 관리자 Discord 알림
    await this.discordService.notifyAnalysisComplete(updated);

    return { success: true, id };
  }

  // 분석 실패
  @Post('consultations/:id/analysis/fail')
  async failAnalysis(
    @Param('id') id: string,
    @Body() dto: { error: string },
  ) {
    return this.prisma.consultation.update({
      where: { id },
      data: {
        analysisStatus: 'FAILED',
        analysisError: dto.error,
      },
    });
  }

  // ==================== 문서 ====================

  // 문서 업로드
  @Post('consultations/:id/documents')
  async uploadDocuments(
    @Param('id') id: string,
    @Body() dto: UploadDocumentsDto,
  ) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    // 각 문서 저장
    const files = await Promise.all(
      dto.documents.map(async (doc) => {
        // Markdown → PDF 변환 및 저장
        const pdfPath = await this.fileService.saveMarkdownAsPdf(
          `consultations/${id}/${doc.type}.pdf`,
          doc.content,
        );

        return this.prisma.consultationFile.create({
          data: {
            consultationId: id,
            fileType: doc.type,
            fileName: `${doc.type}.pdf`,
            filePath: pdfPath,
          },
        });
      }),
    );

    return { success: true, files };
  }

  // ==================== 화면설계 ====================

  // 화면설계 저장
  @Post('consultations/:id/designs')
  async saveDesigns(
    @Param('id') id: string,
    @Body() dto: SaveDesignsDto,
  ) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    // 디자인 정보 저장
    await this.prisma.consultationDesign.create({
      data: {
        consultationId: id,
        figmaFileUrl: dto.figmaFileUrl,
        screens: dto.screens,
      },
    });

    // 상담 파일에도 추가
    await this.prisma.consultationFile.create({
      data: {
        consultationId: id,
        fileType: 'design',
        fileName: '샘플 화면설계',
        filePath: dto.figmaFileUrl,
      },
    });

    // 상담 상태 완료
    await this.prisma.consultation.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });

    // 고객 알림
    await this.notificationService.notify(consultation.userId, {
      type: 'CONSULTATION_RESULT',
      title: '분석 결과가 준비되었습니다',
      content: '문서와 샘플 화면설계를 확인해주세요.',
      link: `/my/consults/${id}`,
    });

    return { success: true };
  }
}
```

---

## 8. Clawdbot 지침서

### 8.1 전체 분석 가이드

```markdown
## 📋 준비스튜디오 전체 분석 가이드

### 트리거
`[JOONBI_FULL_ANALYSIS]` 메시지 감지 시 실행

### API 정보
- Base URL: https://api.joonbi.co.kr
- 인증 헤더: x-internal-api-key: {INTERNAL_API_KEY}

### 처리 절차

#### STEP 1: 분석
1. 분석 시작 마킹
   POST /internal/consultations/{id}/analysis/start

2. 자동 거절 체크
   ❌ 거절 사유:
   - 예산 "10만원 미만" 또는 숫자 < 100000
   - 키워드: 도박, 카지노, 성인, 토토, 불법
   - 요청: 모바일앱, AI모델, 블록체인, 실시간영상통화

3. 참고사이트 크롤링
   - 페이지 구조 파악
   - 기능 감지 (로그인, 검색, 장바구니 등)

4. 기능 추출 & 견적
   단가표:
   | 기능 | 단가 |
   |------|------|
   | 랜딩페이지 | 3만/장 |
   | 정적페이지 | 5만/장 |
   | 동적페이지(CRUD) | 15만/장 |
   | 로그인/회원가입 | 20만 |
   | SNS로그인 | 10만/종 |
   | 게시판(기본) | 15만 |
   | 게시판(댓글) | 25만 |
   | PG결제 | 50만 |
   | 관리자화면 | 20만/화면 |
   | 파일업로드 | 10만 |
   | 검색(필터) | 15만 |

5. 결과 저장
   POST /internal/consultations/{id}/analysis
   Body: {
     "feasibility": "FEASIBLE|CONDITIONAL|INFEASIBLE",
     "estimatedMin": 최소견적,
     "estimatedMax": 최대견적,
     "estimatedDays": 예상일수,
     "features": [{"name": "기능명", "price": 가격, "required": true/false}],
     "risks": ["리스크1", "리스크2"],
     "rejectReason": "거절사유 또는 null"
   }

#### STEP 2: 문서 생성
다음 4개 문서를 마크다운으로 작성:

a) 업무분석서 (analysis)
b) 요구사항명세서 (requirements)
c) 샘플기획서 (plan)
d) 견적서 (quotation)

결과 전송:
POST /internal/consultations/{id}/documents
Body: {
  "documents": [
    { "type": "analysis", "content": "마크다운..." },
    { "type": "requirements", "content": "마크다운..." },
    { "type": "plan", "content": "마크다운..." },
    { "type": "quotation", "content": "마크다운..." }
  ]
}

#### STEP 3: 화면설계
요구사항에서 추출한 화면 목록으로 Stitch 프롬프트 생성:

각 화면에 대해:
```
@stitch 
{참고사이트} 스타일로 {화면명} 화면 디자인

서비스: {projectName}
포함요소:
- {feature1}
- {feature2}

스타일: 모던, 깔끔, 반응형
```

결과 전송:
POST /internal/consultations/{id}/designs
Body: {
  "figmaFileUrl": "https://figma.com/file/xxx",
  "screens": [
    { "screenId": "SCR-001", "screenName": "로그인", "figmaUrl": "..." }
  ]
}

#### STEP 4: 완료 보고
Discord에 결과 요약 메시지 작성

### 에러 처리
분석 실패 시:
POST /internal/consultations/{id}/analysis/fail
Body: { "error": "에러 메시지" }
```

---

## 9. 진행률 계산

```typescript
// 산출물 상태별 완료도
const STATUS_COMPLETION = {
  WAITING: 0,
  WORKING: 0.3,
  REVIEW: 0.7,
  FEEDBACK: 0.5,
  APPROVED: 0.9,
  DELIVERED: 1.0,
};

// 산출물 가중치
const DOCUMENT_WEIGHTS = {
  'DOC-01': 20,  // 요구사항명세서
  'DOC-02': 50,  // 소스코드
  'DOC-03': 20,  // 운영매뉴얼
  'DOC-04': 10,  // 관리자계정정보
};

// 진행률 계산
function calculateProgress(documents: Document[]): number {
  let totalProgress = 0;
  
  for (const doc of documents) {
    const weight = DOCUMENT_WEIGHTS[doc.docCode] || 0;
    const completion = STATUS_COMPLETION[doc.status] || 0;
    totalProgress += weight * completion;
  }
  
  return Math.round(totalProgress);
}
```

---

## 10. 개발 일정

| 주차 | 작업 | 산출물 |
|------|------|--------|
| 1주 | 프로젝트 셋업, DB 스키마, 인증 | 기반 구조 |
| 2주 | 공개 페이지, 고객 기능 (상담, 결제) | 고객 MVP |
| 3주 | 관리자 기능, 산출물 관리 | 관리자 페이지 |
| 4주 | Discord 연동, Internal API | 자동화 파이프라인 |
| 5주 | 알림, 이메일, 스케줄러 | 부가 기능 |
| 6주 | 테스트, 버그 수정, 배포 | 릴리즈 |

---

## 11. 환경 변수

```bash
# .env.example

# ==================== General ====================
NODE_ENV=development
TZ=Asia/Seoul

# ==================== URLs ====================
FRONTEND_URL=https://joonbi.co.kr
API_URL=https://joonbi.co.kr/api

# ==================== Database ====================
DB_HOST=db
DB_PORT=5432
DB_NAME=joonbi
DB_USER=joonbi
DB_PASSWORD=your_secure_password
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# ==================== JWT ====================
JWT_SECRET=your_jwt_secret_32_chars_minimum
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d

# ==================== Internal API ====================
INTERNAL_API_KEY=joonbi_internal_key_xxxxxx

# ==================== Discord ====================
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/xxx

# ==================== Email (Resend) ====================
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=no-reply@joonbi.co.kr

# ==================== Payment (PortOne) ====================
PORTONE_API_KEY=your_api_key
PORTONE_API_SECRET=your_api_secret
PORTONE_MERCHANT_ID=your_merchant_id

# ==================== File ====================
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=52428800
```
