import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<{ statusCode: number; message: string; data: ProductDocument }> {
    if (!image) {
      throw new BadRequestException('Image is required');
    }
    console.log('Uploaded image:', image);
    const imagePath = `/uploads/${image.filename}`;

    const created = new this.productModel({
      ...createProductDto,
      image: imagePath,
    });
    const saved = await created.save();
    return formatResponse(HttpStatus.CREATED, Messages.PRODUCT_CREATED, saved);
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: ProductDocument[];
  }> {
    const products = await this.productModel.find().populate('category').exec();
    return formatResponse(HttpStatus.OK, Messages.PRODUCTS_RETRIEVED, products);
  }

  async findOne(
    id: string,
  ): Promise<{ statusCode: number; message: string; data: ProductDocument }> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`${Messages.PRODUCT_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.PRODUCT_RETRIEVED, product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<{ statusCode: number; message: string; data: ProductDocument }> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`${Messages.PRODUCT_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.PRODUCT_UPDATED, updated);
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`${Messages.PRODUCT_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.PRODUCT_DELETED, null);
  }
}
