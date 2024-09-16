import {
  ExecutionContext,
  UnprocessableEntityException,
  createParamDecorator,
} from '@nestjs/common';

import { Request } from 'express';
import mongoose from 'mongoose';

export const ObjectId = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    const id = req.params[key];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid ObjectId');
    }

    return id;
  },
);
