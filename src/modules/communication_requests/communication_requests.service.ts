import {
  Injectable,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CommunicationRequest, CommunicationRequestDocument } from './entities/communication_request.entity';
import { CreateCommunicationRequestDto } from './dto/create-communication_request.dto';
import { UpdateCommunicationRequestDto } from './dto/update-communication_request.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class CommunicationRequestsService {
  constructor(
    @InjectModel(CommunicationRequest.name)
    private communicationRequestModel: Model<CommunicationRequestDocument>,
  ) { }

  async create(
    createDto: CreateCommunicationRequestDto,
  ): Promise<{ statusCode: number; message: string; data: CreateCommunicationRequestDto }> {
    const createdRequest = new this.communicationRequestModel(createDto);
    const savedRequest = await createdRequest.save();

    return formatResponse(
      HttpStatus.CREATED,
      Messages.COMM_REQUEST_CREATED,
      savedRequest,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: CommunicationRequestDocument[]
  }> {
    const requests = await this.communicationRequestModel.find().sort({ createdAt: -1 }).exec()
    return formatResponse
      (HttpStatus.OK,
        Messages.COMM_REQUESTS_RETRIEVED,
        requests);
  }

  async findOne(
    id: string
  ): Promise<{ statusCode: number; message: string; data: CommunicationRequestDocument }> {
    const request = await this.communicationRequestModel.findById(id).exec();
    if (!request) {
      throw new NotFoundException(`${Messages.COMM_REQUEST_NOT_FOUND} id: ${id}`);
    }

    return formatResponse(HttpStatus.OK, Messages.COMM_REQUEST_RETRIEVED, request);
  }

  async update(
    id: string,
    updateDto: UpdateCommunicationRequestDto,
  ): Promise<{ statusCode: number; message: string; data: CommunicationRequestDocument }> {
    const updatedRequest = await this.communicationRequestModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updatedRequest) {
      throw new NotFoundException(`${Messages.COMM_REQUEST_NOT_FOUND} id: ${id}`);
    }

    return formatResponse(
      HttpStatus.OK,
      Messages.COMM_REQUEST_UPDATED,
      updatedRequest);
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedRequest = await this.communicationRequestModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedRequest) {
      throw new NotFoundException(`${Messages.COMM_REQUEST_NOT_FOUND} id: ${id}`);
    }

    return formatResponse(HttpStatus.OK, Messages.COMM_REQUEST_DELETED, null);
  }
}
