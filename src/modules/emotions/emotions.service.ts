import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';
import { Emotion, EmotionDocument } from './schema/emotions.schema'
import { EmotionRepository } from './emotions.repository'
@Injectable()
export class EmotionsService {
	constructor(private readonly emotionRepository: EmotionRepository) {}
  	async createEmotion(createEmotionDto: CreateEmotionDto): Promise<Emotion> {
		return (this.emotionRepository.create(createEmotionDto));
	// return 'This action adds a new emotion';
	}

	async findAll(userId: string): Promise<Emotion[]> {
	const emotions = await this.emotionRepository.findAll();
	let return_emotions = [];
	console.log(userId);
	emotions.forEach(emotion => {
		if (emotion.createdBy == userId){
			return_emotions.push(emotion);
		}
	})
	console.log(return_emotions);
	return (return_emotions);
	// return `This action returns all emotions`;
  }


  update(id: string, updateEmotionDto: UpdateEmotionDto) {
	return (this.emotionRepository.findByIdAndUpdate(id, updateEmotionDto))
	// return `This action updates a #${id} emotion`;
  }

  remove(id: string) {
	return `This action removes a #${id} emotion`;
  }
}
