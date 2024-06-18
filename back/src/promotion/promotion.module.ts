import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsEntity } from 'src/entidades/promotions.entity';
import { PromotionRepository } from './promotion.repository';

@Module({
  imports:[TypeOrmModule.forFeature([PromotionsEntity])],
  providers: [PromotionService, PromotionRepository],
  controllers: [PromotionController]
})
export class PromotionModule {}
