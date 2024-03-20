import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './model/attendance.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from '../auth/model/auth.entity';
import { NotFoundException } from '@nestjs/common';

export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(AuthEntity)
    private userRepository: Repository<AuthEntity>,
  ) {}

  async markAttendance(
    userId: string,
    title: string,
    status: string,
    desc: string,
    date: string,
  ): Promise<Attendance> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const attendance = await this.attendanceRepository.create({
      title: title,
      status: status,
      desc: desc,
      date: date,
      user: user,
    });

    return this.attendanceRepository.save(attendance);
  }

  async getAttendance(userId: string): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getAllAttendance(): Promise<Attendance[]> {
    return await this.attendanceRepository.find();
  }

//   async updateAttendance(
//     attendanceId: string,
//     updatedAttendance: Partial<Attendance>,
//   ): Promise<Attendance> {
//     const attendance = await this.attendanceRepository.findOneBy({
//       id: attendanceId,
//     });
//     if (!attendance) {
//       throw new NotFoundException(
//         `Attendance with ID ${attendanceId} not found`,
//       );
//     }

//     Object.assign(attendance, updatedAttendance);
//     return await this.attendanceRepository.save(attendance);
//   }

//   async deleteAttendance(attendanceId: string): Promise<void> {
//     const attendance = await this.attendanceRepository.findOneBy({
//       id: attendanceId,
//     });
//     if (!attendance) {
//       throw new NotFoundException(
//         `Attendance with ID ${attendanceId} not found`,
//       );
//     }

//     await this.attendanceRepository.delete(attendanceId);
//   }
}