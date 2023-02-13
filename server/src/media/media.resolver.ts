import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import Role from 'src/users/role.enum';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => Media)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediaService.createMedia(createMediaInput);
  }

  @Query(() => [Media], { name: 'medias' })
  findAll() {
    return this.mediaService.findAll();
  }

  @Query(() => Media, { name: 'media' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Media)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Member, Role.Organisation)
  updateMedia(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateMediaInput') updateMediaInput: UpdateMediaInput,
  ) {
    return this.mediaService.updateMedia(id, updateMediaInput);
  }

  @Mutation(() => Media)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Campus, Role.Member, Role.Organisation)
  removeMedia(@Args('id', { type: () => Int }) id: number) {
    return this.mediaService.deleteMedia(id);
  }
}
