import { Controller, Post, Get, Put, Delete, Param, Body, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from './model/tasks.entity';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from '../decorator/roles.decorator';

@ApiTags('Task')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':userId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async createTask(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return await this.taskService.createTask(userId, taskData);
  }


  @Get(':userId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async getTasksByUserId(@Param('userId', ParseUUIDPipe) userId: string): Promise<Task[]> {
    return await this.taskService.getTasksByUserId(userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin')
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @Put(':taskId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async updateTask(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() updatedTask: Partial<Task>,
  ): Promise<Task> {
    return await this.taskService.updateTask(taskId, updatedTask);
  }

  @Delete(':taskId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async deleteTask(@Param('taskId', ParseUUIDPipe) taskId: string): Promise<void> {
    await this.taskService.deleteTask(taskId);
  }
}