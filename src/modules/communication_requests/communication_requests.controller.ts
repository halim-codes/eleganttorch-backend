import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunicationRequestsService } from './communication_requests.service';
import { CreateCommunicationRequestDto } from './dto/create-communication_request.dto';
import { UpdateCommunicationRequestDto } from './dto/update-communication_request.dto';

@Controller('communication-requests')
export class CommunicationRequestsController {
  constructor(private readonly communicationRequestsService: CommunicationRequestsService) {}

  @Post()
  create(@Body() createCommunicationRequestDto: CreateCommunicationRequestDto) {
    return this.communicationRequestsService.create(createCommunicationRequestDto);
  }

  @Get()
  findAll() {
    return this.communicationRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationRequestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationRequestDto: UpdateCommunicationRequestDto) {
    return this.communicationRequestsService.update(id, updateCommunicationRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationRequestsService.remove(id);
  }
}
