import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memes } from './model/memes.entity'
import { MemesService } from './memes.service';
import { MemesController } from './memes.controller';
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryProvider } from "./providers/cloudinary.provider";
import { NestjsFormDataModule } from 'nestjs-form-data';


@Module({
    imports: [TypeOrmModule.forFeature([Memes]),NestjsFormDataModule],
    providers: [MemesService, CloudinaryService, CloudinaryProvider],
    controllers: [MemesController],
})
export class MemesModule {}