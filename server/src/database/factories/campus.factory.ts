import { Campus } from 'src/campus/entities/campus.entity';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { define, factory } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

define(Campus, (faker: any) => {
  const campus = new Campus();
  campus.name = faker.company.companyName();
  campus.description = faker.company.catchPhrase();
  campus.initiatives = factory(Initiative)().createMany(1) as any;
  campus.address = faker.address.streetAddress();
  campus.password = bcrypt.hash('Campus-123', 10);
  campus.phone = faker.phone.phoneNumber();
  campus.email = faker.internet.email();
  campus.website = faker.internet.url();
  campus.longitude = parseFloat(
    (Math.random() * (3.77592 - 3.66147) + 3.66147).toFixed(6),
  );
  campus.latitude = parseFloat(
    (Math.random() * (51.0273 - 51.09374) + 51.09374).toFixed(6),
  );
  return campus;
});
