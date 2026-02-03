import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PortfolioDisplay } from '@prisma/client';

export class PortfolioImageDto {
  @ApiProperty({ description: '이미지 ID' })
  id: string;

  @ApiProperty({ description: '이미지 URL' })
  imageUrl: string;

  @ApiProperty({ description: '표시 순서' })
  displayOrder: number;

  @ApiProperty({ description: '생성 시각' })
  createdAt: Date;
}

export class PortfolioResponseDto {
  @ApiProperty({ description: '포트폴리오 ID' })
  id: string;

  @ApiProperty({ description: '프로젝트 ID' })
  projectId: string;

  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: 'URL slug' })
  slug: string;

  @ApiPropertyOptional({ description: '설명' })
  description?: string;

  @ApiPropertyOptional({ description: '썸네일 URL' })
  thumbnailUrl?: string;

  @ApiProperty({ description: '공개 유형', enum: PortfolioDisplay })
  displayType: PortfolioDisplay;

  @ApiProperty({ description: '공개 여부' })
  isPublic: boolean;

  @ApiPropertyOptional({ description: '이미지 목록', type: [PortfolioImageDto] })
  images?: PortfolioImageDto[];

  @ApiProperty({ description: '생성 시각' })
  createdAt: Date;

  @ApiProperty({ description: '수정 시각' })
  updatedAt: Date;
}

export class PortfolioListResponseDto {
  @ApiProperty({ description: '포트폴리오 목록', type: [PortfolioResponseDto] })
  data: PortfolioResponseDto[];

  @ApiProperty({
    description: '메타데이터',
    example: { total: 100, page: 1, limit: 20 },
  })
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
