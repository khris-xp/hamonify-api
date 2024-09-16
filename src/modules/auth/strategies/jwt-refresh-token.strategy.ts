import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from 'src/modules/users/users.service';
import { GLOBAL_CONFIG } from 'src/shared/constants/global-config';
import { IJwtPayload } from 'src/shared/interfaces';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: configService.get<string>(GLOBAL_CONFIG.JWT_REFRESH_SECRET),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: IJwtPayload) {
    const refreshToken = request.body?.refreshToken;
    const user = await this.usersService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.sub,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
