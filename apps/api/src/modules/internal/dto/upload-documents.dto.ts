import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum DocumentType {
  ANALYSIS = 'analysis',
  REQUIREMENTS = 'requirements',
  PLAN = 'plan',
  QUOTATION = 'quotation',
}

export class DocumentDto {
  @ApiProperty({
    enum: DocumentType,
    description: '문서 타입',
    example: 'analysis',
  })
  @IsEnum(DocumentType)
  type: DocumentType;

  @ApiProperty({
    description: '문서 내용 (Markdown)',
    example: '# 업무분석서\n\n...',
  })
  @IsString()
  content: string;
}

export class UploadDocumentsDto {
  @ApiProperty({ description: '문서 목록', type: [DocumentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];
}
