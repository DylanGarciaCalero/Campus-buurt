import { Module } from '@nestjs/common';
import { Invitation } from './entities/invitation.entity';
import { InvitationsService } from './invitations.service';
import { InvitationsResolver } from './invitations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
  providers: [InvitationsResolver, InvitationsService],
})
export class InvitationsModule {}
