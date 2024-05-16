import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookingModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  phone: string;

  @Column({nullable: true})
  chooseYourCourse: string;

  @Column({nullable: true})
  desc: string;

  @Column({nullable: true})
  isCourseBooked: boolean;

  @Column()
  availableSeats: number;

  @Column({nullable: true})
  order: number;

  @CreateDateColumn()
  createdAt: Date;
}
