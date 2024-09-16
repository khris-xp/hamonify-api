import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
