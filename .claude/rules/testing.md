# Testing Rules

## 테스트 종류

| 종류 | 대상 | 도구 |
|------|------|------|
| Unit | Service, Utils | Jest |
| Integration | API Endpoints | Supertest |
| E2E | User Flows | Playwright |

## 파일 네이밍

```
<name>.spec.ts       # Unit test
<name>.e2e-spec.ts   # E2E test
```

## 커버리지 목표

- Unit: 80% 이상
- Integration: 70% 이상
- Critical paths: 100%

## 테스트 구조

```typescript
describe('UserService', () => {
  describe('findById', () => {
    it('should return user when exists', async () => {
      // Arrange
      const userId = 'test-uuid';
      
      // Act
      const result = await service.findById(userId);
      
      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(userId);
    });

    it('should throw NotFoundException when not exists', async () => {
      // ...
    });
  });
});
```

## Mocking

```typescript
// Repository mock
const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

// Service mock
const mockService = {
  findById: jest.fn().mockResolvedValue(mockUser),
};
```

## 실행 명령어

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## CI/CD

- PR 머지 전 테스트 필수 통과
- main 브랜치 커버리지 체크
