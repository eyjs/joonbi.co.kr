# Security Rules

## 인증 (Authentication)

- JWT 기반 인증
- Access Token: 1시간
- Refresh Token: 7일
- 비밀번호: bcrypt 해싱 (saltRounds: 12)

## 인가 (Authorization)

- Role-based Access Control (RBAC)
- Guards로 권한 체크
- 리소스 소유권 검증 필수

## 입력 검증

- class-validator로 모든 DTO 검증
- SQL Injection 방지: TypeORM parameterized queries
- XSS 방지: 출력 시 이스케이프

```typescript
// DTO 예시
export class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  password: string;
}
```

## 민감 데이터

- 환경변수로 관리 (.env)
- 절대 하드코딩 금지
- 로그에 민감 정보 출력 금지

## CORS

```typescript
// 개발 환경
origin: ['http://localhost:3000']

// 프로덕션
origin: ['https://yourdomain.com']
```

## Rate Limiting

- 로그인: 5회/분
- API: 100회/분
- 파일 업로드: 10회/분

## 파일 업로드

- 확장자 화이트리스트
- 파일 크기 제한
- 바이러스 스캔 (선택)
