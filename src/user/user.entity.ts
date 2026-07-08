import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Tells TypeORM: "Make a table for this!"
export class User {
  @PrimaryGeneratedColumn() // Automatically generates a unique ID (1, 2, 3...)
  id: number;

  @Column() // Creates a standard text column in the table
  name: string;

  @Column()
  email: string;
}
