import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoInformationsService } from './co_informations.service';
import { CreateCoInformationDto } from './dto/create-co_information.dto';
import { UpdateCoInformationDto } from './dto/update-co_information.dto';

@Controller('co-informations')
export class CoInformationsController {
  constructor(private readonly coInformationsService: CoInformationsService) {}

  @Post()
  create(@Body() createCoInformationDto: CreateCoInformationDto) {
    return this.coInformationsService.create(createCoInformationDto);
  }

  @Get()
  findAll() {
    return this.coInformationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coInformationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoInformationDto: UpdateCoInformationDto) {
    return this.coInformationsService.update(id, updateCoInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coInformationsService.remove(id);
  }
}
