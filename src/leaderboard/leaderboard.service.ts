import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leaderboard } from './model/leaderboard.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async createLeaderboardEntry(
    suggestion: string,
    points: number,
    userId: string,
  ): Promise<Leaderboard> {
    const leaderboardEntry = this.leaderboardRepository.create({
      suggestion,
      points,
      user: { id: userId },
    });
    return this.leaderboardRepository.save(leaderboardEntry);
  }

  async getAllLeaderboardEntries(): Promise<Leaderboard[]> {
    return this.leaderboardRepository.find({ relations: ['user'] });
  }

  async getLeaderboardEntryById(leaderboardId: string): Promise<any> {
    const leaderboardEntry = await this.leaderboardRepository.find({
      where: { id: leaderboardId },
      relations: ['user'],
    });
    if (!leaderboardEntry) {
      throw new NotFoundException(
        `Leaderboard entry with id ${leaderboardId} not found`,
      );
    }
    return leaderboardEntry;
  }

  async updateLeaderboardEntry(
    leaderboardId: string,
    updatedData: Partial<Leaderboard>,
  ): Promise<Leaderboard> {
    const leaderboardEntry =
      await this.leaderboardRepository.findOneBy({id: leaderboardId});
    if (!leaderboardEntry) {
      throw new NotFoundException(
        `Leaderboard entry with id ${leaderboardId} not found`,
      );
    }
    Object.assign(leaderboardEntry, updatedData);
    return this.leaderboardRepository.save(leaderboardEntry);
  }

  async deleteLeaderboardEntry(leaderboardId: string): Promise<void> {
    const result = await this.leaderboardRepository.delete(leaderboardId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Leaderboard entry with id ${leaderboardId} not found`,
      );
    }
  }
}
