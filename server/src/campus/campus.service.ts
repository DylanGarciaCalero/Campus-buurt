import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InitiativesService } from 'src/initiatives/initiatives.service';
import { CreateCampusInput } from './dto/create-campus.input';
import { UpdateCampusInput } from './dto/update-campus.input';
import * as bcrypt from 'bcrypt';
import { Campus } from './entities/campus.entity';

@Injectable()
export class CampusService {
  constructor(
    @InjectRepository(Campus) private campusRepository: Repository<Campus>,
    private initiativesService: InitiativesService,
  ) {}

  async findAll(): Promise<Campus[]> {
    return await this.campusRepository.find({
      relations: [
        'initiatives',
        'educationalPrograms',
        'initiatives.organisation',
      ],
    });
  }

  async findAllWithAcceptedInitiatives(): Promise<Campus[]> {
    const data = await this.campusRepository.find({
      relations: [
        'initiatives',
        'educationalPrograms',
        'initiatives.organisation',
      ],
    });
    const campusWithAcceptedInitiative = data.map((campus) => {
      const acceptedInitiatives = campus.initiatives.filter(
        (initiative) => initiative.accepted,
      );
      campus.initiatives = acceptedInitiatives;
      return campus;
    });
    return campusWithAcceptedInitiative;
  }

  async findOne(id: number): Promise<Campus> {
    return await this.campusRepository.findOneOrFail(id, {
      relations: [
        'initiatives',
        'educationalPrograms',
        'initiatives.organisation',
      ],
    });
  }

  async findOneWithAcceptedInitiatives(id: number): Promise<Campus> {
    const data = await this.campusRepository.findOne(id, {
      relations: [
        'initiatives',
        'educationalPrograms',
        'initiatives.organisation',
      ],
    });
    const acceptedInitiatives = data.initiatives.filter(
      (initiative) => initiative.accepted,
    );
    data.initiatives = acceptedInitiatives;
    return data;
  }

  async findOneByEmail(email: string): Promise<Campus> {
    return this.campusRepository.findOneOrFail({ email });
  }

  async createCampus(createCampusInput: CreateCampusInput): Promise<Campus> {
    const newCampus = this.campusRepository.create(createCampusInput);
    newCampus.password = await bcrypt.hash(newCampus.password, 10);
    console.log(newCampus);
    return this.campusRepository.save(newCampus);
  }

  async addToCampus(campusId: number, initiativeId: number): Promise<Campus> {
    const foundCampus = await this.campusRepository.findOne(campusId, {
      relations: ['initiatives'],
    });
    const foundInitiative = await this.initiativesService.findOne(initiativeId);

    if (foundCampus && foundInitiative) {
      foundCampus.initiatives = foundCampus.initiatives
        ? [...foundCampus.initiatives, foundInitiative]
        : [foundInitiative];

      return this.campusRepository.save(foundCampus);
    } else {
      throw new Error('Campus or Initiative not found');
    }
  }

  async updateCampus(
    id: number,
    updateCampusInput: UpdateCampusInput,
  ): Promise<Campus> {
    const campus = await this.campusRepository.findOneOrFail(id);
    this.campusRepository.merge(campus, updateCampusInput);
    return await this.campusRepository.save(campus);
  }

  async softRemoveCampus(id: number): Promise<Campus> {
    const campus = await this.campusRepository.findOne(id);
    return this.campusRepository.softRemove(campus);
  }
}
