import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    item: string;

    @Column({nullable: false, default: false})
    completed: boolean;
}