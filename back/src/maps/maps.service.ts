import { HttpException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';


@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(ShelterEntity)
    private shelterRepository: Repository<ShelterEntity>,
    private readonly configService: ConfigService,
  
  
    
  ) {}

  async geocodeShelterAddress(address: string): Promise<any> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          'User-Agent': 'HuellasApp/1.0 (contacto@huellasapp.com)', 
        },
      });
      if (response.status !== 200) {
        throw new HttpException(`Request failed with status code ${response.status}`, response.status);
      }

      const data = response.data;
      if (!data || data.length === 0) {
        throw new HttpException('No se encontraron resultados para la dirección especificada', 404);
      }

      const location = data[0];
      return {
        lat: location.lat,
        lon: location.lon,
        display_name: location.display_name,
      };
    } catch (error) {
      console.error('Error geocoding address:', error.message);
      throw new HttpException(`Error al geocodificar la dirección: ${error.message}`, error.response?.status || 500);
    }
  }

  

  
  
}
