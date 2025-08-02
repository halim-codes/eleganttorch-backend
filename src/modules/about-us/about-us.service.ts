import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutUs, AboutUsDocument } from './entities/about-us.entity';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name)
    private aboutUsModel: Model<AboutUsDocument>,
  ) {}

  async create(
    createAboutUsDto: CreateAboutUsDto,
  ): Promise<{ statusCode: number; message: string; data: AboutUsDocument }> {
    const createdAboutUs = new this.aboutUsModel(createAboutUsDto);
    const savedAboutUs = await createdAboutUs.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.ABOUT_US_CREATED,
      savedAboutUs,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: AboutUsDocument[];
  }> {
    const aboutus = await this.aboutUsModel.find().exec();
    return formatResponse(HttpStatus.OK, Messages.ABOUT_US_RETRIEVED, aboutus);
  }

  findOne(id: string) {
    return `This action returns a #${id} aboutUs`;
  }

  async update(
    id: string,
    updateAboutUsDto: UpdateAboutUsDto,
  ): Promise<{ statusCode: number; message: string; data: AboutUsDocument }> {
    const updatedAboutUs = await this.aboutUsModel
      .findByIdAndUpdate(id, updateAboutUsDto, { new: true })
      .exec();
    if (!updatedAboutUs) {
      throw new NotFoundException(`${Messages.ABOUT_US_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.ABOUT_US_UPDATED,
      updatedAboutUs,
    );
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedAboutUs = await this.aboutUsModel.findByIdAndDelete(id).exec();
    if (!deletedAboutUs) {
      throw new NotFoundException(`${Messages.ABOUT_US_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.ABOUT_US_DELETED, null);
  }
}
