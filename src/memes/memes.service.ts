import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Memes } from './model/memes.entity';
import * as cloudinary from 'cloudinary';

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

  async remove(id: number) {
    const meme: any = await this.repo.find({where: { id }});
    if (!meme) {
      throw new NotFoundException('Meme not found.');
    }

    const public_id = meme[0]?.imagePublicId;

    await cloudinary.v2.uploader.destroy(public_id);

    return this.repo.delete(id);
  }
}
