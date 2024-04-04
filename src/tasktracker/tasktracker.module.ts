import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./../auth/model/auth.entity";
import { TaskTracker } from "./model/tasktracker.entity";
import { TaskTrackerService } from "./tasktracker.service";
import { TaskTrackerController } from "./tasktracker.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, TaskTracker])],
    providers: [TaskTrackerService],
    controllers: [TaskTrackerController],
})

export class TaskTrackerModule {}