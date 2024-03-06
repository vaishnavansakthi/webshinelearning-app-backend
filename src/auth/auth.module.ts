import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./model/auth.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CorsModule } from "@nestjs/platform-express"

@Module({
    imports: [CorsModule.forRoot({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
      }),TypeOrmModule.forFeature([AuthEntity]), JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
    })],
    providers: [AuthService, JwtService],
    controllers: [AuthController]
})
export class AuthModule {}