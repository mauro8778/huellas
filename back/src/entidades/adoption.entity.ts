import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { UserEntity } from "./user.entity";
import { ShelterEntity } from "./shelter.entity";
import { PetsEntity } from "./pets.entity";


@Entity({
    name:'adoption'
})
export class AdoptionEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()


    @Column({
        nullable: false
    })
    date: Date

    @Column()
    isActive:boolean
    
    @ManyToOne(() => UserEntity, (user) => user.adoptions)
    user: UserEntity
    
    @ManyToOne(() => ShelterEntity, (shelter) => shelter.adoptions)
    shelter: ShelterEntity
    
    @OneToOne(() => PetsEntity)
    @JoinColumn({name: "petId"})
    pet: PetsEntity
}