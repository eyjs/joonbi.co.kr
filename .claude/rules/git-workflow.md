# Git Workflow Rules

## Branch Strategy

```
main (production)
  └── develop (staging)
       ├── feature/xxx
       ├── fix/xxx
       └── refactor/xxx
```

## Branch Naming

| 타입 | 형식 | 예시 |
|------|------|------|
| 기능 | `feature/<name>` | `feature/user-auth` |
| 버그 | `fix/<name>` | `fix/login-error` |
| 리팩토링 | `refactor/<name>` | `refactor/user-service` |
| 핫픽스 | `hotfix/<name>` | `hotfix/payment-bug` |

## Commit Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | 설명 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 포맷팅 |
| `refactor` | 리팩토링 |
| `test` | 테스트 |
| `chore` | 빌드, 설정 변경 |

### Examples

```bash
feat(auth): 로그인 기능 추가

- JWT 토큰 발급
- Refresh Token 구현
- 비밀번호 암호화

Closes #123
```

## Pull Request

1. PR 템플릿 사용
2. 리뷰어 지정 필수
3. CI 통과 후 머지
4. Squash merge 사용

## 금지 사항

- main 직접 커밋 금지
- force push 금지 (main, develop)
- 대용량 파일 커밋 금지 (>10MB)
