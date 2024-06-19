import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarritoPendienteDto } from "src/dto/Carrito.dto";
import { ShelterOrderDto } from "src/dto/shelterOrderDto";
import { CarritoPendienteEntity } from "src/entidades/carrito.entity";
import { OrderDetailsEntity } from "src/entidades/orderDetail.entity";
import { OrdersEntity } from "src/entidades/orders.entity";
import { ShelterEntity } from "src/entidades/shelter.entity";
import { UserEntity } from "src/entidades/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class CarritoRepository {
    constructor(
        @InjectRepository(OrdersEntity)
        private ordersRepository: Repository<OrdersEntity>,
        @InjectRepository(OrderDetailsEntity)
        private ordersDetailsRepository: Repository<OrderDetailsEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(ShelterEntity)
        private shelterRepository: Repository<ShelterEntity>,
        @InjectRepository(CarritoPendienteEntity)
        private carritoRepository: Repository<CarritoPendienteEntity>,
    ) { }

    async getOrder(uid) {
        const order = await this.ordersRepository.find({
            where: { id: uid },
            relations: {
                orderdetails: {
                    shelters: true
                },
            },
        });

        if (!order) {
            return `Orden con id ${uid} no encontrada`
        }

        return order;
    }

    async getCarrito(userId: string) {
        
        const user = await this.usersRepository.findOne({
          where: { id: userId },
          relations: ['carrito'],
        });
      
        
        if (!user) {
          throw new NotFoundException('Usuario no encontrado');
        }
      
       
        const carrito = user.carrito
      
        
        if (!carrito) {
          throw new NotFoundException('Carrito no encontrado');
        }

        const arr = await Promise.all(
            carrito.map(async (shelter) => {
              const nshelter: ShelterEntity = await this.shelterRepository.findOne({
                where: { id: shelter.shelter_id },
              });
        
              const { id, shelter_name, imgUrl } = nshelter;

              const shelter_id = id
        
              return {id: shelter.id, shelter_id, shelter_name, imgUrl, price: shelter.price }; 

            })
          );
        
          return arr;
        }
      

    async addOrder(ordershelter, userId) {
        let total = 0;

        const user = await this.usersRepository.findOneBy({ id: userId })
        if (!user) {
            throw new BadRequestException(`Usuario con id ${userId} no encontrado`);

        }

        const order = new OrdersEntity();
        order.date = new Date();
        order.user = user

        const newOrder = await this.ordersRepository.save(order);

        const sheltersArray = await Promise.all(
            ordershelter.map(async (element: ShelterOrderDto) => {
                const shelter = await this.shelterRepository.findOneBy({
                    id: element.id,
                });

                if (!shelter) {
                    throw new BadRequestException(`Producto con id ${element.id} no encontrado`);
                }


                total += Number(element.price);


                return shelter;

            }),
        );

        const orderDetail: OrderDetailsEntity = new OrderDetailsEntity();

        orderDetail.totalPrice = Number(total);
        orderDetail.shelters = sheltersArray;
        orderDetail.order = newOrder;

        const save = await this.ordersDetailsRepository.save(orderDetail);

        if (!save) {
            throw new BadRequestException('no se guardó en la base de datos')
        }

        const carrito = await this.carritoRepository.find({
            where: {user: {id: userId}},
            relations: {user: true}
        })

        await Promise.all(
            carrito.map(async(shelter)=> {
                await this.carritoRepository.remove(shelter)
            })
        )
        

        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderdetails: true
            },
        })
    }


    async addOrderPendiente(order: CarritoPendienteDto, userId: any) {
        const price = Number(order.price);

        const user = await this.usersRepository.findOne({where: {id: userId},
        relations:{carrito: true}
    });

    let carrito = await this.carritoRepository.findOne({ where: { shelter_id: order.shelter_id } });

    if (carrito) {
        carrito.price = Number(carrito.price) + price;
        await this.carritoRepository.save(carrito)
    }else{
        const newCarrito = new CarritoPendienteEntity()
        newCarrito.price = price;
        newCarrito.shelter_id = order.shelter_id;
        await this.carritoRepository.save(newCarrito)

        user.carrito.push(newCarrito)
    }

        await this.usersRepository.save(user)


        return user
    }

    async getCarritoShelter(){
        const order = await this.ordersRepository.find({
            relations: {
                orderdetails: {
                    shelters: true
                },
            },
        })
        return order;
    }

}
