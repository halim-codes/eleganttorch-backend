import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async login(loginDto: LoginAuthDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password')
      .lean();

    if (
      !user?.password ||
      !(await bcrypt.compare(loginDto.password, user.password))
    ) {
      return null;
    }

    const payload = {
      email: user.email,
      sub: user._id,
    };
    const access_token = this.jwtService.sign(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, __v, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      access_token,
    };
  }
}
