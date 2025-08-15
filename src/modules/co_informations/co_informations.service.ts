import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoInformationDto } from './dto/create-co_information.dto';
import { UpdateCoInformationDto } from './dto/update-co_information.dto';
import { CoInformation, CoInformationDocument } from './entities/co_information.entity';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class CoInformationsService {
  constructor(
    @InjectModel(CoInformation.name)
    private coInformationModel: Model<CoInformationDocument>,
  ) { }

  async create(
    createDto: CreateCoInformationDto,
  ): Promise<{ statusCode: number; message: string; data: CoInformationDocument }> {
    const created = new this.coInformationModel(createDto);
    const saved = await created.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.CO_INFORMATION_CREATED,
      saved,);
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: CoInformationDocument[];
  }> {
    const all = await this.coInformationModel.find().exec();
    return formatResponse(
      HttpStatus.OK,
      Messages.CO_INFORMATION_RETRIEVED,
      all,);
  }

  async findOne(
    id: string,
  ): Promise<{ statusCode: number; message: string; data: CoInformationDocument }> {
    const found = await this.coInformationModel.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`${Messages.CO_INFORMATION_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.CO_INFORMATION_RETRIEVED, found);
  }

  async update(
    id: string,
    updateDto: UpdateCoInformationDto,
  ): Promise<{ statusCode: number; message: string; data: CoInformationDocument }> {
    const updated = await this.coInformationModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`${Messages.CO_INFORMATION_NOT_FOUND} id: ${id}`);
    }

    return formatResponse(
      HttpStatus.OK,
      Messages.CO_INFORMATION_UPDATED,
      updated);
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deleted = await this.coInformationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deleted) {
      throw new NotFoundException(`${Messages.CO_INFORMATION_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.CO_INFORMATION_DELETED, null);
  }
}
