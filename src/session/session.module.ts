import { Module } from "@nestjs/common";
import { Session } from './model/session.entity'
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";

@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    controllers: [SessionController],
    providers: [SessionService],
})
export class SessionModule {}