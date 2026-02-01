import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ScreenDto {
  @ApiProperty({ description: '화면 ID', example: 'SCR-001' })
  @IsString()
  screenId: string;

  @ApiProperty({ description: '화면명', example: '로그인' })
  @IsString()
  screenName: string;

  @ApiProperty({
    description: 'Figma 화면 URL',
    example: 'https://figma.com/file/xxx/screen-001',
  })
  @IsUrl()
  figmaUrl: string;
}

export class SaveDesignsDto {
  @ApiProperty({
    description: 'Figma 파일 URL',
    example: 'https://figma.com/file/xxx',
  })
  @IsUrl()
  figmaFileUrl: string;

  @ApiProperty({ description: '화면 목록', type: [ScreenDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenDto)
  screens: ScreenDto[];
}
