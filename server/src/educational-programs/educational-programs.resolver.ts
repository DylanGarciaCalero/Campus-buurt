import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import Role from 'src/users/role.enum';
import { CreateEducationalProgramInput } from './dto/create-educational-program.input';
import { UpdateEducationalProgramInput } from './dto/update-educational-program.input';
import { EducationalProgramsService } from './educational-programs.service';
import { EducationalProgram } from './entities/educational-program.entity';

@Resolver(() => EducationalProgram)
export class EducationalProgramsResolver {
  constructor(
    private readonly educationalProgramsService: EducationalProgramsService,
  ) {}

  @Query(() => [EducationalProgram], { name: 'educationalPrograms' })
  findAll() {
    return this.educationalProgramsService.findAll();
  }

  @Query(() => EducationalProgram, { name: 'educationalProgram' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.educationalProgramsService.findOne(id);
  }

  @Query(() => EducationalProgram, { name: 'educationalProgramById' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.educationalProgramsService.findOneById(id);
  }

  @Mutation(() => EducationalProgram, { name: 'createEducationalProgram' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  create(
    @Args('createEducationalProgramInput')
    createEducationalProgramInput: CreateEducationalProgramInput,
  ) {
    return this.educationalProgramsService.create(
      createEducationalProgramInput,
    );
  }

  @Mutation(() => EducationalProgram, { name: 'updateProgram' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  update(
    @Args('updateEducationalProgramInput')
    updateEducationalProgramInput: UpdateEducationalProgramInput,
  ) {
    return this.educationalProgramsService.update(
      updateEducationalProgramInput.id,
      updateEducationalProgramInput,
    );
  }

  @Mutation(() => EducationalProgram, { name: 'deleteProgram' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  delete(@Args('id', { type: () => Int }) id: number) {
    return this.educationalProgramsService.softRemoveProgram(id);
  }
}
