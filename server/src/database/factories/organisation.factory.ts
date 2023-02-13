import { Organisation } from 'src/organisations/entities/organisation.entity';
import { define } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

define(Organisation, (faker: any) => {
  const organisation = new Organisation();
  organisation.name = faker.company.companyName();
  organisation.description = faker.company.catchPhrase();
  organisation.address = faker.address.streetAddress();
  organisation.email = faker.internet.email();
  organisation.password = bcrypt.hash('Organisation-123', 10);
  organisation.instagram = faker.lorem.word();
  organisation.facebook = faker.lorem.word();
  organisation.twitter = faker.lorem.word();
  organisation.youtube = faker.lorem.word();
  organisation.phone = faker.phone.phoneNumber();
  organisation.longitude = parseFloat(
    (Math.random() * (3.77592 - 3.66147) + 3.66147).toFixed(6),
  );
  organisation.latitude = parseFloat(
    (Math.random() * (51.0273 - 51.09374) + 51.09374).toFixed(6),
  );
  organisation.website = faker.internet.url();
  organisation.logo = 'https://picsum.photos/300/300';
  organisation.role = 'Organisation';

  return organisation;
});
