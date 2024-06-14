import { Controller, Post, Body, Get, Param, NotFoundException, Put, ParseUUIDPipe } from '@nestjs/common';
import { MapsService } from './maps.service';
import { UserService } from 'src/users/user.service';


@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService,
   
  ) {}

  @Post('geocode')
  async geocodeAddress(@Body() addressData: { address: string }) {
    console.log('Recibida solicitud para geocodificar dirección:', addressData.address);

    try {
      const geocodeData = await this.mapsService.geocodeShelterAddress(addressData.address);
      return { message: 'Geocodificación actualizada correctamente.', ...geocodeData };
    } catch (error) {
      console.error('Error al geocodificar la dirección:', error);
      throw new NotFoundException(error.message);
    }
  }

  @Put('geocode/:shelterId')
  async updateShelterGeocode(
    @Param('shelterId') shelterId: string,
    @Body('address') address: string
  ): Promise<any> {
    if (!address) {
      throw new NotFoundException('La dirección es requerida');
    }

    try {
      const result = await this.mapsService.updateShelterGeocode(shelterId, address);
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  }

