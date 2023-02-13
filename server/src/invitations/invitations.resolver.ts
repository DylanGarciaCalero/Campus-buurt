import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvitationsService } from './invitations.service';
import { Invitation } from './entities/invitation.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import Role from 'src/users/role.enum';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver(() => Invitation)
export class InvitationsResolver {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Query(() => [Invitation], { name: 'invitations' })
  findAll() {
    return this.invitationsService.findAll();
  }

  @Query(() => Invitation, { name: 'invitation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.invitationsService.findOne(id);
  }

  @Query(() => [Invitation], { name: 'invitationsByType' })
  findAllByType(@Args('type') type: string) {
    return this.invitationsService.findAllByType(type);
  }

  @Query(() => Invitation, { name: 'invitationByOrganisation' })
  findOneByOrganisation(
    @Args('organisationId', { type: () => Int }) organisationId: number,
  ) {
    return this.invitationsService.findOneByOrganisation(organisationId);
  }

  @Mutation(() => Invitation)
  createInvitation(
    @Args('createInvitationInput') createInvitationInput: CreateInvitationInput,
  ) {
    return this.invitationsService.createInvitation(createInvitationInput);
  }

  @Mutation(() => Invitation)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation, Role.Member)
  updateInvitation(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updateInvitationInput: UpdateInvitationInput,
  ): Promise<Invitation> {
    return this.invitationsService.updateInvitation(id, updateInvitationInput);
  }

  @Mutation(() => Invitation, { name: 'deleteInvitation' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation, Role.Member)
  removeInvitation(@Args('id', { type: () => Int }) id: number) {
    return this.invitationsService.deleteInvitation(id);
  }
}
