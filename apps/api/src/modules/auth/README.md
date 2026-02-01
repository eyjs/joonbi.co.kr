# Auth Module

JWT 기반 인증 모듈

## 기능

- 회원가입 (이메일/비밀번호)
- 로그인
- 토큰 갱신 (Refresh Token)
- 내 정보 조회
- 로그아웃
- JWT 인증 가드
- 역할 기반 권한 가드

## 구조

```
auth/
├── auth.module.ts              # 모듈 설정
├── auth.controller.ts          # 컨트롤러
├── auth.service.ts             # 비즈니스 로직
├── dto/                        # 데이터 전송 객체
├── strategies/                 # Passport 전략
├── guards/                     # 가드
└── decorators/                 # 커스텀 데코레이터
```

## 설치 및 설정

### 1. 환경 변수 설정

`.env` 파일에 다음 환경 변수를 추가하세요:

```bash
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-this-in-production
```

### 2. 모듈 임포트

`app.module.ts`에 AuthModule을 추가:

```typescript
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // ...
    AuthModule,
  ],
})
export class AppModule {}
```

## 사용법

### 인증이 필요한 라우트

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, CurrentUser } from '../auth';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
```

### 역할 기반 접근 제어

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard, Roles } from '../auth';

@Controller('admin')
export class AdminController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('dashboard')
  getDashboard() {
    return 'Admin dashboard';
  }
}
```

### Public 라우트 (인증 우회)

```typescript
import { Public } from '../auth';

@Controller('public')
export class PublicController {
  @Public()
  @Get('info')
  getInfo() {
    return 'Public information';
  }
}
```

## API 엔드포인트

### POST /api/auth/register
회원가입

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "홍길동",
  "phone": "010-1234-5678"
}
```

**Response:**
```json
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

### POST /api/auth/login
로그인

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response:** 회원가입과 동일

### POST /api/auth/refresh
토큰 갱신

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** 회원가입과 동일

### GET /api/auth/me
내 정보 조회 (인증 필요)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "홍길동",
  "role": "CUSTOMER"
}
```

### POST /api/auth/logout
로그아웃

**Response:**
```json
{
  "message": "로그아웃되었습니다."
}
```

## 보안

### 비밀번호 정책
- 최소 8자 이상
- 영문 대소문자 포함
- 숫자 포함
- bcrypt 해싱 (saltRounds: 12)

### JWT 토큰
- Access Token: 7일 유효
- Refresh Token: 30일 유효
- 각각 다른 secret key 사용

### 검증
- class-validator를 사용한 DTO 검증
- 이메일 형식 검증
- 최대/최소 길이 제한

## 데코레이터

### @CurrentUser()
현재 로그인한 사용자 정보를 주입합니다.

```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: any) {
  console.log(user.id, user.email, user.role);
}
```

### @Roles(...roles)
특정 역할만 접근 가능하도록 제한합니다.

```typescript
@Roles('ADMIN', 'MANAGER')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('admin-only')
adminOnly() {
  // ADMIN 또는 MANAGER만 접근 가능
}
```

### @Public()
인증을 우회합니다.

```typescript
@Public()
@Get('open')
publicRoute() {
  // 인증 없이 접근 가능
}
```

## 테스트

```bash
# Unit tests
npm run test auth

# E2E tests
npm run test:e2e auth
```

## 참고

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport JWT](http://www.passportjs.org/packages/passport-jwt/)
- [class-validator](https://github.com/typestack/class-validator)
