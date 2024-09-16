import { ApiProperty } from '@nestjs/swagger';

export class UserLimitedResponse {
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '66414f3764bddf3baaeedaea',
  })
  _id: string;

  @ApiProperty({
    type: String,
    description: 'Username of the user',
    example: 'khris-xp',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Avatar URL of the user',
    example: 'https://avatars.githubusercontent.com/u/56169832?v=4',
  })
  avatar: string;
}
