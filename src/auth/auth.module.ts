import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./model/auth.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { GoogleStrategy } from "src/strategy/google.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity]), JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
    })],
    providers: [AuthService, JwtService, GoogleStrategy],
    controllers: [AuthController]
})
export class AuthModule {}