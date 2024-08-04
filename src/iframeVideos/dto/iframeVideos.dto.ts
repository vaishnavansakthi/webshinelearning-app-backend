import { ApiProperty } from '@nestjs/swagger';

export class IframeVideosDto {
  @ApiProperty({
    required: true,
    example: 'https://www.youtube.com/embed/video_id',
  })
  url: string;

  @ApiProperty({
    required: true,
    example: 'Sample Video Title',
  })
  title: string;

  @ApiProperty({
    required: true,
    example: 'Sample Video Description',
  })
  description: string;

  @ApiProperty({
    required: true,
    example: 'Sample Video Tags',
  })
  tags: string;

  @ApiProperty({
    required: true,
    example: 'Sample Video Category',
  })
  category: string;

  @ApiProperty({
    example: 'Publised Date',
  })
  createdAt: Date;
}
