import { Category } from 'src/categories/entities/category.entity';
import { define } from 'typeorm-seeding';

define(Category, (faker: any) => {
  const category = new Category();
  category.name = faker.commerce.productAdjective();
  category.description = faker.company.catchPhrase();
  return category;
});
