import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganisationInput } from './dto/create-organisation.input';
import { UpdateOrganisationInput } from './dto/update-organisation.input';
import { Organisation } from './entities/organisation.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
  ) {}

  async findAll(): Promise<Organisation[]> {
    return await this.organisationRepository.find({
      relations: ['initiatives', 'invitations'],
    });
  }

  async findOne(email: string): Promise<Organisation> {
    return await this.organisationRepository.findOne({ email });
  }

  async findOneById(id: number): Promise<Organisation> {
    return await this.organisationRepository.findOneOrFail(id, {
      relations: ['initiatives', 'invitations'],
    });
  }

  async create(
    createOrganisationInput: CreateOrganisationInput,
  ): Promise<Organisation> {
    const organisation = this.organisationRepository.create(
      createOrganisationInput,
    );
    organisation.password = await bcrypt.hash(organisation.password, 10);
    return await this.organisationRepository.save(organisation);
  }

  async updateOrganisation(
    id: number,
    updateOrganisationInput: UpdateOrganisationInput,
  ): Promise<Organisation> {
    const organisation = await this.organisationRepository.findOneOrFail(id);
    this.organisationRepository.merge(organisation, updateOrganisationInput);
    return await this.organisationRepository.save(organisation);
  }

  async softRemoveOrganisation(id: number): Promise<Organisation> {
    const organisation = await this.organisationRepository.findOneOrFail(id);
    return await this.organisationRepository.softRemove(organisation);
  }
}
