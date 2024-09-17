import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { GLOBAL_CONFIG } from 'src/shared/constants/global-config';
import { IJwtPayload } from 'src/shared/interfaces';
import { compareBcrypt } from 'src/shared/utils';
import { UsersService } from '../users/users.service';

import {
  AuthResponse,
  CredentialsResponse,
  LoginDto,
  RegisterDto,
} from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existsEmail = await this.usersService.findUserByEmail(
      registerDto.email,
    );

    if (existsEmail) {
      throw new ConflictException('Email already exists');
    }

    const existsUserName = await this.usersService.findUserByUsername(
      registerDto.username,
    );

    if (existsUserName) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.usersService.createUser(registerDto);
    const credentials = await this.generateTokens(user._id.toString());

    return {
      credentials,
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const existsUser = await this.usersService.findUserByEmail(loginDto.email);

    if (!existsUser) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compareBcrypt(
      loginDto.password,
      existsUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const credentials = await this.generateTokens(existsUser._id.toString());

    return {
      credentials,
      user: existsUser,
    };
  }

  async generateTokens(userId: string): Promise<CredentialsResponse> {
    const payload: IJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.resetRefreshToken(userId);
  }

  private async generateAccessToken(payload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(GLOBAL_CONFIG.JWT_ACCESS_SECRET),
      expiresIn: this.configService.get<string>(
        GLOBAL_CONFIG.JWT_ACCESS_EXPIRATION,
      ),
    });
  }

  private async generateRefreshToken(payload: IJwtPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(GLOBAL_CONFIG.JWT_REFRESH_SECRET),
      expiresIn: this.configService.get<string>(
        GLOBAL_CONFIG.JWT_REFRESH_EXPIRATION,
      ),
    });

    await this.usersService.setCurrentRefreshToken(token, payload.sub);

    return token;
  }
}
