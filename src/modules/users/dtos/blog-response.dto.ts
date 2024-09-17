import { ApiProperty } from '@nestjs/swagger';

export class BlogResponse {
  @ApiProperty({
    example: 'title',
  })
  title: string;

  @ApiProperty({
    example: 'content',
  })
  content: string;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail: string;

  @ApiProperty({
    example: 'category',
  })
  category: string;

  @ApiProperty({
    example: 'createdBy',
  })
  createdBy: string;
}
