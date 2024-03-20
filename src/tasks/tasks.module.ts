import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "../auth/model/auth.entity";
import { Task } from "./model/tasks.entity";
import { TaskService } from "./tasks.service";
import { TaskController } from "./tasks.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, Task])],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}