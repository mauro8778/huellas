import { Body, Controller, Get, Post } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionsEntity } from 'src/entidades/promotions.entity';
import { CarritoPendienteDto } from 'src/dto/Carrito.dto';
import { PomotionDto } from 'src/dto/create.promotion.dto';

@Controller('promotion')
export class PromotionController {
    constructor(private promotionService: PromotionService){}

    @Post()
    addPromotion(@Body() newPromotion: PomotionDto){
        return this.promotionService.addPromotion(newPromotion);
    }

}
