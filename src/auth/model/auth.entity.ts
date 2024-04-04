import { Profile } from '../../profile/model/profile.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Attendance } from '../../attendance/model/attendance.entity';
import { Task } from '../../tasks/model/tasks.entity';
import { Leaderboard } from '../../leaderboard/model/leaderboard.entity';
import { TaskTracker } from '../../tasktracker/model/tasktracker.entity';

export enum Role {
  ADMIN = 'admin',
  MENTOR = 'mentor',
  USER = 'user',
}
@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  mobileNumber: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ default: false })
  isActivate: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  profile: Profile;

  @OneToMany(() => Attendance, (attendance) => attendance.user, {
    onDelete: 'CASCADE',
  })
  attendance: Attendance[];

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.user, {
    onDelete: 'CASCADE',
  })
  leaderboard: Leaderboard[];

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE' })
  tasks: Task[];

  @OneToMany(() => TaskTracker, (taskTracker) => taskTracker.user, {
    onDelete: 'CASCADE',
  })
  taskTracker: TaskTracker[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
