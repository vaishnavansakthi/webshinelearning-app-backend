import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "src/auth/model/auth.entity";
import { Profile } from "./model/profile.entity";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, Profile])],
    providers: [ProfileService],
    controllers: [ProfileController]
})
export class ProfileModule {}