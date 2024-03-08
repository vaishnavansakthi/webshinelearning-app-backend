import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../auth/model/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthEntity) private repository: Repository<AuthEntity>,
  ) {}

  async getAllUser() {
    return this.repository.find({
      relations: ['profile'],
    });
  }
}
