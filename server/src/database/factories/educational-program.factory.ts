import { Campus } from 'src/campus/entities/campus.entity';
import { EducationalProgram } from 'src/educational-programs/entities/educational-program.entity';
import { define, factory } from 'typeorm-seeding';

define(EducationalProgram, (faker: any) => {
  const educationalProgram = new EducationalProgram();
  educationalProgram.campus = factory(Campus)() as any;
  educationalProgram.programType = faker.random.arrayElement([
    'Bachelor',
    'Bachelor after Bachelor',
    'Graduate',
    'Post Graduate',
  ]);
  educationalProgram.name = faker.company.companyName();
  educationalProgram.credits = 180;
  educationalProgram.description = faker.lorem.paragraph();
  return educationalProgram;
});
