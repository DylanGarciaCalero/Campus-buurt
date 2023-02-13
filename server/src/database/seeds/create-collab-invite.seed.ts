import { CollabInvite } from 'src/collab-invites/entities/collab-invite.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class createCollabInvite implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(CollabInvite)().createMany(5);
  }
}
