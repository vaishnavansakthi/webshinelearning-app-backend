import { Controller, Get, Post, Body, Param, UseGuards, InternalServerErrorException, ParseUUIDPipe } from '@nestjs/common';
import { MemesService } from './memes.service';
import { CreateUploadDto, UploadInput } from './dto/create-upload.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { CloudinaryService } from './cloudinary.service';
import { Memes } from './model/memes.entity';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from '../../src/decorator/roles.decorator';

@ApiTags('Memes')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('memes')
@FormDataRequest()
export class MemesController {
  constructor(
    private readonly memesService: MemesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('cloudinary/:userId')
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The file has been uploaded successfully to cloudinary',
    type: Memes,
  })
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  async createMemes(@Param('userId', ParseUUIDPipe) userId: string,@Body() createUploadDto: CreateUploadDto) {
    try {
      const { file } = createUploadDto;
    //   console.log("Received file:", file);

      const cloudinaryUploadResponse = await this.cloudinaryService.uploadFile(file);
    //   console.log("Cloudinary upload response:", cloudinaryUploadResponse);

      const uploadInfo: UploadInput = {
        url: cloudinaryUploadResponse.url,
        mimeType: file.busBoyMimeType,
        user: userId,
        provider: 'cloudinary',
      };

      await this.memesService.create(uploadInfo);

      return uploadInfo;
    } catch (error) {
      console.error("Error during meme creation:", error);
      throw new InternalServerErrorException('Failed to create meme');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  findAll() {
    return this.memesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  findOne(@Param('id') id: string) {
    return this.memesService.findOne(+id);
  }
}
