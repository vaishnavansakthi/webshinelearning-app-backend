import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUserById(userId: string): Promise<any> {
    const user = await this.repository.find({where: {id: userId}, relations: ['profile']});
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async deleteUser(userId: string): Promise<{message: string}> {
    const user = await this.repository.findOneBy({id: userId});
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.repository.delete(userId);

    return {
      message: `User with ID ${userId} deleted`,
    }
  }
}
