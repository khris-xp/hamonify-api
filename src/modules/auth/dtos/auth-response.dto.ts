import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/modules/users/dtos';
import { CredentialsResponse } from './credentials.dto';

export class AuthResponse {
  @ApiProperty({
    type: CredentialsResponse,
    description: 'Credentials',
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQxNGYzNzY0YmRkZjNiYWFlZWRhZWEiLCJpYXQiOjE3MTU1NjkzNzgsImV4cCI6MTcxNTU3MDI3OH0.WdIGKCObSsqbYlOWXayTO-HngbWSLrw7NXRVQ_wNekg',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQxNGYzNzY0YmRkZjNiYWFlZWRhZWEiLCJpYXQiOjE3MTU1NjkzNzgsImV4cCI6MTcxNTU3MDI3OH0.WdIGKCObSsqbYlOWXayTO-HngbWSLrw7NXRVQ_wNekg',
    },
  })
  credentials: CredentialsResponse;

  @ApiProperty({
    type: UserResponse,
    description: 'User',
    example: {
      _id: '66414f3764bddf3baaeedaea',
      username: 'khris-xp',
      email: 'khrisbharmmano@gmail.com',
      fullname: 'John Doe',
      avatar: 'https://avatars.githubusercontent.com/u/56169832?v=4',
      role: 'user',
      createdAt: '2024-05-12T23:22:31.634Z',
      updatedAt: '2024-05-13T00:27:07.547Z',
    },
  })
  user: UserResponse;
}
