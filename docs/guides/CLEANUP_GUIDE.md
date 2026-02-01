# 프로젝트 정리 가이드

## 1. 중복 폴더 삭제

```bash
# 백업 (옵션)
mkdir -p _archive
mv backend _archive/backend_$(date +%Y%m%d)
mv frontend _archive/frontend_$(date +%Y%m%d)

# 또는 바로 삭제
rm -rf backend
rm -rf frontend
```

## 2. .gitignore 업데이트

```bash
echo "_archive/" >> .gitignore
```

## 3. 최종 구조

```
joonbistudio/
├── apps/
│   ├── web/              ← Frontend (Vercel)
│   └── api/              ← Backend (Docker)
├── packages/
│   └── shared/           ← 공유 타입/유틸
├── docker-compose.yml
├── pnpm-workspace.yaml
└── turbo.json
```

## 4. Vercel 배포 설정

### GitHub 연결 후 Vercel Dashboard에서:

1. **Root Directory**: `apps/web`
2. **Framework**: Next.js
3. **Build Command**: `cd ../.. && pnpm turbo run build --filter=@joonbi/web`
4. **Install Command**: `pnpm install`
5. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://api.joonbi.co.kr`

## 5. Backend 로컬 배포

```bash
# 개발 모드
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# 프로덕션 모드
docker-compose up -d
```

## 6. 공유 타입 사용 예시

### packages/shared/package.json
```json
{
  "name": "@joonbi/shared",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
```

### packages/shared/src/index.ts
```typescript
export * from './types/consultation';
export * from './types/project';
export * from './types/payment';
```

### Backend에서 사용
```typescript
// apps/api/src/modules/consultations/dto/create-consultation.dto.ts
import { CreateConsultationDto as SharedDto } from '@joonbi/shared';

export class CreateConsultationDto implements SharedDto {
  // 추가 validation 데코레이터만 추가
  @IsEnum(ConsultationType)
  type: ConsultationType;

  @IsString()
  projectName: string;
  // ...
}
```

### Frontend에서 사용
```typescript
// apps/web/src/lib/api/consultations.ts
import { ConsultationResponse } from '@joonbi/shared';

export async function getConsultations(): Promise<ConsultationResponse[]> {
  const res = await fetch('/api/consultations');
  return res.json();
}
```

## 7. 타입 안전성 보장

Frontend에서 API 응답 타입이 자동으로 맞춰집니다:

```typescript
// ✅ 타입 안전
const consultations = await getConsultations();
console.log(consultations[0].projectName); // OK

// ❌ 타입 에러
console.log(consultations[0].wrongField); // Error!
```

## 8. 개발 워크플로우

```bash
# 루트에서 전체 개발 모드
pnpm dev

# 또는 개별 실행
pnpm --filter @joonbi/web dev      # Frontend만
pnpm --filter @joonbi/api dev      # Backend만
```

## 장점 요약

✅ **타입 안전성**: API 스펙 변경 시 Frontend도 자동 감지
✅ **코드 재사용**: 공통 유틸, Zod 스키마, 상수 공유
✅ **일관된 의존성**: pnpm workspace로 통합 관리
✅ **배포 독립성**: Frontend(Vercel), Backend(Docker) 별도 배포
✅ **빌드 최적화**: Turborepo 캐싱으로 빌드 속도 향상
