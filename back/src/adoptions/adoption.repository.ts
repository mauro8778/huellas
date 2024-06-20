import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdopcionDto } from 'src/dto/createAdopcion.dto';
import { AdoptionEntity } from 'src/entidades/adoption.entity';
import { PetsEntity } from 'src/entidades/pets.entity';
import { ShelterEntity } from 'src/entidades/shelter.entity';
import { UserEntity } from 'src/entidades/users.entity';
import { PetsService } from 'src/pets/pets.service';
import { Repository } from 'typeorm';
import * as cron from 'node-cron';
import { MailService } from 'src/mails/mail.service';
import { ShelterRepository } from 'src/shelters/shelters.repository';
@Injectable()
export class AdoptionRepository {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @InjectRepository(AdoptionEntity)
    private adoptionrepository: Repository<AdoptionEntity>,
    @InjectRepository(ShelterEntity)
    private sheltersRepository: Repository<ShelterEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(PetsEntity)
    private petsRepository: Repository<PetsEntity>,
    private petsService: PetsService,
    private readonly mailservice: MailService,
  ) {}

  async AllAdoptions() {
    const adoptions: AdoptionEntity[] = await this.adoptionrepository.find({
      relations: {
        user: true,
        pet: true,
        shelter: true,
      },
    });

    if (adoptions.length == 0) {
      throw new NotFoundException('No existen adopciones');
    }

    return adoptions;
  }

  async AdoptionsById(id: string) {
    const adoptionId: AdoptionEntity = await this.adoptionrepository.findOneBy({
      id,
    });

    if (!adoptionId) {
      throw new NotFoundException('No existe la adopción');
    }

    return adoptionId;
  }

  async newAdoption(userid: string, petid: string) {
    const user = await this.usersRepository.findOneBy({ id: userid });
    if (!user) {
      throw new BadRequestException(`Usuario no encontrado`);
    }

    const pet = await this.petsRepository.findOne({
      where: { id: petid },
      relations: ['shelter'],
    });
    if (!pet) {
      throw new BadRequestException(`Mascota no encontrada`);
    }

    const shelterId = pet.shelter.id;
    const shelter = await this.sheltersRepository.findOne({
      where: { id: shelterId },
      relations: ['pets'],
    });
    if (!shelter) {
      throw new BadRequestException(
        `Refugio no encontrado para la mascota especificada`,
      );
    }

    const adoption = new AdoptionEntity();
    adoption.date = new Date();
    adoption.user = user;
    adoption.shelter = shelter;
    adoption.pet = pet;
    adoption.isActive = false;

    const adop = await this.adoptionrepository.save(adoption);
    if (!adop) {
      throw new NotFoundException(`Error en la Adopción`);
    }

    return await this.adoptionrepository.find({
      where: { id: adoption.id },
      relations: {
        user: true,
        shelter: true,
        pet: true,
      },
    });
  }

  async activateAdoption(adoptionId: string) {
    const adoption = await this.adoptionrepository.findOne({
        where: { id: adoptionId },
        relations: ['user', 'shelter', 'pet'],
    });

    if (!adoption) {
        throw new NotFoundException(`Adopción no encontrada`);
    }

    if (!adoption.isActive) {
        const updateResult = await this.adoptionrepository.update(adoption.id, { isActive: true });
        
        if (updateResult.affected === 0) {
            throw new Error('No se pudo actualizar la adopción a activa');
        }

        const pet = await this.petsRepository.findOneBy({ id: adoption.pet.id });

        if (!pet) {
            throw new NotFoundException(`Mascota no encontrada`);
        }

        const shelter = await this.sheltersRepository.findOne({
            where: { id: adoption.shelter.id },
            relations: ['pets'],
        });

        if (!shelter) {
            throw new NotFoundException(`Refugio no encontrado`);
        }

        const user = await this.usersRepository.findOne({
            where: { id: adoption.user.id },
            relations: ['pets'],
        });

        if (!user) {
            throw new NotFoundException(`Usuario no encontrado`);
        }

        shelter.pets = shelter.pets.filter((p) => p.id !== pet.id);
        await this.sheltersRepository.save(shelter);

        user.pets.push(pet);
        await this.usersRepository.save(user);

        const updatedUser = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: ['pets'],
        });

        if (!updatedUser) {
            throw new NotFoundException(`Usuario no encontrado después de actualizar`);
        }

        await this.mailservice.confirmPostulacion(user.email,user.name,pet.name)

        return  updatedUser ;
    } else {
        return { message: "La adopción ya está activa." };
    }
}

  async Delete(id: string) {
    const adoption = await this.adoptionrepository.findOneBy({ id });
    if (!adoption) {
      throw new NotFoundException('No existe la adopción');
    }
    await this.adoptionrepository.remove(adoption);

    return `La adopción fue eliminada`;
  }

  async AdoptionUser(userid: string) {
    const user: AdoptionEntity[] = await this.adoptionrepository.find({
      where: { user: {id: userid},},
      relations: {
        pet: true
      },
    });

    return user;
  }

  async AdoptionShelter(shelterid: string) {
    const shelter: AdoptionEntity[] = await this.adoptionrepository.find({
      where: { shelter:{id: shelterid}, isActive: false},
      relations: {
        user: true,
        pet: true
      },
    });

    if (!shelter) {
      throw new NotFoundException('no hay adopciones pendientes')
    }

    return shelter;
  }
}
