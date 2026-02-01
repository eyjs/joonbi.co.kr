import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: '메시지 내용',
    example: '안녕하세요. 프로젝트 진행 관련 문의드립니다.',
  })
  @IsNotEmpty({ message: '메시지 내용을 입력해주세요' })
  @IsString()
  @MaxLength(5000, { message: '메시지는 5000자를 초과할 수 없습니다' })
  content: string;
}
