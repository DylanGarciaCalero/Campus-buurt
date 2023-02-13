import { Test, TestingModule } from '@nestjs/testing';
import { EducationalProgramsResolver } from './educational-programs.resolver';
import { EducationalProgramsService } from './educational-programs.service';

describe('EducationalProgramsResolver', () => {
  let resolver: EducationalProgramsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalProgramsResolver, EducationalProgramsService],
    }).compile();

    resolver = module.get<EducationalProgramsResolver>(EducationalProgramsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
