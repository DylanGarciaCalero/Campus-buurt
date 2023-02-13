import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CampusService } from './campus.service';
import { CreateCampusInput } from './dto/create-campus.input';
import { UpdateCampusInput } from './dto/update-campus.input';
import { Campus } from './entities/campus.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import Role from 'src/users/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver(() => Campus)
export class CampusResolver {
  constructor(private readonly campusService: CampusService) {}

  @Query(() => Campus, { name: 'campusAllInitiatives' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Campus> {
    return this.campusService.findOne(id);
  }

  @Query(() => [Campus], { name: 'campusesWithAcceptedInitiatives' })
  findAll(): Promise<Campus[]> {
    return this.campusService.findAll();
  }

  @Query(() => [Campus], { name: 'campuses' })
  async findAllWithAcceptedInitiatives(): Promise<Campus[]> {
    return this.campusService.findAllWithAcceptedInitiatives();
  }

  @Query(() => Campus, { name: 'campus' })
  async findOneWithAcceptedInitiatives(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Campus> {
    return this.campusService.findOneWithAcceptedInitiatives(id);
  }

  @Query(() => Campus, { name: 'campusByName' })
  findOneByEmail(@Args('email') email: string): Promise<Campus> {
    return this.campusService.findOneByEmail(email);
  }

  @Mutation(() => Campus)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  createCampus(
    @Args('createCampusInput') createCampusInput: CreateCampusInput,
  ): Promise<Campus> {
    return this.campusService.createCampus(createCampusInput);
  }

  @Mutation(() => Campus, { name: 'addInitiativeToCampus' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  addToCampus(
    @Args('campusId', { type: () => Int }) campusId: number,
    @Args('initiativeId', { type: () => Int }) initiativeId: number,
  ) {
    return this.campusService.addToCampus(campusId, initiativeId);
  }

  @Mutation(() => Campus)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  updateCampus(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updateCampusInput: UpdateCampusInput,
  ): Promise<Campus> {
    return this.campusService.updateCampus(id, updateCampusInput);
  }

  // @Mutation(() => Campus)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Campus)
  // async deleteCampus(
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<Campus> {
  //   return this.campusService.deleteCampus(id);
  // }
  @Mutation(() => Campus)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  deleteCampus(@Args('id', { type: () => Int }) id: number): Promise<Campus> {
    return this.campusService.softRemoveCampus(id);
  }
}
