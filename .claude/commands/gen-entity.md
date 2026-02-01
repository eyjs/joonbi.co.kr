# /gen-entity - TypeORM Entity 생성

새로운 TypeORM Entity를 생성합니다.

## 사용법

```
/gen-entity <entity-name> [fields...]
```

## Entity 템플릿

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('<table_name>')
export class EntityName {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 컬럼들...

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
```

## 필수 규칙

- PrimaryGeneratedColumn은 UUID 사용
- Audit 필드 필수: createdAt, updatedAt, deletedAt
- 관계 설정 시 onDelete 명시
- Index 필요한 컬럼에 @Index() 추가
- nullable 컬럼은 명시적으로 { nullable: true }
