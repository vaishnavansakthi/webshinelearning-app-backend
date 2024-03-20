import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { Leaderboard } from './model/leaderboard.entity';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from 'src/decorator/roles.decorator';

@ApiTags('Leaderboard')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  async getAllLeaderboardEntries(): Promise<Leaderboard[]> {
    return this.leaderboardService.getAllLeaderboardEntries();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  async getLeaderboardEntryById(@Param('id') id: string): Promise<Leaderboard> {
    return this.leaderboardService.getLeaderboardEntryById(id);
  }

  @Post(':userId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  async createLeaderboardEntry(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() leaderboardData: Partial<Leaderboard>,
  ) {
    const { suggestion, points } = leaderboardData;
    return this.leaderboardService.createLeaderboardEntry(suggestion, points, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor')
  async updateLeaderboardEntry(
    @Param('id') id: string,
    @Body() updatedData: Partial<Leaderboard>,
  ): Promise<Leaderboard> {
    return this.leaderboardService.updateLeaderboardEntry(id, updatedData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor')
  async deleteLeaderboardEntry(@Param('id') id: string): Promise<void> {
    return this.leaderboardService.deleteLeaderboardEntry(id);
  }
}
