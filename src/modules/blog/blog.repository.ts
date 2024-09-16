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

import { Blog, BlogDocument } from './schemas';

@Injectable()
export class BlogRepository extends EntityRepository<BlogDocument> {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {
    super(blogModel);
  }

  public async findAll(
    filterQuery?: FilterQuery<BlogDocument>,
    projection?: ProjectionType<BlogDocument>,
    options?: QueryOptions<BlogDocument>,
  ): Promise<BlogDocument[]> {
    return this.blogModel
      .find(filterQuery, projection, options)
      .populate('createdBy')
      .lean()
      .exec();
  }

  public async findOne(
    filterQuery: FilterQuery<BlogDocument>,
    projection?: ProjectionType<BlogDocument>,
    options?: QueryOptions<BlogDocument>,
  ): Promise<BlogDocument> {
    return this.blogModel
      .findOne(filterQuery, projection, options)
      .lean<BlogDocument>()
      .exec();
  }

  public async findById(id: string): Promise<BlogDocument> {
    return this.blogModel.findById(id).lean<BlogDocument>().exec();
  }

  public async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<BlogDocument>,
    options?: QueryOptions<BlogDocument>,
  ): Promise<BlogDocument> {
    return this.blogModel
      .findByIdAndUpdate(id, updateQuery, options)
      .lean<BlogDocument>()
      .exec();
  }
}
