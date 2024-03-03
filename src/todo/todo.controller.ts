import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('create')
  async createItem(@Body() todoDto: TodoDto) {
    return this.todoService.createItem(todoDto.item, todoDto.completed);
  }

  @Get('getItem')
  async getItems() {
    return this.todoService.getItems();
  }
}
