import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { Invitation } from './entities/invitation.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationsRepository: Repository<Invitation>,
  ) {}

  async findAll(): Promise<Invitation[]> {
    return await this.invitationsRepository.find({
      relations: ['organisation'],
    });
  }

  async findAllByType(type: string): Promise<Invitation[]> {
    return await this.invitationsRepository.find({
      where: {
        type,
      },
      relations: ['organisation'],
    });
  }

  async findOneByOrganisation(organisationId: number): Promise<Invitation> {
    return await this.invitationsRepository.findOneOrFail({
      where: {
        organisationId,
      },
      relations: ['organisation'],
    });
  }

  async findOne(id: number): Promise<Invitation> {
    return await this.invitationsRepository.findOneOrFail(id, {
      relations: ['organisation'],
    });
  }

  async createInvitation(
    createInvitationInput: CreateInvitationInput,
  ): Promise<Invitation> {
    const invitation = this.invitationsRepository.create(createInvitationInput);
    return await this.invitationsRepository.save(invitation);
  }

  async updateInvitation(
    id: number,
    updateInvitationInput: UpdateInvitationInput,
  ): Promise<Invitation> {
    const invitation = await this.invitationsRepository.findOneOrFail(id);
    this.invitationsRepository.merge(invitation, updateInvitationInput);
    return await this.invitationsRepository.save(invitation);
  }

  async deleteInvitation(id: number): Promise<Invitation> {
    const invitation = await this.invitationsRepository.findOneOrFail(id);
    return await this.invitationsRepository.remove(invitation);
  }
}
