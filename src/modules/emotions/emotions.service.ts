import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';
import { Emotion, EmotionDocument } from './schema/emotions.schema'
import { EmotionRepository } from './emotions.repository'
import axios from 'axios';
import { fileURLToPath } from 'url';

@Injectable()
export class EmotionsService {
	constructor(private readonly emotionRepository: EmotionRepository) {}
  	async createEmotion(createEmotionDto: CreateEmotionDto): Promise<Emotion> {
		return (this.emotionRepository.create(createEmotionDto));

		
	}

	async findAll(userId: string): Promise<Emotion[]> {
		const emotions = await this.emotionRepository.findAll();
		let return_emotions = [];
		console.log(userId);
		emotions.forEach(emotion => {
			if (emotion.createdBy == userId){
				return_emotions.push(emotion);
			}
		});
		return (return_emotions);
  }

  async getTodayEmotion(userId: string): Promise<Emotion[]>{
	const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0); // set to 00:00:00.000 UTC

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999); // set to 23:59:59.999 UTC

    const filterQuery: FilterQuery<EmotionDocument> = {
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    };

	return (this.emotionRepository.findAll(filterQuery));	
  }


  update(id: string, updateEmotionDto: UpdateEmotionDto) {
	return (this.emotionRepository.findByIdAndUpdate(id, updateEmotionDto));
  }

  delete(id: string) {
	return (this.emotionRepository.findByIdAndDelete(id));
  }

  async get_playlist(): Promise<any> {
		require('dotenv').config();
		const axios = require('axios');
		const qs = require('qs');
		const clientId = process.env.SPOTIFY_UID;
		const clientSecret = process.env.SPOTIFY_SECRET;
		const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

		const token = await axios.post('https://accounts.spotify.com/api/token', 
		qs.stringify({ grant_type: 'client_credentials' }), { 
			headers: {
			'Authorization': `Basic ${auth}`,
			'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		const api_response = await axios.get('https://api.spotify.com/v1/browse/categories', {
			headers: {
			  'Authorization': `Bearer ${token.data.access_token}`
		}});
		return (api_response.data);
  }
}
