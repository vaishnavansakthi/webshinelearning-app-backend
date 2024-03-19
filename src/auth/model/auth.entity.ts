import { Task } from '../../task/model/task.entity';
import { Attendance } from '../../attendance/model/attendance.entity';
import { Profile } from '../../profile/model/profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Leaderboard } from '../../leaderboard/model/leaderboard.entity';
import { Tasktracker } from '../../tasktracker/model/tasktracker.entity';

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

  // @CreateDateColumn({ nullable: true })
  // createdAt: Date;

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

  @OneToMany(() => Tasktracker, (tasktracker) => tasktracker.user, { onDelete: 'CASCADE' })
  tasktracker: Tasktracker[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
