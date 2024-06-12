import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
// import { DonationEntity } from './donation.entity';
import { AdoptionEntity } from './adoption.entity';
import { OrdersEntity } from './orders.entity';
import { ShelterEntity } from './shelter.entity';
import { PetsEntity } from './pets.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  last_name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  birthdate: Date;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  phone?: number | undefined;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  location?: string | undefined;

  @Column({
    type: "text",
    default: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
  })
  imgUrl: string

  @Column({
    nullable: true,
    default: true,
  })
  isActive: boolean;


  @ManyToMany(() => ShelterEntity, (favorite_shelters) => favorite_shelters.user)
  @JoinTable()
  favorite_shelters: ShelterEntity[];

  @ManyToMany(() => PetsEntity, (favorite_pets) => favorite_pets.user)
  @JoinTable()
  favorite_pets: PetsEntity[];

  @OneToMany(() => AdoptionEntity, (adoptions) => adoptions.user)
  adoptions: AdoptionEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  @JoinColumn({ name: "order_id" })
  orders: OrdersEntity[]

  @OneToMany(() => PetsEntity, pets => pets.users)
  @JoinColumn()
  pets: PetsEntity[];
}
