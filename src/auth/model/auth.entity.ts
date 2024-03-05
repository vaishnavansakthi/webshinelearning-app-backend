import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  hobby: string;

  @Column({ nullable: true })
  favoriteProgrammingLanguage: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
