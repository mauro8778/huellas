import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.sentMessages, { eager: true })
  sender: UserEntity;

  @ManyToOne(() => UserEntity, user => user.receivedMessages, { nullable: true, eager: true })
  receiver: UserEntity;

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;

}
