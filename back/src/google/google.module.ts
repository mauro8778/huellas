import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { Auth0Guard } from 'src/guards/auth0.guard';
import { Auth0Module } from 'src/auth0/auth0.module';
import { UserEntity } from 'src/entidades/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),Auth0Module],
  controllers: [GoogleController],
  providers: [GoogleStrategy, Auth0Guard]
})
export class GoogleModule {}
