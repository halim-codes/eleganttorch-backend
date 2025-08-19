import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './entities/service.entity';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
  ): Promise<{ statusCode: number; message: string; data: ServiceDocument }> {
    const createdService = new this.serviceModel(createServiceDto);
    const savedService = await createdService.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.SERVICE_CREATED,
      savedService,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: ServiceDocument[];
  }> {
    const services = await this.serviceModel.find().exec();
    return formatResponse(
      HttpStatus.OK,
      Messages.SERVICE_RETRIEVED,
      services,
    );
  }
  

  async findOne(
    id: string,
  ): Promise<{ statusCode: number; message: string; data: ServiceDocument }> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`${Messages.SERVICE_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.SERVICE_RETRIEVED, service);
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<{ statusCode: number; message: string; data: ServiceDocument }> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
    if (!updatedService) {
      throw new NotFoundException(`${Messages.SERVICE_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.SERVICE_UPDATED,
      updatedService,
    );
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedService = await this.serviceModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedService) {
      throw new NotFoundException(`${Messages.SERVICE_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.SERVICE_DELETED, null);
  }
}
