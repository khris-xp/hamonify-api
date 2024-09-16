import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/modules/users/schemas';

import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

export const CurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.user;

    if (data) {
      return user && user[data];
    }

    return user;
  },
);
