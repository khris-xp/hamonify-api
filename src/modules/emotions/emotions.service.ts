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

	emotion_score_map = {
		"sad":		-1,
		"anxious":	-0.5,
		"normal":	0,
		"calm":		0.5,
		"happy":	1,
	}

	score_emotion_map = {
		"-1": 	"sad",
		"-0.5":	"anxious",
		"0": 	"normal",
		"0.5":	"calm",
		"1":	"happy"
	}

	scores = [-1, -0.5, 0, 0.5, 1];

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

  async calculateAverageEmotionToday(userId: string){
	const emotions = await this.getTodayEmotion(userId);
	let score = 0;
	console.log("int score: ", score)
	if (emotions.length == 0)
		return {
			"message": "You have no logging emotion yet.",
			"emotion": null
		}
	emotions.forEach(emotion => {
		score += this.emotion_score_map[emotion.name]
	});
	score /= emotions.length;
	let closest = this.scores[0];
    
    for (let i = 1; i < this.scores.length; i++) {
        if (Math.abs(score - this.scores[i]) < Math.abs(score - closest)) {
            closest = this.scores[i];
        }
    }
	const emotion = await this.score_emotion_map[closest.toString()];
    return {
		"message": "Calculate Average Emotion Success",
		"emotion": emotion
	}

  }


  update(id: string, updateEmotionDto: UpdateEmotionDto) {
	return (this.emotionRepository.findByIdAndUpdate(id, updateEmotionDto));
  }

  delete(id: string) {
	return (this.emotionRepository.findByIdAndDelete(id));
  }

  async getPlaylistByEmotion(emotion: string): Promise<any> {
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
		const api_response = await axios.get(`https://api.spotify.com/v1/search?q=${emotion}%20mood&type=playlist`, {
			headers: {
			  'Authorization': `Bearer ${token.data.access_token}`
		}});
		return (api_response.data);
  }
}
