import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entities/project.entity';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
  ) { }

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<{ statusCode: number; message: string; data: CreateProjectDto }> {
    const created = new this.projectModel(createProjectDto);
    const saved = await created.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.PROJECT_CREATED,
      saved);
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: ProjectDocument[];
  }> {
    const projects = await this.projectModel.find().exec();
    return formatResponse(
      HttpStatus.OK,
      Messages.PROJECTS_RETRIEVED,
      projects);
  }

  async findOne(
    id: string,
  ): Promise<{ statusCode: number; message: string; data: ProjectDocument }> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`${Messages.PROJECT_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.PROJECT_RETRIEVED, project);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<{ statusCode: number; message: string; data: ProjectDocument }> {
    const updated = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`${Messages.PROJECT_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.PROJECT_UPDATED,
      updated);
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deleted = await this.projectModel
      .findByIdAndDelete(id)
      .exec();
    if (!deleted) {
      throw new NotFoundException(`${Messages.PROJECT_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.PROJECT_DELETED, null);
  }
}
