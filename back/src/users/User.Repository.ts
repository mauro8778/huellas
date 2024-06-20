import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entidades/users.entity";
import { MailService } from "src/mails/mail.service";
import { Repository } from "typeorm";
import * as cron from 'node-cron';
import { ShelterEntity } from "src/entidades/shelter.entity";
import { PetsEntity } from "src/entidades/pets.entity";
import axios from "axios";
import { MapsService } from "src/maps/maps.service";


@Injectable()
export class UserRepository {
  private readonly logger = new Logger(MailService.name);
  constructor(@InjectRepository(UserEntity)
  private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ShelterEntity)
    private readonly sheltersRepository: Repository<ShelterEntity>,
    @InjectRepository(PetsEntity)
    private readonly petsRepository: Repository<PetsEntity>,
    private readonly mailService: MailService,
    private readonly mapsservice: MapsService) { }

  async getUsers() {
    const users = await this.usersRepository.find({
      relations: ['pets', 'favorite_shelters', 'favorite_pets', 'orders']
    });

    if (users.length === 0) {
      throw new NotFoundException('No existen usuarios');
    }

    return users;
  }

  async getOrders(userId: string) {
    const User: UserEntity[] = await this.usersRepository.find({
      where: { id: userId },
      relations: {
        orders: true
      }
    })
    if (!User) {
      throw new NotFoundException('Se necesita estar iniciado sesión para historial de donaciones')
    }

    return User
  }

  async getUserPetById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id },
      relations: {
        pets: true
      },})
    if (!user) {
      throw new NotFoundException('no se encontro el usuario')
    }

    const pets = user.pets

    return pets 
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id },
      relations: ['favorite_pets', 'favorite_shelters', 'orders', 'pets'],})
    if (!user) {
      throw new NotFoundException('no se encontro el usuario')
    }
    return user 
  }
  async updatedProfile(id: string, user: Partial<UserEntity>) {
    const updateUser = await this.usersRepository.findOne({ where: { id } });
    if (!updateUser) {

      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    await this.usersRepository.merge(updateUser, user);
    await this.usersRepository.save(updateUser);

    return ` el usuario con id ${id}  y nombre ${updateUser.name} se ah actualizado con exito`;
  }

  async deleteUser(id: string) {
    const deleteUser = await this.usersRepository.findOne({
      where: { id },
    });
    if (!deleteUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    if (deleteUser.isActive === false) {
      throw new NotFoundException('el usuario ya no existe')
    }
    deleteUser.isActive = false;

    return this.usersRepository.save(deleteUser);
  }
  async activeUsers(id: string) {
    const activeUser = await this.usersRepository.findOne({
      where: { id },
    });
    if (!activeUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    if (activeUser.isActive === true) {
      throw new NotFoundException('el usuario ya esta activo')
    }
    activeUser.isActive = true;

    return this.usersRepository.save(activeUser);
  }

  async addShelterFavorite(id: string, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorite_shelters']
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const shelter = await this.sheltersRepository.findOneBy({ id });

    if (!shelter) {
      throw new NotFoundException(`No se encontró el refugio`);
    }

    user.favorite_shelters.push(shelter);

    await this.usersRepository.save(user);


    return "Añadido a Favoritos";
  }

  async addPetFavorite(petId: string, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorite_pets']
    });

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario`);
    }

    const pet: PetsEntity = await this.petsRepository.findOneBy({ id: petId });

    if (!pet) {
      throw new NotFoundException(`No se encontró el refugio`);
    }

    user.favorite_pets.push(pet);

    await this.usersRepository.save(user);

    return "Añadido a Favoritos";
  }


  async getFavorites() {
    const Users: UserEntity[] = await this.usersRepository.find({
      relations: {
        favorite_pets: true,
        favorite_shelters: true
      }
    })

    if (!Users) {
      throw new NotFoundException(`No hay favoritos`);
    }

    return Users;
  }


  async PutPetFavorite(petId: any, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException("Usuario no encontrado")
    }

    user.favorite_pets = user.favorite_pets.filter((pet) => pet.id != petId);

    await this.usersRepository.save(user);

    return "Mascota eliminada de favoritos";
  }


  async PutShelterFavorite(shelterId: any, userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException("Usuario no encontrado")
    }

    user.favorite_shelters = user.favorite_shelters.filter((shelter) => shelter.id != shelterId);

    await this.usersRepository.save(user);


    return "Refugio eliminado de favoritos";

  }

  async adminUsers(id: string, accessToken) {

    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('no se encontro usuario')
    }
    const auth0Domain = process.env.AUTH0_DOMAIN;

    const userResponse = await axios.get(
      `https://${auth0Domain}/api/v2/users-by-email`,
      {
        params: { email: user.email },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (userResponse.data.length === 0) {
      throw new Error('User not found');
    }
    const userId = userResponse.data[0].user_id;
    const current=userResponse.data[0].user_metadata || {}
    const role=current.roles || {}

    let newRoles;
    
    if (role.includes('Admin')) {
    
      newRoles = ['User'];
    } else {
     
      newRoles = ['Admin'];
    }
    try {
      await axios.patch(
        `https://${auth0Domain}/api/v2/users/${userId}`,
        {
          user_metadata: { roles: newRoles },
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
    }
    catch (error) {
      if (error.response) {

        console.error('Error de respuesta del servidor:', error.response.data);
        console.error('Estado de la respuesta:', error.response.status);
        console.error('Encabezados de la respuesta:', error.response.headers);
      } else if (error.request) {

        console.error('No se recibió respuesta del servidor:', error.request);
      } else {

        console.error('Error durante la configuración de la solicitud:', error.message);
      }
      throw new Error('Error al actualizar el rol del usuario en Auth0');
    }
  }

  async getLocation(userId: string) {

    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('usuario no encontrado')
    }
    const location = user.location

    const geocode = await this.mapsservice.geocodeShelterAddress(location)

    if (!geocode || !geocode.lat || !geocode.lon || !geocode.display_name) {
      throw new Error('Datos de geocodificación no válidos');
    }

    const shelters = await this.sheltersRepository.find()

    const userLocation = { lat: geocode.lat, lon: geocode.lon, display_name: geocode.display_name }

    const shelterLocation = shelters.map(shelter => ({
      lat: shelter.lat,
      lon: shelter.lon,
      name: shelter.display_name
    }))

    console.log(shelterLocation)

    return { userLocation, shelterLocation }
  }

}