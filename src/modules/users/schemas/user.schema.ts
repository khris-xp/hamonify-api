import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { AVATAR_IMAGE } from 'src/shared/constants/global-config';
import { UserRole } from 'src/shared/enums/user-role';
import { BaseSchema } from 'src/shared/schemas';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends BaseSchema {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ default: AVATAR_IMAGE })
  avatar: string;

  @Prop({ default: UserRole.USER })
  role: UserRole;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
