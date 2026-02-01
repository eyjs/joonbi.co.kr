# API Design Rules

## RESTful Conventions

| 동작 | HTTP Method | 경로 예시 |
|------|-------------|----------|
| 목록 조회 | GET | `/users` |
| 단건 조회 | GET | `/users/:id` |
| 생성 | POST | `/users` |
| 전체 수정 | PUT | `/users/:id` |
| 부분 수정 | PATCH | `/users/:id` |
| 삭제 | DELETE | `/users/:id` |

## Response Format

```typescript
// 성공
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}

// 실패
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "사용자를 찾을 수 없습니다."
  }
}
```

## HTTP Status Codes

| 코드 | 용도 |
|------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 204 | 삭제 성공 (No Content) |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 리소스 없음 |
| 409 | 충돌 (중복 등) |
| 422 | 유효성 검증 실패 |
| 500 | 서버 오류 |

## Pagination

쿼리 파라미터: `?page=1&limit=20&sort=createdAt&order=desc`

## Versioning

URL 경로 방식: `/api/v1/users`

## Swagger

모든 엔드포인트에 Swagger 데코레이터 필수:
- @ApiTags()
- @ApiOperation()
- @ApiResponse()
- @ApiBearerAuth() (인증 필요 시)
