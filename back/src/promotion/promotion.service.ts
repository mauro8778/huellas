import { Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { PomotionDto } from 'src/dto/create.promotion.dto';

@Injectable()
export class PromotionService {
    constructor(private promotionRepository: PromotionRepository){}

    addPromotion(newPromotion: PomotionDto) {
        return this.promotionRepository.addPromotion(newPromotion)
    }
}
