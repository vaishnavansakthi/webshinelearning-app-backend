import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "../auth/model/auth.entity";
import { Leaderboard } from "./model/leaderboard.entity";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardController } from "./leaderboard.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, Leaderboard])],
    providers: [LeaderboardService],
    controllers: [LeaderboardController]
})
export class LeaderboardModule {}