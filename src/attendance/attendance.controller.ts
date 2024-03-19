import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './model/attendance.entity';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from '../decorator/roles.decorator';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AttendanceDto } from './dto/attendance.dto';

@ApiTags('Attendance')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post(':userId/mark')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async markAttendance(
    @Param('userId') userId: string,
    @Body() attendanceData: AttendanceDto,
  ): Promise<Attendance> {
    const { title, status, desc, date } = attendanceData;
    console.log(title, status, desc, date)
    return await this.attendanceService.markAttendance(userId, title, status, desc, date);
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async getAttendance(@Param('userId') userId: string): Promise<Attendance[]> {
    return await this.attendanceService.getAttendance(userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin')
  async getAllAttendance(): Promise<Attendance[]> {
    return await this.attendanceService.getAllAttendance();
  }

  @Put(':attendanceId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async updateAttendance(
    @Param('attendanceId') attendanceId: string,
    @Body() updatedAttendance: Partial<Attendance>,
  ): Promise<Attendance> {
    return await this.attendanceService.updateAttendance(attendanceId, updatedAttendance);
  }

  @Delete(':attendanceId')
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  async deleteAttendance(@Param('attendanceId') attendanceId: string): Promise<void> {
    await this.attendanceService.deleteAttendance(attendanceId);
  }
}
