import { SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserDocument = User & Document;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
