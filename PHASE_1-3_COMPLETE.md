# Phase 1-3 완료: JWT 인증 모듈 구현

## 완료 일시
2026-02-01

## 구현 내용

### 1. 인증 모듈 구조
```
apps/api/src/modules/auth/
├── auth.module.ts              # 인증 모듈 설정
├── auth.controller.ts          # 인증 컨트롤러 (회원가입, 로그인, 토큰갱신, 내정보)
├── auth.service.ts             # 인증 서비스 (JWT 발급/검증, 비밀번호 해싱)
├── index.ts                    # Export 모음
│
├── dto/
│   ├── login.dto.ts           # 로그인 DTO
│   ├── register.dto.ts        # 회원가입 DTO
│   ├── token.dto.ts           # 토큰 응답 DTO
│   └── index.ts
│
├── strategies/
│   ├── jwt.strategy.ts        # JWT 인증 전략
│   └── local.strategy.ts      # Local 인증 전략
│
├── guards/
│   ├── jwt-auth.guard.ts      # JWT 인증 가드
│   └── roles.guard.ts         # 역할 기반 권한 가드
│
└── decorators/
    ├── current-user.decorator.ts  # @CurrentUser() 데코레이터
    ├── roles.decorator.ts         # @Roles() 데코레이터
    └── public.decorator.ts        # @Public() 데코레이터
```

### 2. API 엔드포인트

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| POST | /api/auth/register | 회원가입 | Public |
| POST | /api/auth/login | 로그인 | Public |
| POST | /api/auth/refresh | 토큰 갱신 | Public |
| GET | /api/auth/me | 내 정보 조회 | Required |
| POST | /api/auth/logout | 로그아웃 | Public |

### 3. 구현 상세

#### 3.1 JWT 토큰
- **Access Token**: 7일 유효기간
- **Refresh Token**: 30일 유효기간
- JWT_SECRET과 JWT_REFRESH_SECRET 분리

#### 3.2 비밀번호 보안
- bcrypt 사용 (saltRounds: 12)
- 회원가입 시 자동 해싱
- 비밀번호 검증: 영문 대소문자 + 숫자 포함 8자 이상

#### 3.3 DTO 검증
- class-validator 사용
- 이메일 형식 검증
- 비밀번호 복잡도 검증
- 최대/최소 길이 제한

#### 3.4 데코레이터
- `@CurrentUser()`: 현재 로그인 사용자 정보 주입
- `@Roles('ADMIN')`: 역할 기반 접근 제어
- `@Public()`: 인증 우회 (회원가입, 로그인 등)

#### 3.5 Guards
- `JwtAuthGuard`: JWT 토큰 검증
- `RolesGuard`: 역할 기반 권한 검증
- `@Public()` 데코레이터 적용 시 인증 우회

### 4. 환경 변수 (.env)

```bash
# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d
```

### 5. 사용 예시

#### 회원가입
```typescript
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "홍길동",
  "phone": "010-1234-5678"
}
```

#### 로그인
```typescript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "Password123!"
}

// Response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "홍길동",
    "role": "CUSTOMER"
  }
}
```

#### 인증이 필요한 엔드포인트
```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
async getProfile(@CurrentUser() user: any) {
  return user;
}
```

#### 역할 기반 접근 제어
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get('admin-only')
async adminOnly() {
  return 'Admin only content';
}
```

### 6. 다음 단계

- [ ] 사용자 모듈 구현 (프로필 수정, 비밀번호 변경)
- [ ] 이메일 인증 기능
- [ ] 소셜 로그인 (카카오)
- [ ] 비밀번호 찾기/재설정

## 참고

- TECH_SPEC.md 5.1 인증 API 섹션
- Prisma Schema: User 모델 (Role enum: CUSTOMER, ADMIN)
- CLAUDE.md 보안 규칙 준수
