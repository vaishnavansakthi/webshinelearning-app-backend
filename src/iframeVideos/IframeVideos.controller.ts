import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IframeVideosService } from './iframeVideos.service';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from '../decorator/roles.decorator';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IframeVideos } from './model/iframeVideos.entity';

@ApiTags('iframeVideos')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('iframeVideos')
export class IframeVideosController {
  constructor(private readonly iframeVideosService: IframeVideosService) {}

  @Post(':userId/add')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async addIframeVideos(
    @Param('userId') userId: string,
    @Body() iframeVideosData: Partial<IframeVideos>,
  ) {
    console.log('iframeVideosData', iframeVideosData);
    return await this.iframeVideosService.AddIframeVideos(
      userId,
      iframeVideosData,
    );
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async getIframeVideos(
    @Param('userId') userId: string,
  ): Promise<IframeVideos[]> {
    return await this.iframeVideosService.GetIframeVideos(userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async getAllIframeVideos(): Promise<IframeVideos[]> {
    return await this.iframeVideosService.getAllIframeVideos();
  }

  @Delete(':iframeVideosId')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async deleteIframeVideos(@Param('iframeVideosId') iframeVideosId: string) {
    await this.iframeVideosService.deleteIframeVideos(iframeVideosId);
  }
}
