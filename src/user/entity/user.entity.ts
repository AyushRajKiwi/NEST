import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/user.types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fname!: string;

  @Column()
  lname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: Role, default: Role.Student })
  role?: Role;
}
