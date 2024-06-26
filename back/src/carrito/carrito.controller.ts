import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ShelterOrderDto } from 'src/dto/shelterOrderDto';
import { CarritoPendienteDto } from 'src/dto/Carrito.dto';

@ApiTags("Carrito")
@Controller('carrito')
export class CarritoController {
    constructor(private readonly carritoServices: CarritoService){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    getCarritoId(@Req() request){

        const userId = request.user['https://huellasdesperanza.com/userID'];



        return this.carritoServices.getCarrito(userId)
    }

    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('add')
    addOrderPendiente(@Body() order: CarritoPendienteDto,  @Req() request){

        const userId = request.user['https://huellasdesperanza.com/userID'];


        return this.carritoServices.addOrderPendiente(order, userId)
    }
    

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    addOrder(@Body() order: ShelterOrderDto[],  @Req() request){

        const userId = request.user['https://huellasdesperanza.com/userID'];


        return this.carritoServices.addOrder(order, userId)
    }


    @Get("order/:id")
    getOrder(@Param("id", ParseUUIDPipe) id: string){
        return this.carritoServices.getOrder(id);
    }

}


