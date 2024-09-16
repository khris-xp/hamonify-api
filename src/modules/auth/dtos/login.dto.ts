import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'khrisbharmmano@gmail.com',
    description: 'The email of the user',
    type: String,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    type: String,
    required: true,
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
