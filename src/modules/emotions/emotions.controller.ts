import { Controller, Get, Post, Body} from '@nestjs/common';
import { EmotionsService } from './emotions.service'

@Controller('emotions')
export class EmotionsController {
	constructor(private readonly emotionsService: EmotionsService) {}
	@Get()
	getEmotions(){
		return (this.emotionsService.findAll());
	}

	@Post()
	addEmotion(@Body() emotion: any){
		return (this.emotionsService.addEmotion(emotion));
	}	


}
