import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { ShelterRepository } from 'src/shelters/shelters.repository';
import { MailService } from 'src/mails/mail.service';

@Module({
  imports:[TypeOrmModule.forFeature([ShelterEntity])],
  providers: [MapsService,ShelterRepository,MailService],
  controllers: [MapsController],
})
export class MapsModule {}
