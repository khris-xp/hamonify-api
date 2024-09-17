import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { User } from 'src/modules/users/schemas';
import { BaseSchema } from 'src/shared/schemas';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type EmotionDocument = Emotion & Document

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Emotion{
	@Prop({required: true})
	name: string;

	@Prop({required: true})
	score: number;

	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: User.name,
		required: true,
	  })
	createdBy: string;

	@Prop({
		required: true
	})
	period: Date
}

export const EmotionsSchema = SchemaFactory.createForClass(Emotion);