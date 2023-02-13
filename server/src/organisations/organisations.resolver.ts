import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganisationsService } from './organisations.service';
import { Organisation } from './entities/organisation.entity';
import { CreateOrganisationInput } from './dto/create-organisation.input';
import { UpdateOrganisationInput } from './dto/update-organisation.input';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ParseIntPipe } from '@nestjs/common';
import Role from 'src/users/role.enum';

@Resolver(() => Organisation)
export class OrganisationsResolver {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Query(() => [Organisation], { name: 'organisations' })
  getAllOrganisations(): Promise<Organisation[]> {
    return this.organisationsService.findAll();
  }

  @Query(() => Organisation, { name: 'organisationById' })
  findOneById(
    @Args('id', { type: () => Int }, new ParseIntPipe())
    id: number,
  ): Promise<Organisation> {
    return this.organisationsService.findOneById(id);
  }

  @Query(() => Organisation, { name: 'organisation' })
  findOne(
    @Args('email')
    email: string,
  ): Promise<Organisation> {
    return this.organisationsService.findOne(email);
  }

  @Mutation(() => Organisation, { name: 'deleteOrganisation' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation)
  deleteOrganisation(
    @Args('id', { type: () => Int }, new ParseIntPipe())
    id: number,
  ): Promise<Organisation> {
    return this.organisationsService.softRemoveOrganisation(id);
  }

  @Mutation(() => Organisation)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Organisation)
  updateOrganisation(
    @Args('id', { type: () => Int }, new ParseIntPipe())
    id: number,
    @Args('updateOrganisationInput')
    updateOrganisationInput: UpdateOrganisationInput,
  ): Promise<Organisation> {
    return this.organisationsService.updateOrganisation(
      id,
      updateOrganisationInput,
    );
  }

  @Mutation(() => Organisation)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.User)
  createOrganisation(
    @Args('createOrganisationInput')
    createOrganisationInput: CreateOrganisationInput,
  ): Promise<Organisation> {
    return this.organisationsService.create(createOrganisationInput);
  }
}
