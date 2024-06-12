import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { ShelterEntity } from "./shelter.entity";
import { UserEntity } from "./user.entity";
import { AdoptionEntity } from "./adoption.entity";


@Entity({
    name: 'pet'
})
export class PetsEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()


    @Column({
        type: "varchar",
        nullable: true,
        default: "Sin nombre"
    })
    name?: string


    @Column({
        type: "varchar",
        nullable: false
    })
    sexo: string


    @Column({
        type: "varchar",
        nullable: false
    })
    breed: string


    @Column({
        type: "varchar",
        nullable: false
    })
    species: string


    @Column({
        nullable: false
    })
    age: number

    @Column({
        nullable: false
    })
    month: string


    @Column({
        type: "varchar",
        nullable: true,
        default: ""
    })
    description?: string


    @Column({
        type: "varchar",
        nullable: false
    })
    pet_size: string


    @Column({
        type: "text",
        default: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
    })
    imgUrl: string


    @Column({
        nullable: true,
        type: "text",
        array:true
      })
      listImg?: string[];


    @Column({
        type: "varchar",
        nullable: true,
    })
    godfather?: string | undefined

    @Column({
        nullable: true,
        default: false,
    })
    isCondition: boolean;

    @Column({
        nullable: true,
        default: true,
    })
    isActive: boolean;

    @ManyToOne(() => ShelterEntity, (shelter) => shelter.pets)
    @JoinColumn()
    shelter: ShelterEntity

    @ManyToMany(() => UserEntity, (user) => user.favorite_pets)
    user: UserEntity[];

    @ManyToOne(() => UserEntity, (user) => user.pets)
    users: UserEntity;
}