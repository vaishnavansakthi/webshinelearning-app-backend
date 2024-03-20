import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './model/tasks.entity';
import { AuthEntity } from '../auth/model/auth.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async createTask(userId: string, taskData: Partial<Task>): Promise<Task> {
    const user = await this.authRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const task = this.taskRepository.create({
      ...taskData,
      user: user,
    });
    return await this.taskRepository.save(task);
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    Object.assign(task, updatedTask);
    return await this.taskRepository.save(task);
  }

  async deleteTask(taskId: string): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    await this.taskRepository.delete(taskId);
  }
}