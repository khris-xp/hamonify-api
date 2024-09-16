import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';
import { Emotion, EmotionDocument } from './schema/emotions.schema'
import { EmotionRepository } from './emotions.repository'
import axios from 'axios';
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
  }


  update(id: string, updateEmotionDto: UpdateEmotionDto) {
	return (this.emotionRepository.findByIdAndUpdate(id, updateEmotionDto));
  }

  delete(id: string) {
	return (this.emotionRepository.findByIdAndDelete(id));
  }

  get_playlist(){
		require('dotenv').config();
		const axios = require('axios');
		const qs = require('qs'); // For encoding data as x-www-form-urlencoded
		const clientId = process.env.SPOTIFY_UID;
		const clientSecret = process.env.SPOTIFY_SECRET;
		const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

		axios.post('https://accounts.spotify.com/api/token', 
		qs.stringify({ grant_type: 'client_credentials' }), // data to be sent
		{ 
			headers: {
			'Authorization': `Basic ${auth}`,
			'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		)
		.then(response => {
		console.log('Access Token:', response.data.access_token);
			// do something else
		})
		.catch(error => {
		console.error('Error:', error.response ? error.response.data : error.message);
		});
  }
}
