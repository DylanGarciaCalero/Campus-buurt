import { Test, TestingModule } from '@nestjs/testing';
import { CollabInvitesResolver } from './collab-invites.resolver';
import { CollabInvitesService } from './collab-invites.service';

describe('CollabInvitesResolver', () => {
  let resolver: CollabInvitesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollabInvitesResolver, CollabInvitesService],
    }).compile();

    resolver = module.get<CollabInvitesResolver>(CollabInvitesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
