# /gen-module - NestJS 모듈 생성

새로운 NestJS 모듈을 생성합니다.

## 사용법

```
/gen-module <module-name>
```

## 생성되는 파일 구조

```
backend/src/modules/<module-name>/
├── dto/
│   ├── create-<module>.dto.ts
│   └── update-<module>.dto.ts
├── entities/
│   └── <module>.entity.ts
├── <module>.controller.ts
├── <module>.service.ts
└── <module>.module.ts
```

## 체크리스트

1. [ ] Entity 정의 (컬럼, 관계)
2. [ ] DTO 정의 (class-validator)
3. [ ] Service CRUD 메서드
4. [ ] Controller 라우트
5. [ ] Module에 imports/providers 등록
6. [ ] AppModule에 import 추가
7. [ ] Swagger 데코레이터 추가

## 예시

```bash
# users 모듈 생성
cd backend
nest g module modules/users
nest g controller modules/users
nest g service modules/users
```
