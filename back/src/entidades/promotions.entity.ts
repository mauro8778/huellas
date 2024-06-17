import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"


@Entity({
    name: 'promotion'
})
export class PromotionsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;

}