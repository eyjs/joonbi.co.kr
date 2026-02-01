# Coding Style Rules

## General

- TypeScript strict mode 사용
- No `any` type - 명시적 타입 정의
- No console.log in production code
- 모든 함수에 return type 명시
- async 함수는 Promise 타입 명시

## Naming Conventions

| 종류 | 규칙 | 예시 |
|------|------|------|
| 클래스 | PascalCase | `UserService` |
| 인터페이스 | PascalCase | `CreateUserDto` |
| 함수/메서드 | camelCase | `findById()` |
| 변수 | camelCase | `userName` |
| 상수 | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| 파일 | kebab-case | `user-service.ts` |
| 폴더 | kebab-case | `user-profile/` |

## Backend (NestJS)

- Controller: HTTP 요청/응답만 처리
- Service: 비즈니스 로직
- Repository: 데이터 접근 (TypeORM)
- DTO: 입출력 데이터 검증
- Entity: 데이터베이스 스키마

## Frontend (Next.js)

- Server Components 기본 사용
- 'use client' 최소화
- Tailwind CSS 클래스 순서: layout > sizing > spacing > visual
- 컴포넌트당 파일 하나

## Comments

- 코드 주석은 "왜"를 설명 (what이 아님)
- JSDoc 형식 사용
- TODO, FIXME 주석에 담당자/날짜 포함

```typescript
// Bad
// 사용자 찾기
const user = await findUser(id);

// Good
// 캐시된 사용자 정보를 우선 조회하여 DB 부하 감소
const user = await findCachedUser(id);
```
