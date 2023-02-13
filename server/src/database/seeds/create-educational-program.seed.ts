import { EducationalProgram } from 'src/educational-programs/entities/educational-program.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class createEducationalProgram implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(EducationalProgram)().createMany(5);
  }
}
