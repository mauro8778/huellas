import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';
import {v4 as uuid} from "uuid"
import { ShelterEntity } from './shelter.entity';


@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @ManyToOne(() => UserEntity, user => user.sentMessages, { eager: true })
  sender: UserEntity;

  @ManyToOne(() => UserEntity, user => user.receivedMessages, { nullable: true, eager: true })
  receiver: UserEntity;

  @ManyToOne(() => ShelterEntity, (shelter) => shelter.sentMessages, { eager: true })
  shelterSender: ShelterEntity;

  @ManyToOne(() => ShelterEntity, (shelter) => shelter.receivedMessages, { nullable: true, eager: true })
  shelterReceiver: ShelterEntity;

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;

}
