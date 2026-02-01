# Phase 2-1 완료: 티켓 모듈 구현

## 완료일
2026-02-01

## 구현 내용

### 1. 디렉토리 구조
```
apps/api/src/modules/tickets/
├── dto/
│   ├── create-ticket.dto.ts
│   ├── purchase-ticket.dto.ts
│   ├── ticket-response.dto.ts
│   └── index.ts
├── tickets.controller.ts
├── tickets.service.ts
├── tickets.module.ts
└── index.ts
```

### 2. DTO (Data Transfer Objects)

#### CreateTicketDto
- `userId`: 사용자 ID (UUID)
- `type`: 티켓 타입 (FREE, PAID, EVENT)
- `amount`: 금액 (optional)

#### PurchaseTicketDto
- `type`: 구매할 티켓 타입

#### TicketResponseDto
- 티켓 정보 전체 반환
- Swagger 문서화 포함

### 3. Service Layer (tickets.service.ts)

#### 비즈니스 로직
- **티켓 가격 상수**:
  - FREE: 0원
  - PAID: 100,000원
  - EVENT: 0원

#### 주요 메서드

##### 조회 기능
- `findAll(userId)`: 사용자의 모든 티켓 조회
- `findAvailable(userId)`: 사용 가능한 티켓만 조회
- `findById(id, userId)`: 특정 티켓 상세 조회
- `getTicketBalance(userId)`: 사용 가능한 티켓 개수 조회

##### 티켓 발급
- `create(createTicketDto)`: 티켓 생성 (내부용)
- `purchase(userId, purchaseTicketDto)`: 유료 티켓 구매 요청
  - Payment 레코드 생성 (PENDING 상태)
  - Transaction으로 데이터 무결성 보장
  - 무료/이벤트 티켓 구매 방지
- `issueEventTicket(userId)`: 이벤트 티켓 발급 (관리자용)
- `issueFreeTicket(userId)`: 무료 티켓 발급 (관리자용)

##### 티켓 사용/환불
- `useTicket(ticketId, consultationId, userId)`: 티켓 사용
  - 상태를 USED로 변경
  - consultationId 연결
  - usedAt 타임스탬프 기록
- `refundTicket(ticketId, userId, reason)`: 티켓 환불
  - 상태를 REFUNDED로 변경
  - 환불 사유 기록

##### User.ticketBalance 동기화
- `updateUserTicketBalance(userId)`: 사용 가능한 티켓 개수를 User 테이블에 동기화
- 티켓 생성/사용/환불 시 자동 호출

### 4. Controller Layer (tickets.controller.ts)

#### API 엔드포인트

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| GET | `/api/tickets` | 내 티켓 목록 조회 | 필수 |
| GET | `/api/tickets/available` | 사용 가능한 티켓 조회 | 필수 |
| GET | `/api/tickets/balance` | 티켓 잔액 조회 | 필수 |
| GET | `/api/tickets/:id` | 티켓 상세 조회 | 필수 |
| POST | `/api/tickets/purchase` | 티켓 구매 요청 | 필수 |

#### 인증/인가
- 모든 엔드포인트에 `JwtAuthGuard` 적용
- `@CurrentUser()` 데코레이터로 현재 사용자 정보 주입

#### Swagger 문서화
- `@ApiTags('티켓')`
- `@ApiOperation()`: 각 엔드포인트 설명
- `@ApiResponse()`: 응답 코드별 설명
- `@ApiBearerAuth()`: JWT 인증 필수 표시

### 5. Module 등록

#### tickets.module.ts
- PrismaModule import
- TicketsController, TicketsService 등록
- TicketsService export (다른 모듈에서 사용 가능)

#### app.module.ts
- TicketsModule 등록

## 비즈니스 로직 요약

### 티켓 타입별 특성

| 타입 | 가격 | 발급 방법 | 용도 |
|------|------|-----------|------|
| FREE | 0원 | 관리자 발급 | 무료 상담 |
| PAID | 100,000원 | 사용자 구매 | 유료 상담 |
| EVENT | 0원 | 이벤트를 통한 발급 | 이벤트 상담 |

### 티켓 상태 흐름

```
AVAILABLE → USED (상담 신청 시)
         → REFUNDED (환불 시)
```

### 주요 제약사항
1. 무료 티켓과 이벤트 티켓은 직접 구매 불가
2. 사용된 티켓은 환불 불가
3. 이미 환불된 티켓은 재환불 불가
4. 티켓 사용 시 consultationId 필수

### User.ticketBalance 동기화
- 티켓의 상태 변경 시마다 자동으로 User 테이블의 ticketBalance 업데이트
- 별도 계산 없이 User.ticketBalance 필드로 바로 사용 가능한 티켓 개수 확인 가능

## 다음 단계
- [ ] 결제 모듈과 연동 (티켓 구매 시 실제 결제 처리)
- [ ] 이벤트 모듈과 연동 (이벤트 티켓 자동 발급)
- [ ] 상담 모듈에서 티켓 사용 기능 구현
- [ ] 관리자용 티켓 발급 API 추가

## 테스트 필요 항목
- [ ] 티켓 구매 플로우 (결제 연동 후)
- [ ] 티켓 사용 및 환불 시나리오
- [ ] User.ticketBalance 동기화 정확성
- [ ] 동시성 제어 (여러 티켓을 동시에 사용하는 경우)

## 참고사항
- Prisma schema에 정의된 Ticket 모델 기준으로 구현
- TECH_SPEC.md의 API 설계 참조
- NestJS Best Practices 준수
- Swagger 문서 자동 생성 완료
