import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Organisation } from 'src/organisations/entities/organisation.entity';
import { User } from 'src/users/entities/user.entity';
import { define, factory } from 'typeorm-seeding';

enum Role {
  Member = 'Member',
}

define(User, (faker: any) => {
  const user = new User();
  user.organisation = factory(Organisation)() as any;
  user.initiative = factory(Initiative)() as any;
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.role = Role.Member;
  user.email = faker.internet.email();
  user.password = 'Campus-buurt123';
  return user;
});
