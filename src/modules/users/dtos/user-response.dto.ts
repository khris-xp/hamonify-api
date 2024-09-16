import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/shared/enums/user-role';

export class UserResponse {
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '616f7b0b1f1e183c6d7e1d2d',
  })
  _id: string;

  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'john@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Full name',
    example: 'John Doe',
  })
  fullname: string;

  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string;

  @ApiProperty({
    type: UserRole,
    enum: UserRole,
    description: `Role e.g. ${Object.values(UserRole).join(', ')}`,
    example: 'user',
  })
  role: UserRole;

  @ApiProperty({
    type: Date,
    description: 'Created at',
    example: '2021-10-19T07:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Updated at',
    example: '2021-10-19T07:00:00.000Z',
  })
  updatedAt: Date;
}
