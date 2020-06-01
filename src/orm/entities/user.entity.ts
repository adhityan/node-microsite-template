import { Entity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;
}
