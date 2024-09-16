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

import { User, UserDocument } from './schemas';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  public async findOne(
    filterQuery: FilterQuery<UserDocument>,
    projection?: ProjectionType<UserDocument>,
    options?: QueryOptions<UserDocument>,
  ): Promise<UserDocument> {
    return this.userModel
      .findOne(filterQuery, projection, options)
      .lean<UserDocument>()
      .exec();
  }

  public async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).lean<UserDocument>().exec();
  }

  public async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<UserDocument>,
    options?: QueryOptions<UserDocument>,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateQuery, options)
      .lean<UserDocument>()
      .exec();
  }
}
