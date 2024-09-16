import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser, ObjectId } from 'src/common/decorators';
import { JwtAccessGuard } from 'src/common/guards';

import { CreateBlogDto, UpdateBlogDto } from '../users/dtos';
import { BlogResponse } from '../users/dtos/blog-response.dto';
import { BlogService } from './blog.service';
import { BlogDocument } from './schemas';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({
    summary: 'Create blog',
  })
  @ApiOkResponse({
    description: 'Create blog successfully',
    type: BlogResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  createBlog(
    @CurrentUser('_id') userId: string,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<BlogDocument> {
    createBlogDto.createdBy = userId;
    return this.blogService.createBlog(createBlogDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all blogs',
  })
  @ApiOkResponse({
    description: 'Get all blogs successfully',
    type: [BlogResponse],
  })
  getAllBlogs(): Promise<BlogDocument[]> {
    return this.blogService.getAllBlogs();
  }
  @Get(':blogId')
  @ApiOperation({
    summary: 'Get blog by id',
  })
  @ApiParam({
    name: 'blogId',
    type: String,
    description: 'Blog id',
  })
  @ApiOkResponse({
    description: 'Get blog by id successfully',
    type: BlogResponse,
  })
  getBlogById(@ObjectId() blogId: string): Promise<BlogDocument> {
    return this.blogService.getBlogById(blogId);
  }

  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Get blog by slug',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
  })
  @ApiOkResponse({
    description: 'Get blog by slug successfully',
    type: BlogResponse,
  })
  getBlogBySlug(@ObjectId() slug: string): Promise<BlogDocument> {
    return this.blogService.getBlogBySlug(slug);
  }

  @Patch(':blogId')
  @ApiOperation({
    summary: 'Update blog by id',
  })
  @ApiParam({
    name: 'blogId',
    type: String,
    description: 'Blog id',
  })
  @ApiOkResponse({
    description: 'Update blog by id successfully',
    type: BlogResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  updateBlog(
    @ObjectId() blogId: string,
    @CurrentUser('_id') userId: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<BlogDocument> {
    updateBlogDto.createdBy = userId;
    return this.blogService.updateBlog(blogId, updateBlogDto);
  }
}
