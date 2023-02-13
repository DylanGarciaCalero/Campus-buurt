import { Test, TestingModule } from '@nestjs/testing';
import { InitiativesResolver } from './initiatives.resolver';
import { InitiativesService } from './initiatives.service';

describe('InitiativesResolver', () => {
  let resolver: InitiativesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitiativesResolver, InitiativesService],
    }).compile();

    resolver = module.get<InitiativesResolver>(InitiativesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
