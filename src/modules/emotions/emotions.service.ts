import { Injectable } from '@nestjs/common';
import {EmotionsRepository} from './emotions.repository'
import {} from './schemas/emotion.schema'
@Injectable()
export class EmotionsService {
	private readonly emotions_score_map = {
		"Happy": 1,
		"Excited": 0.5,
		"Guilty": -0.5,
		"Sad": -1
	}
	private readonly emotions = [
		{id: 1, name: "Happy", score: 0.5},
		{id: 2, name: "Sad", score: -0.5}
	]
	constructor(private readonly emotionsRepository: EmotionsRepository) {}

	findAll(){
		return this.emotions;
	}

	createEmotion(){
		
	}

	addEmotion(emotion: any){
		this.emotions.push(emotion);

		// get emotion of the day

		// sum the score

		// map the score to avrage emotion

		// map average emotion into catalogory

		// 
		return (emotion);
	}

	getPlaylistbyPlaylistID(id: string){

	}

}
