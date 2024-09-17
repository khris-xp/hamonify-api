import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'password',
] as const) {
  @ApiProperty({
    example: 'username',
  })
  username?: string;

  @ApiProperty({
    example: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'fullname',
  })
  fullname: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;
}
