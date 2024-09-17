import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

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

	@Prop({required: true})
	createdBy: string;
}

export const EmotionsSchema = SchemaFactory.createForClass(Emotion);