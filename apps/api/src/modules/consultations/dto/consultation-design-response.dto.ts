import { ApiProperty } from '@nestjs/swagger';

export class ConsultationDesignResponseDto {
  @ApiProperty({
    description: '화면설계 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '상담 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  consultationId: string;

  @ApiProperty({
    description: '전체 Figma 파일 링크',
    example: 'https://figma.com/file/xxx/ProjectName',
  })
  figmaFileUrl: string;

  @ApiProperty({
    description: '화면별 정보',
    example: [
      {
        screenId: 'SCR-001',
        screenName: '로그인',
        figmaUrl: 'https://figma.com/file/xxx?node-id=1',
      },
      {
        screenId: 'SCR-002',
        screenName: '메인',
        figmaUrl: 'https://figma.com/file/xxx?node-id=2',
      },
    ],
  })
  screens: any;

  @ApiProperty({
    description: '생성일시',
    example: '2026-02-01T10:00:00.000Z',
  })
  createdAt: Date;

  constructor(design: any) {
    Object.assign(this, design);
  }
}
