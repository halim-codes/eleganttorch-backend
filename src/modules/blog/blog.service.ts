import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; import { CreateBlogDto } from './dto/create-blog.dto';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './entities/blog.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';


@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<BlogDocument>,
  ) { }


  async create(
    createBlogDto: CreateBlogDto,
  ): Promise<{ statusCode: number; message: string; data: CreateBlogDto }> {
    const createdBlog = new this.blogModel(createBlogDto);
    const savedBlog = await createdBlog.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.BLOG_CREATED,
      savedBlog,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: BlogDocument[];
  }> {
    const blogs = await this.blogModel.find().exec();
    return formatResponse(
      HttpStatus.OK,
      Messages.BLOG_RETRIEVED,
      blogs,
    );
  }

   async findOne(
     id: string,
   ): Promise<{ statusCode: number; message: string; data: BlogDocument }> {
     const blog = await this.blogModel.findById(id).exec();
     if (!blog) {
       throw new NotFoundException(`${Messages.BLOG_NOT_FOUND} id: ${id}`);
     }
     return formatResponse(HttpStatus.OK, Messages.BLOG_RETRIEVED, blog);
   }

  async update(
      id: string,
      updateBlogDto: UpdateBlogDto,
    ): Promise<{ statusCode: number; message: string; data: BlogDocument }> {
      const updatedBLog = await this.blogModel
        .findByIdAndUpdate(id, updateBlogDto, { new: true })
        .exec();
      if (!updatedBLog) {
        throw new NotFoundException(`${Messages.CATEGORY_NOT_FOUND} id: ${id}`);
      }
      return formatResponse(
        HttpStatus.OK,
        Messages.BLOG_UPDATED,
        updatedBLog,
      );
    }

   async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedBLog = await this.blogModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedBLog) {
      throw new NotFoundException(`${Messages.BLOG_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.BLOG_DELETED, null);
  }
}
