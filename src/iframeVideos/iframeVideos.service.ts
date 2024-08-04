import { InjectRepository } from '@nestjs/typeorm';
import { IframeVideos } from './model/iframeVideos.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from '../auth/model/auth.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IframeVideosService {
  constructor(
    @InjectRepository(IframeVideos)
    private iframeVideosRepository: Repository<IframeVideos>,
    @InjectRepository(AuthEntity)
    private userRepository: Repository<AuthEntity>,
  ) {}

  async AddIframeVideos(
    userId: string,
    iframeVideosData: Partial<IframeVideos>,
  ): Promise<IframeVideos> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const iframeVideos = this.iframeVideosRepository.create({
      ...iframeVideosData,
      user: user,
    });
    return this.iframeVideosRepository.save(iframeVideos);
  }

  async GetIframeVideos(userId: string): Promise<IframeVideos[]> {
    return this.iframeVideosRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteIframeVideos(iframeVideosId: string): Promise<void> {
    const iframeVideos = await this.iframeVideosRepository.findOneBy({
      id: iframeVideosId,
    });
    if (!iframeVideos) {
      throw new NotFoundException(
        `IframeVideos with ID ${iframeVideosId} not found`,
      );
    }

    await this.iframeVideosRepository.delete(iframeVideosId);
  }
}
