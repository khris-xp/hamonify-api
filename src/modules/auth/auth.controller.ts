import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from 'src/common/decorators';
import { JwtAccessGuard, JwtRefreshGuard } from 'src/common/guards';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import {
  AuthResponse,
  CredentialsResponse,
  LogoutResponse,
  RefreshTokenDto,
  RegisterDto,
} from './dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/sign-in')
  @ApiOperation({
    summary: 'Sign in user',
  })
  @ApiOkResponse({
    description: 'Sign in successfully',
    type: AuthResponse,
  })
  async signIn(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    const userExists = await this.userService.findUserByEmail(
      registerDto.email,
    );

    if (userExists) {
      return this.authService.login({
        email: registerDto.email,
        password: registerDto.password,
      });
    }

    return this.authService.register(registerDto);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
  })
  @ApiOkResponse({
    description: 'Refresh new access token successfully',
    type: CredentialsResponse,
  })
  @ApiBody({
    type: RefreshTokenDto,
  })
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @CurrentUser('_id') userId: string,
  ): Promise<CredentialsResponse> {
    return this.authService.generateTokens(userId);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user',
  })
  @ApiOkResponse({
    description: 'Logout successfully',
    type: LogoutResponse,
  })
  @UseGuards(JwtAccessGuard)
  async logout(@CurrentUser('_id') userId: string): Promise<LogoutResponse> {
    await this.authService.logout(userId);

    return { message: 'Logout successfully' };
  }
}