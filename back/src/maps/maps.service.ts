import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShelterEntity } from 'src/entidades/shelter.entity';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(ShelterEntity)
    private shelterRepository: Repository<ShelterEntity>,
  ) {}

  async geocodeShelterAddress(address: string): Promise<any> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          limit: 1,
          countrycodes: 'ar',  
          viewbox: '-61.084171,-41.321321,-56.804462,-34.020882', 
        },
      });

      if (response.data.length === 0) {
        throw new NotFoundException('No se encontraron resultados para la dirección especificada.');
      }

      const location = response.data[0];
      return {
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
        display_name: location.display_name,
      };

      
    } catch (error) {
      throw new Error(`Error al geocodificar la dirección: ${error.message}`);
    }
  }

  async updateShelterGeocode(shelterId: string): Promise<any> {
    try {
      const shelter = await this.shelterRepository.findOne({where:{id:shelterId}});

      if (!shelter) {
        throw new NotFoundException('Refugio no encontrado');
      }

      const geocodeData = await this.geocodeShelterAddress(shelter.address);

      shelter.lat = geocodeData.lat.toString();
      shelter.lon = geocodeData.lon.toString();
      shelter.display_name = geocodeData.display_name;

      await this.shelterRepository.save(shelter);

      return geocodeData; 
    } catch (error) {
      throw new Error(`Error al actualizar la geocodificación del refugio: ${error.message}`);
    }
  }
}
