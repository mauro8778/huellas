import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerchModule } from './serch/serch.module';
import { UsersModule } from './users/users.module';
import { SheltersModule } from './shelters/shelters.module';
import { AdoptionModule } from './adoptions/adoption.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { databaseConfig } from './config/database.config';
import { FileUploadModule } from './file_upload/file_upload.module';
import { Auth0Module } from './auth0/auth0.module';
import { MailModule } from './mails/mail.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleModule } from './google/google.module';
import { FacebookModule } from './facebook/facebook.module';
import { ShelterEntity } from './entidades/shelter.entity';
import { PetsEntity } from './entidades/pets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { CarritoModule } from './carrito/carrito.module';
import { ChatModule } from './chat/chat.module';
import { MapsModule } from './maps/maps.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      }),
      TypeOrmModule.forFeature([ShelterEntity, PetsEntity]),
      databaseConfig,
      FacebookModule,
      SerchModule,
      UsersModule,
      SheltersModule,
      AdoptionModule,
      AuthModule,
      PetsModule,
      FileUploadModule,
      Auth0Module,
      MailModule,
      GoogleModule,
      MercadoPagoModule,
      CarritoModule,
      MapsModule,
      PromotionModule
      
    
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
