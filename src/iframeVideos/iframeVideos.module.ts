import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../auth/model/auth.entity';
import { IframeVideos } from './model/iframeVideos.entity';
import { IframeVideosController } from './IframeVideos.controller';
import { IframeVideosService } from './iframeVideos.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, IframeVideos])],
  providers: [IframeVideosService],
  controllers: [IframeVideosController],
})
export class IframeVideosModule {}
