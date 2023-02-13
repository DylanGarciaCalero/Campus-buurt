import { Test, TestingModule } from '@nestjs/testing';
import { CollabInvitesService } from './collab-invites.service';

describe('CollabInvitesService', () => {
  let service: CollabInvitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollabInvitesService],
    }).compile();

    service = module.get<CollabInvitesService>(CollabInvitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
