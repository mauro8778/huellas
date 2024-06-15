import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entidades/users.entity';
import { Auth0Module } from 'src/auth0/auth0.module';
import { Auth0Guard } from 'src/guards/auth0.guard';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { MailService } from 'src/mails/mail.service';
import { ConfigModule } from '@nestjs/config';
import { MapsService } from 'src/maps/maps.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, ShelterEntity]), Auth0Module],
  providers: [AuthService, Auth0Guard,MailService, ConfigModule,MapsService],
  controllers: [AuthController]
})
export class AuthModule {}
