import { Category } from 'src/categories/entities/category.entity';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Organisation } from 'src/organisations/entities/organisation.entity';
import { define, factory } from 'typeorm-seeding';

define(Initiative, (faker: any) => {
  const initiative = new Initiative();
  initiative.category = factory(Category)() as any;
  initiative.organisation = factory(Organisation)() as any;
  initiative.name = faker.company.companyName();
  initiative.description = faker.lorem.paragraph();
  initiative.accepted = true;
  initiative.date = faker.date.future();

  return initiative;
});
