import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTracker } from './model/tasktracker.entity';

@Injectable()
export class TaskTrackerService {
  constructor(
    @InjectRepository(TaskTracker)
    private taskTrackerRepository: Repository<TaskTracker>,
  ) {}

  async createTaskTrackerEntry(
    title: string,
    storyPoints: number,
    status: string,
    comments: string,
    userId: string,
  ): Promise<TaskTracker> {
    const taskTracker = this.taskTrackerRepository.create({
      title,
      storyPoints,
      status,
      comments,
      user: { id: userId },
    });
    return this.taskTrackerRepository.save(taskTracker);
  }

  async getAllTaskTrackerEntries(): Promise<TaskTracker[]> {
    return this.taskTrackerRepository.find({ relations: ['user'] });
  }

  async getTaskTrackerEntryById(taskTrackerId: string): Promise<any> {
    const taskTrackerEntry = await this.taskTrackerRepository.find({
      where: { id: taskTrackerId },
      relations: ['user'],
    });
    if (!taskTrackerEntry) {
      throw new NotFoundException(
        `TaskTracker entry with id ${taskTrackerId} not found`,
      );
    }
    return taskTrackerEntry;
  }

  async getTaskTrackersByUserId(userId: string): Promise<TaskTracker[]> {
    return this.taskTrackerRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateTaskTrackerEntry(
    taskTrackerId: string,
    updatedData: Partial<TaskTracker>,
  ): Promise<TaskTracker> {
    const existingTaskTracker = await this.taskTrackerRepository.findOneBy({
      id: taskTrackerId,
    });

    if (!existingTaskTracker) {
      throw new NotFoundException(
        `TaskTracker entry with id ${taskTrackerId} not found`,
      );
    }

    Object.assign(existingTaskTracker, updatedData);

    const updatedTaskTracker =
      await this.taskTrackerRepository.save(existingTaskTracker);

    return updatedTaskTracker;
  }

  async deleteTaskTrackerEntry(taskTrackerId: string): Promise<void> {
    const result = await this.taskTrackerRepository.delete(taskTrackerId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `TaskTracker entry with id ${taskTrackerId} not found`,
      );
    }
  }
}
