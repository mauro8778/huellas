import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PomotionDto } from 'src/dto/create.promotion.dto';
import { PromotionsEntity } from 'src/entidades/promotions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionRepository {
    constructor(@InjectRepository(PromotionsEntity)
    private promotionRepository: Repository<PromotionsEntity>,){}

    async addPromotion(newPromo: PomotionDto){
        const promotion: PromotionsEntity[] = await this.promotionRepository.find();
        const {title, description} = newPromo        

        if (promotion.length != 0 ) {
            await this.promotionRepository.clear();
        }

        const newPromotion = new PromotionsEntity;
        newPromotion.description = description;
        newPromotion.title = title;
        await this.promotionRepository.save(newPromotion);

        return await this.promotionRepository.findOne({where: {id: newPromotion.id}})
        }

}
