import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponse {
  @ApiProperty({
    type: String,
    description: 'Message',
    example: 'Successfully logged out',
  })
  message: string;
}
