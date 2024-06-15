import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './User.Repository';
import { UserEntity } from '../entidades/users.entity';
import { VolunteerEntity } from '../entidades/volunteers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mails/mail.service';
import { ConfigService } from '@nestjs/config';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { ShelterRepository } from 'src/shelters/shelters.repository';
import { PetsEntity } from 'src/entidades/pets.entity';
import { JwtService } from '@nestjs/jwt';
import { Auth0Guard } from 'src/guards/auth0.guard';
import { Auth0Module } from 'src/auth0/auth0.module';
import { MapsModule } from 'src/maps/maps.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,VolunteerEntity,ShelterEntity,PetsEntity]), Auth0Module],
  controllers: [UserController],
  providers: [UserService,UserRepository,MailService, ConfigService, ShelterRepository,JwtService, Auth0Guard,MapsModule]
})
export class UsersModule {}
