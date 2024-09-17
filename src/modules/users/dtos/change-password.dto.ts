import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'Old-password',
    description: 'current user password',
    type: String,
    required: true,
  })
  @IsStrongPassword()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'New-password',
    description: 'New user password',
    type: String,
    required: true,
  })
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;
}
