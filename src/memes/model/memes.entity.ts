import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { AuthEntity } from '../../auth/model/auth.entity';

@Entity()
export class Memes {
  @ApiProperty({ type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar', length: 255, unique: true })
  url: string;

  @ApiProperty({ type: 'string' })
  @Column({ name: 'mime_type', type: 'varchar' })
  mimeType: string;

  @ApiProperty({ type: 'string' })
  @Column({ name: 'provider', type: 'varchar', nullable: true })
  provider?: string;

  @ManyToOne(() => AuthEntity, (user) => user.memes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  user: AuthEntity;

  @CreateDateColumn({ type: 'date'})
  createdAt: Date;
}