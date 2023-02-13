import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CollabInvitesService } from './collab-invites.service';
import { CollabInvite } from './entities/collab-invite.entity';
import { CreateCollabInviteInput } from './dto/create-collab-invite.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import Role from 'src/users/role.enum';

@Resolver(() => CollabInvite)
export class CollabInvitesResolver {
  constructor(private readonly collabInvitesService: CollabInvitesService) {}

  @Query(() => [CollabInvite], { name: 'collabInvites' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation, Role.Member)
  findAll() {
    return this.collabInvitesService.findAll();
  }

  @Query(() => CollabInvite, { name: 'collabInvite' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation, Role.Member)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.collabInvitesService.findOne(id);
  }

  @Query(() => [CollabInvite], { name: 'collabInvitesForOrganisation' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation, Role.Member)
  async findAllForOrganisation(
    @Args('organisationId', { type: () => Int }) organisationId: number,
  ) {
    return this.collabInvitesService.findAllForOrganisation(organisationId);
  }

  @Mutation(() => CollabInvite)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Campus, Role.Organisation, Role.Member)
  createCollabInvite(
    @Args('createCollabInviteInput')
    createCollabInviteInput: CreateCollabInviteInput,
  ) {
    return this.collabInvitesService.createCollabInvite(
      createCollabInviteInput,
    );
  }

  @Mutation(() => CollabInvite, { name: 'deleteCollabInvite' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation, Role.Member)
  removeCollabInvite(@Args('id', { type: () => Int }) id: number) {
    return this.collabInvitesService.deleteCollabInvite(id);
  }
}
