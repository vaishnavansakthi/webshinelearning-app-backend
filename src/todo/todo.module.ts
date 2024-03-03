import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./model/todo.entity";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TodoEntity])],
    providers: [TodoService],
    controllers: [TodoController]
})
export class TodoModule {}