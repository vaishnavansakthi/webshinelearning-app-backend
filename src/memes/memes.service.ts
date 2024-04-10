import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Memes } from './model/memes.entity';

@Injectable()
export class MemesService {
  constructor(
    @InjectRepository(Memes)
    private repo: Repository<Memes>,
  ) {}

  async create(input: any) {
    return this.repo.save(input);
  }

  async findAll() {
    return await this.repo.find({
      order: {
        id: 'DESC',
      },
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    return await this.repo.find({
      where: {
        id,
      },
      relations: ['user'],
    });
  }

//   update(id: number, updateUploadDto: UpdateUploadDto) {
//     return `This action updates a #${id} upload`;
//   }

  async remove(id: number) {
    const exists = await this.findOne(id)
    if (!exists) {
      return new NotFoundException('File not found.');
    }
    return this.repo.delete(id);
  }
}