import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsResolver } from './organisations.resolver';
import { OrganisationsService } from './organisations.service';

describe('OrganisationsResolver', () => {
  let resolver: OrganisationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationsResolver, OrganisationsService],
    }).compile();

    resolver = module.get<OrganisationsResolver>(OrganisationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
