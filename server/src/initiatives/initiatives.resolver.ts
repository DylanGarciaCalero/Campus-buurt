import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InitiativesService } from './initiatives.service';
import { Initiative } from './entities/initiative.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import Role from 'src/users/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateInitiativeInput } from './dto/create-initiative.input';
import { UpdateInitiativeInput } from './dto/update-initiative.input';

@Resolver(() => Initiative)
export class InitiativesResolver {
  constructor(private readonly initiativesService: InitiativesService) {}

  @Query(() => [Initiative], { name: 'initiatives' })
  findAll(): Promise<Initiative[]> {
    return this.initiativesService.findAll();
  }

  @Query(() => Initiative, { name: 'initiative' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Initiative> {
    return this.initiativesService.findOne(id);
  }

  @Query(() => [Initiative], { name: 'initiativesAccepted' })
  findAllAccepted(): Promise<Initiative[]> {
    return this.initiativesService.findAllAccepted();
  }

  @Query(() => [Initiative], { name: 'initiativesNotAccepted' })
  findAllNotAccepted(): Promise<Initiative[]> {
    return this.initiativesService.findAllNotAccepted();
  }

  @Query(() => [Initiative], { name: 'initiativesByCategory' })
  findAllByCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ): Promise<Initiative[]> {
    return this.initiativesService.findAllByCategory(categoryId);
  }

  @Mutation(() => Initiative)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Campus, Role.Member, Role.Organisation)
  createInitiative(
    @Args('createInitiativeInput') createInitiativeInput: CreateInitiativeInput,
  ): Promise<Initiative> {
    return this.initiativesService.createInitiative(createInitiativeInput);
  }

  @Mutation(() => Initiative)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Member, Role.Organisation)
  updateInitiative(
    @Args('updateInitiativeInput') updateInitiativeInput: UpdateInitiativeInput,
  ): Promise<Initiative> {
    return this.initiativesService.updateInitiative(
      updateInitiativeInput.id,
      updateInitiativeInput,
    );
  }

  @Mutation(() => Initiative, { name: 'deleteInitiatve' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  deleteInitiative(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Initiative> {
    return this.initiativesService.softRemoveInitiative(id);
  }
}
