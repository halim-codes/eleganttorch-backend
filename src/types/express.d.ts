import { User as UserType } from '../modules/users/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: {
      sub: string;
      email: string;
    };
  }
}
