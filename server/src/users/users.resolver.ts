import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import Role from './role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'admins' })
  findAllAdmins() {
    return this.usersService.findAllAdmins();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Query(() => User, { name: 'userById' })
  findOneById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  deleteUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.softRemoveUser(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }
}
