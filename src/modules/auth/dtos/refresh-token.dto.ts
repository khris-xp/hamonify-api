import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'refreshToken',
    description: 'Refresh token of the user',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
