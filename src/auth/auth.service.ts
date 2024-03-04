import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './model/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private repository: Repository<AuthEntity>,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
    mobileNumber: string,
  ) {
    const user = await this.repository.findOneBy({ email: email });
    if (user) {
      throw new BadRequestException('User Already Exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new AuthEntity();
    userData.username = username;
    userData.email = email;
    userData.password = hashedPassword;
    userData.mobileNumber = mobileNumber;
    const res = await this.repository.create(userData);
    return this.repository.save(res);
  }

  async login(email: string, password: string) {
    const user = await this.repository.findOneBy({ email: email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
