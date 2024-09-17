import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return this.entityModel
      .findOne(filterQuery, projection, options)
      .lean<T>()
      .exec();
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return this.entityModel
      .find(filterQuery, projection, options)
      .lean<T[]>()
      .exec();
  }

  async findById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return this.entityModel.findById(id, projection, options).lean<T>().exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    return this.entityModel.create(createEntityData);
  }

  async createMany(data: unknown[]): Promise<T[]> {
    return this.entityModel.insertMany(data);
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel
      .deleteMany(filterQuery)
      .lean()
      .exec();

    return deleteResult.deletedCount >= 1;
  }

  async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<Partial<T>>,
    options: QueryOptions<T> = { new: true },
  ): Promise<T> {
    return this.entityModel
      .findByIdAndUpdate(id, updateQuery, options)
      .lean<T>()
      .exec();
  }

  async findByIdAndDelete(id: string, options?: QueryOptions<T>): Promise<T> {
    return this.entityModel.findByIdAndDelete(id, options).lean<T>().exec();
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<Partial<T>>,
    options: QueryOptions<T> = { new: true },
  ): Promise<T> {
    return this.entityModel
      .findOneAndUpdate(filterQuery, updateQuery, options)
      .lean<T>()
      .exec();
  }

  async countDocuments(filterQuery: FilterQuery<T>): Promise<number> {
    return this.entityModel.countDocuments(filterQuery).lean().exec();
  }
}
