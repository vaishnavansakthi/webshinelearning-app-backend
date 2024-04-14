import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SessionDto {
  @ApiProperty({
    required: true,
    example: 'Sessionn topic',
  })
  @IsString()
  topic: string;

  @ApiProperty({
    required: true,
    example: 'Prerequisite',
  })
  @IsString()
  prerequisite: string;

  @ApiProperty({
    required: true,
    example: 'Session timing',
  })
  @IsString()
  sessionTiming: string;

  @ApiProperty({
    required: true,
    example: 'Meet link',
  })
  @IsString()
  meetLink: string;
}
