import { Media } from 'src/media/entities/media.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateMedia implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Media)().createMany(5);
  }
}
