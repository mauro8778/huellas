import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { MailService } from 'src/mails/mail.service';
import { Repository } from 'typeorm';

@Injectable()
export class ShelterRepository {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @InjectRepository(ShelterEntity)
    private readonly sheltersRepository: Repository<ShelterEntity>,
    private readonly mailService: MailService,
  ) {}

  async getShelters() {
    const shelters = await this.sheltersRepository.find({
      relations: {
        pets: true,
      },
    });

    if (shelters.length === 0) {
      throw new NotFoundException('no existen usuarios');
    }

    return shelters;
  }

  async ActiveShelter(id: string, accessToken) {
    const shelter = await this.sheltersRepository.findOne({ where: { id } });

    if (!shelter) {
      throw new NotFoundException('no existe refugio');
    }
    if (shelter.isActive === true) {
      throw new NotFoundException('el refugio ya esta activo');
    }

    shelter.isActive = true;

    const auth0Domain = process.env.AUTH0_DOMAIN;
    const token = accessToken;

    const userResponse = await axios.get(
      `https://${auth0Domain}/api/v2/users-by-email`,
      {
        params: { email: shelter.email },
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (userResponse.data.length === 0) {
      throw new Error('User not found');
    }

    const userId = userResponse.data[0].user_id;

    try {
      await axios.patch(
        `https://${auth0Domain}/api/v2/users/${userId}`,
        {
          user_metadata: { roles: ['Shelter'] },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error('Error updating user role:', error);
    }

    await this.mailService.sendShelterActivationMail(
      shelter.email,
      shelter.shelter_name,
    );

    const UpdateShelter = this.sheltersRepository.save(shelter);

    return UpdateShelter;
  }

  async getShelterById(id: string) {
    const shelter = await this.sheltersRepository.findOne({
      where: { id },
      relations: {
        pets: true,
      }
    });
    if (!shelter) {
      throw new NotFoundException('no se encontro el refugio');
    }
    return { shelter };
  }


  async getShelterByIdnew(id: string) {
    const shelter = await this.sheltersRepository.findOne({
      where: { id },
      relations: {
        pets: true,
      }
    });
    if (!shelter) {
      throw new NotFoundException('no se encontro el refugio');
    }
    return { shelter };
  }


  async deleteShelter(id: string, accessToken) {
    const deleteShelter = await this.sheltersRepository.findOne({
      where: { id },
    });

    if (!deleteShelter) {
      throw new NotFoundException(`no se encontró el refugio con id ${id}`);
    }

    if (deleteShelter.isActive === false) {
      throw new NotFoundException('el refugio no está activo');
    }

    const auth0Domain = process.env.AUTH0_DOMAIN;
    deleteShelter.isActive = false;

    try {
      const userResponse = await axios.get(
        `https://${auth0Domain}/api/v2/users-by-email`,
        {
          params: { email: deleteShelter.email },
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      if (userResponse.data.length === 0) {
        throw new Error('User not found');
      }

      const userId = userResponse.data[0].user_id;

      await axios.patch(
        `https://${auth0Domain}/api/v2/users/${userId}`,
        {
          user_metadata: { roles: ['User'] },
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      await this.mailService.deleteshelterMail(
        deleteShelter.email,
        deleteShelter.shelter_name,
      );

      return this.sheltersRepository.save(deleteShelter);
    } catch (error) {
      console.error('Error during shelter deletion:', error.message);
      throw new Error('Failed to delete shelter and update user roles');
    }
  }

  async updatedProfile(id: string, shelter: Partial<ShelterEntity>) {
    const updateShelter = await this.sheltersRepository.findOne({
      where: { id },
    });
    if (!updateShelter) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    await this.sheltersRepository.merge(updateShelter, shelter);
    await this.sheltersRepository.save(updateShelter);

    return ` el usuario con id ${id}  y nombre ${updateShelter.name} se ah actualizado con exito`;
  }

  async filterShelters(exotic_animals?: string, address?: string) {
    const conditions: any = { isActive: true };

    if (exotic_animals) {
      conditions.exotic_animals = exotic_animals;
    }
    if (address) {
      conditions.address = address;
    }

    return await this.sheltersRepository.find({ where: conditions });
  }

  async adminShelter(id: string, accessToken) {
    const shelter = await this.sheltersRepository.findOne({ where: { id } });

    if (!shelter) {
      throw new NotFoundException('no se encontro usuario');
    }

    const auth0Domain = process.env.AUTH0_DOMAIN;

    const userResponse = await axios.get(
      `https://${auth0Domain}/api/v2/users-by-email`,
      {
        params: { email: shelter.email },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (userResponse.data.length === 0) {
      throw new Error('User not found');
    }

    const userId = userResponse.data[0].user_id;

    try {
      await axios.patch(
        `https://${auth0Domain}/api/v2/users/${userId}`,
        {
          user_metadata: { roles: ['Admin'] },
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  }
}
