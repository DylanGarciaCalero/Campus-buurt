import { Campus } from 'src/campus/entities/campus.entity';
import { CollabInvite } from 'src/collab-invites/entities/collab-invite.entity';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { define, factory } from 'typeorm-seeding';

define(CollabInvite, (faker: any) => {
  const collabInvite = new CollabInvite();
  collabInvite.initiative = factory(Initiative)() as any;
  collabInvite.campusId = factory(Campus)() as any;

  return collabInvite;
});
