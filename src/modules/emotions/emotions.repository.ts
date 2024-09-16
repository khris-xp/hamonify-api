import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

import { EntityRepository } from 'src/shared/repositories';

import { Emotion, EmotionDocument } from './schemas';

@Injectable()
export class EmotionsRepository extends EntityRepository<EmotionDocument> {
  constructor(
    @InjectModel(Emotion.name) private readonly emotionModel: Model<EmotionDocument>,
  ) {
    super(emotionModel);
  }

  public async findOne(
    filterQuery: FilterQuery<EmotionDocument>,
    projection?: ProjectionType<EmotionDocument>,
    options?: QueryOptions<EmotionDocument>,
  ): Promise<EmotionDocument> {
    return this.emotionModel
      .findOne(filterQuery, projection, options)
      .lean<EmotionDocument>()
      .exec();
  }

  public async findById(id: string): Promise<EmotionDocument> {
    return this.emotionModel.findById(id).lean<EmotionDocument>().exec();
  }

  public async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<EmotionDocument>,
    options?: QueryOptions<EmotionDocument>,
  ): Promise<EmotionDocument> {
    return this.emotionModel
      .findByIdAndUpdate(id, updateQuery, options)
      .lean<EmotionDocument>()
      .exec();
  }

	public async createEmotion(emotionData: Partial<Emotion>): Promise<EmotionDocument> {
		const newEmotion = new this.emotionModel(emotionData); // Create a new instance of the emotion model
		return newEmotion.save(); // Save the new emotion to the database
	}
}
