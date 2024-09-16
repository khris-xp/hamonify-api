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

  findAll() {
	return `This action returns all emotions`;
  }

  findOne(id: string) {
	return `This action returns a #${id} emotion`;
  }

  update(id: string, updateEmotionDto: UpdateEmotionDto) {
	return `This action updates a #${id} emotion`;
  }

  remove(id: string) {
	return `This action removes a #${id} emotion`;
  }
}
