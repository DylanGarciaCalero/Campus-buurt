import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollabInviteInput } from './dto/create-collab-invite.input';
import { CollabInvite } from './entities/collab-invite.entity';

@Injectable()
export class CollabInvitesService {
  constructor(
    @InjectRepository(CollabInvite)
    private collabInvitesRepository: Repository<CollabInvite>,
  ) {}

  async findAll(): Promise<CollabInvite[]> {
    return await this.collabInvitesRepository.find({
      relations: ['campus', 'initiative', 'initiative.organisation'],
    });
  }

  async findAllForOrganisation(
    organisationId: number,
  ): Promise<CollabInvite[]> {
    return await this.collabInvitesRepository.find({
      where: {
        initiative: {
          organisation: {
            id: organisationId,
          },
        },
      },
      relations: ['campus', 'initiative', 'initiative.organisation'],
    });
  }

  async findOne(id: number): Promise<CollabInvite> {
    return await this.collabInvitesRepository.findOneOrFail(id, {
      relations: ['campus', 'initiative', 'initiative.organisation'],
    });
  }

  async createCollabInvite(
    createCollabInviteInput: CreateCollabInviteInput,
  ): Promise<CollabInvite> {
    const collabInvite = this.collabInvitesRepository.create(
      createCollabInviteInput,
    );
    return await this.collabInvitesRepository.save(collabInvite);
  }

  async deleteCollabInvite(id: number): Promise<CollabInvite> {
    const collabInvite = await this.collabInvitesRepository.findOneOrFail(id);
    return await this.collabInvitesRepository.remove(collabInvite);
  }
}
