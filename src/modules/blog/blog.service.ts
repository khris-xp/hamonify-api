import { Injectable } from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './dtos';

import { BlogDocument } from './schemas';

import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getAllBlogs(): Promise<BlogDocument[]> {
    return this.blogRepository.findAll();
  }

  async getBlogById(blogId: string): Promise<BlogDocument | null> {
    return this.blogRepository.findById(blogId);
  }

  async getBlogBySlug(slug: string): Promise<BlogDocument | null> {
    return this.blogRepository.findOne({ slug });
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<BlogDocument> {
    return this.blogRepository.create(createBlogDto);
  }

  async updateBlog(
    blogId: string,
    updateQuery: UpdateBlogDto,
  ): Promise<BlogDocument> {
    return this.blogRepository.findByIdAndUpdate(blogId, updateQuery, {
      new: true,
    });
  }

  async deleteBlog(blogId: string): Promise<BlogDocument> {
    return this.blogRepository.findByIdAndDelete(blogId);
  }
}
