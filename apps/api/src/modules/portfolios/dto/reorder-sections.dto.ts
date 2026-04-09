import { IsArray, ValidateNested, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SectionOrderItem {
  @ApiProperty({ description: '섹션 ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: '새 표시 순서', example: 0 })
  @IsInt()
  @Min(0)
  displayOrder: number;
}

export class ReorderSectionsDto {
  @ApiProperty({ description: '섹션 순서 목록', type: [SectionOrderItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionOrderItem)
  sections: SectionOrderItem[];
}
