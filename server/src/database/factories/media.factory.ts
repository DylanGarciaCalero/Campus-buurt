import { Campus } from 'src/campus/entities/campus.entity';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Media } from 'src/media/entities/media.entity';
import { Organisation } from 'src/organisations/entities/organisation.entity';
import { define, factory } from 'typeorm-seeding';

define(Media, (faker: any) => {
  const media = new Media();
  media.campus = factory(Campus)() as any;
  media.organisation = factory(Organisation)() as any;
  media.initiative = factory(Initiative)() as any;
  media.name = faker.company.companyName();
  media.type = 'image';
  media.url = 'https://picsum.photos/400/300';
  return media;
});
