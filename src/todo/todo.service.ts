import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './model/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  createItem(item: string, completed: boolean) {
    const res = this.todoRepository.create({
      item: item,
      completed: completed,
    });
    return this.todoRepository.save(res);
  }

  getItems() {
    return this.todoRepository.find();
  }

  getTest(){
    return "hello test"
  }
}
