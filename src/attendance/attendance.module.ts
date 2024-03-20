import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../auth/model/auth.entity';
import { Attendance } from './model/attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, Attendance])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}