import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { TaskTrackerService } from './tasktracker.service';
import { TaskTracker } from './model/tasktracker.entity';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from 'src/decorator/roles.decorator';

@ApiTags('TaskTracker')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('task-tracker')
export class TaskTrackerController {
    constructor(private readonly taskTrackerService: TaskTrackerService) {}

    @Get()
    @UseGuards(AuthGuard)
    @Roles('admin', 'user')
    async getAllTaskTrackerEntries(): Promise<TaskTracker[]> {
        return this.taskTrackerService.getAllTaskTrackerEntries();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @Roles('admin', 'user')
    async getTaskTrackerEntryById(@Param('id') id: string): Promise<TaskTracker> {
        return this.taskTrackerService.getTaskTrackerEntryById(id);
    }

    @Get('user/:userId')
  async getTaskTrackersByUserId(@Param('userId') userId: string): Promise<TaskTracker[]> {
    const taskTrackers = await this.taskTrackerService.getTaskTrackersByUserId(userId);
    if (!taskTrackers || taskTrackers.length === 0) {
      throw new NotFoundException(`No TaskTrackers found for user with id ${userId}`);
    }
    return taskTrackers;
  }

    @Post(':userId')
    @UseGuards(AuthGuard)
    @Roles('admin', 'user')
    async createTaskTrackerEntry(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Body() taskTrackerData: Partial<TaskTracker>,
    ) {
        const { title, storyPoints, status, comments } = taskTrackerData;
        return this.taskTrackerService.createTaskTrackerEntry(title, storyPoints, status, comments, userId);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @Roles('admin', 'user')
    async updateTaskTrackerEntry(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatedData: Partial<TaskTracker>,
    ): Promise<TaskTracker> {
        return this.taskTrackerService.updateTaskTrackerEntry(id, updatedData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles('admin', 'user')
    async deleteTaskTrackerEntry(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.taskTrackerService.deleteTaskTrackerEntry(id);
    }
}