import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInitiativeInput } from './dto/create-initiative.input';
import { UpdateInitiativeInput } from './dto/update-initiative.input';
import { Initiative } from './entities/initiative.entity';

@Injectable()
export class InitiativesService {
  constructor(
    @InjectRepository(Initiative)
    private initiativesRepository: Repository<Initiative>,
  ) {}

  async findAll(): Promise<Initiative[]> {
    return await this.initiativesRepository.find({
      relations: ['campuses', 'organisation', 'category', 'media'],
    });
  }

  async findOne(id: number): Promise<Initiative> {
    return await this.initiativesRepository.findOneOrFail(id, {
      relations: ['campuses', 'organisation', 'category', 'media'],
    });
  }

  async findAllAccepted(): Promise<Initiative[]> {
    return await this.initiativesRepository.find({
      where: {
        accepted: true,
      },
      relations: ['campuses', 'organisation', 'category', 'media'],
    });
  }

  async findAllNotAccepted(): Promise<Initiative[]> {
    return await this.initiativesRepository.find({
      where: {
        accepted: false,
      },
      relations: ['campuses', 'organisation', 'category', 'media'],
    });
  }

  async findAllByCategory(categoryId: number): Promise<Initiative[]> {
    return await this.initiativesRepository.find({
      where: { categoryId },
      relations: ['campuses', 'organisation', 'category', 'media'],
    });
  }

  async createInitiative(
    createInitiativeInput: CreateInitiativeInput,
  ): Promise<Initiative> {
    const initiative = this.initiativesRepository.create(createInitiativeInput);
    return await this.initiativesRepository.save(initiative);
  }

  async updateInitiative(
    id: number,
    updateInitiativeInput: UpdateInitiativeInput,
  ): Promise<Initiative> {
    const updatedInitiative = await this.initiativesRepository.preload({
      id: id,
      ...updateInitiativeInput,
    });

    return this.initiativesRepository.save(updatedInitiative);
  }

  async softRemoveInitiative(id: number): Promise<Initiative> {
    const initiative = await this.initiativesRepository.findOne(id);
    return this.initiativesRepository.softRemove(initiative);
  }
}
