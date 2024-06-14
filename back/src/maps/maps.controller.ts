import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

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

  @Get('geocode/:shelterId')
  async geocodeShelterById(@Param('shelterId') shelterId: string) {
    console.log('Recibida solicitud para geocodificar refugio por ID:', shelterId);

    try {
      const geocodeData = await this.mapsService.updateShelterGeocode(shelterId);
      return { message: 'Geocodificación actualizada correctamente.', ...geocodeData };
    } catch (error) {
      console.error('Error al actualizar la geocodificación:', error);
      throw new NotFoundException(error.message);
    }
  }
}
