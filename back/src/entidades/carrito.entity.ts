import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";
import {v4 as uuid} from "uuid"


@Entity({
    name: "carrito"
})
export class CarritoPendienteEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
        nullable: false
    })
    shelter_id: string

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number

    @ManyToOne(() => UserEntity, (user) => user.carrito)
    @JoinColumn({name: "user_id" })
    user: UserEntity

} 