import { Module } from '@nestjs/common';
import { CollabInvitesService } from './collab-invites.service';
import { CollabInvitesResolver } from './collab-invites.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollabInvite } from './entities/collab-invite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollabInvite])],
  providers: [CollabInvitesResolver, CollabInvitesService],
})
export class CollabInvitesModule {}
