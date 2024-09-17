import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser, ObjectId } from 'src/common/decorators';
import { JwtAccessGuard } from 'src/common/guards';
import { EmotionsService } from './emotions.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

	@Post()
	@ApiOperation({ summary: 'Create Emotion' })
	@ApiOkResponse({ description: 'Create Emotion successfully' })
	@ApiBearerAuth()
	@UseGuards(JwtAccessGuard)
	create(@CurrentUser('_id') userId: string, @Body() createEmotionDto: CreateEmotionDto) {
		createEmotionDto.createdBy = userId;
		return this.emotionsService.createEmotion(createEmotionDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get Emotions' })
	@ApiOkResponse({ description: 'Get Emotions successfully' })
	@ApiBearerAuth()
	@UseGuards(JwtAccessGuard)
	findAll(@CurrentUser('_id') userId: string) {
		return this.emotionsService.findAll(userId);
	}

	@Get(":date?")
	@ApiOperation({ summary: 'Get Emotions' })
	@ApiOkResponse({ description: 'Get Emotions successfully' })
	@ApiBearerAuth()
	@UseGuards(JwtAccessGuard)
	findAllByDate(@CurrentUser('_id') userId: string, @Param('date') date?: string, ) {
		return this.emotionsService.findAll(userId, new Date(date));
	}

  
	@Get("average/:date")
	@ApiOperation({ summary: 'Get Average Emotions' })
	@ApiOkResponse({ description: 'Get Average Emotions successfully' })
	@ApiBearerAuth()
	@UseGuards(JwtAccessGuard)
	averageEmotion(@Param('date') date: string, @CurrentUser('_id') userId: string) {
		return this.emotionsService.calculateAverageEmotionByDate(userId, new Date(date));
	}


	
	@Get('playlist/:date')
	async get_playlist(@CurrentUser('_id') userId: string, @Param('date') date: string){
		const emotion = await this.emotionsService.calculateAverageEmotionByDate(userId, new Date(date));
		const data = await this.emotionsService.getPlaylistByEmotion(emotion.emotion);
		return (data);
	}
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEmotionDto: UpdateEmotionDto) {
	  return this.emotionsService.update(id, updateEmotionDto);
	}
  
	@Delete(':id')
	delete(@Param('id') id: string) {
	  return this.emotionsService.delete(id);
	}
}
