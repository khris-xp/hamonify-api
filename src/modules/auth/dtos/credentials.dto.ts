import { ApiProperty } from '@nestjs/swagger';

export class CredentialsResponse {
  @ApiProperty({
    type: String,
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQxNGYzNzY0YmRkZjNiYWFlZWRhZWEiLCJpYXQiOjE3MTU1NjkzNzgsImV4cCI6MTcxNTU3MDI3OH0.WdIGKCObSsqbYlOWXayTO-HngbWSLrw7NXRVQ_wNekg',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQxNGYzNzY0YmRkZjNiYWFlZWRhZWEiLCJpYXQiOjE3MTU1NjkzNzgsImV4cCI6MTcxNTU3MDI3OH0.WdIGKCObSsqbYlOWXayTO-HngbWSLrw7NXRVQ_wNekg',
  })
  refreshToken: string;
}
