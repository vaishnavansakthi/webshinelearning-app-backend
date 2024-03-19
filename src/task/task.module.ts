import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "../auth/model/auth.entity";
import { Task } from "./model/task.entity";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, Task])],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}