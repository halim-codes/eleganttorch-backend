import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<{ statusCode: number; message: string; data: CategoryDocument }> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    const savedCategory = await createdCategory.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.CATEGORY_CREATED,
      savedCategory,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: CategoryDocument[];
  }> {
    const categories = await this.categoryModel.find().exec();
    return formatResponse(
      HttpStatus.OK,
      Messages.CATEGORY_RETRIEVED,
      categories,
    );
  }
  async findOne(
    id: string,
  ): Promise<{ statusCode: number; message: string; data: CategoryDocument }> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`${Messages.CATEGORY_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.CATEGORY_RETRIEVED, category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<{ statusCode: number; message: string; data: CategoryDocument }> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException(`${Messages.CATEGORY_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.CATEGORY_UPDATED,
      updatedCategory,
    );
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory) {
      throw new NotFoundException(`${Messages.CATEGORY_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.CATEGORY_DELETED, null);
  }
}
