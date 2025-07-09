import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createAdmin(
    createUserDto: CreateUserDto,
  ): Promise<{ statusCode: number; message: string; data: UserDocument }> {
    const createdUser = new this.userModel({
      ...createUserDto,
      role: 'admin',
    });
    const savedUser = await createdUser.save();
    return formatResponse(HttpStatus.CREATED, Messages.USER_CREATED, savedUser);
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ statusCode: number; message: string; data: UserDocument }> {
    const createdUser = new this.userModel({
      ...createUserDto,
      role: 'user',
    });
    const savedUser = await createdUser.save();
    return formatResponse(HttpStatus.CREATED, Messages.USER_CREATED, savedUser);
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: UserDocument[];
  }> {
    const users = await this.userModel.find().exec();
    return formatResponse(HttpStatus.OK, Messages.USERS_RETRIEVED, users);
  }
  async findOne(
    id: string,
  ): Promise<{ statusCode: number; message: string; data: UserDocument }> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`${Messages.USER_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.USER_RETRIEVED, user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ statusCode: number; message: string; data: UserDocument }> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`${Messages.USER_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.USER_UPDATED, updatedUser);
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`${Messages.USER_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(HttpStatus.OK, Messages.USER_DELETED, null);
  }
}
