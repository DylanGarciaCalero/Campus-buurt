import { Test, TestingModule } from '@nestjs/testing';
import { CampusResolver } from './campus.resolver';
import { CampusService } from './campus.service';

describe('CampusResolver', () => {
  let resolver: CampusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampusResolver, CampusService],
    }).compile();

    resolver = module.get<CampusResolver>(CampusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
