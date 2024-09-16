import { Injectable } from '@nestjs/common';

@Injectable()
export class EmotionsService {
	private readonly emotions = [
		{id: 1, name: "Happy", score: 0.5},
		{id: 2, name: "Sad", score: -0.5}
	]

	findAll(){
		return this.emotions;
	}

	addEmotion(emotion: any){
		console.log(emotion)
		this.emotions.push(emotion);
		return (emotion);

	}


}
