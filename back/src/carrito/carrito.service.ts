import { Injectable } from '@nestjs/common';
import { CarritoRepository } from './carrito.repository';
import { ShelterOrderDto } from '../dto/shelterOrderDto';

@Injectable()
export class CarritoService {
    constructor(private carritoRepository: CarritoRepository) { }

    addOrder(order, userId: string) {
        return this.carritoRepository.addOrder(order, userId);
    }

    getOrder(id: string) {
        return this.carritoRepository.getOrder(id);
    }

    getCarrito(userId: string) {
        return this.carritoRepository.getCarrito(userId);
    }

    addOrderPendiente(order, userId: any) {
        return this.carritoRepository.addOrderPendiente(order,userId)
    }

    getCarritoShelter(){
        return this.carritoRepository.getCarritoShelter()
    }

    deleteCarritoId(id: string, userId: any) {
        return this.carritoRepository.deleteCarritoId(id, userId)
    }

    getOrdersId(userId: any) {
        return this.carritoRepository.getOrdersId(userId);
    }
}
