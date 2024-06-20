import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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

  async function geocodeShelterAddress(address: string): Promise<any> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          'User-Agent': 'HuellasApp/3.0 (contact@huellasapp.com)',
        },
      });
  
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }
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
  }}

  async updateShelterGeocode(shelterId: string, address:string): Promise<any> {
    try {
      const shelter = await this.shelterRepository.findOne({where:{id:shelterId}});

      if (!shelter) {
        throw new NotFoundException('Refugio no encontrado');
      }

      const geocodeData = await this.geocodeShelterAddress(address);

      if (!geocodeData || !geocodeData.lat || !geocodeData.lon || !geocodeData.display_name) {
        throw new Error('Datos de geocodificación no válidos');
      }

      shelter.address = address;
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
