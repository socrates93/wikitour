import { Test, TestingModule } from '@nestjs/testing';
import { FeedTranslateService } from './feed-translate.service';

describe('FeedTranslateService', () => {
  let service: FeedTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedTranslateService],
    }).compile();

    service = module.get<FeedTranslateService>(FeedTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
