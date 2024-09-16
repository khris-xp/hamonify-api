import { Module } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { EmotionsController } from './emotions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Emotion, EmotionsSchema} from './schema/emotions.schema'
import { EmotionRepository } from './emotions.repository';
@Module({
	imports: [MongooseModule.forFeature([{ name: Emotion.name, schema: EmotionsSchema}])],
	controllers: [EmotionsController],
	providers: [EmotionsService, EmotionRepository],
	exports: [EmotionsService],
})
export class EmotionsModule {}
