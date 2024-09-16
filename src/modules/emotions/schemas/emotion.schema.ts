import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas';

export type EmotionDocument = HydratedDocument<Emotion>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Emotion extends BaseSchema {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  score: number;
}

export const EmotionSchema = SchemaFactory.createForClass(Emotion);