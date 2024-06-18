import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { ShelterRepository } from './shelters.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity } from '../entidades/shelter.entity';
import { MailService } from 'src/mails/mail.service';
import { ConfigService } from '@nestjs/config';
import { Auth0Module } from 'src/auth0/auth0.module';
import { Auth0Guard } from 'src/guards/auth0.guard';
import { MapsService } from 'src/maps/maps.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([ShelterEntity]), Auth0Module],
  providers: [SheltersService,ShelterRepository, MailService, ConfigService, Auth0Guard,MapsService, JwtService],
  controllers: [SheltersController]
})
export class SheltersModule {}