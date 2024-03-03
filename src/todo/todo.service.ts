import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './model/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private TodoRepository: Repository<TodoEntity>,
  ) {}

  async createItem(item: string, completed: boolean) {
    try {
      const res = await this.TodoRepository.create({
        item: item,
        completed: completed,
      });
      return this.TodoRepository.save(res);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getItems() {
    try {
      return this.TodoRepository.find();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
