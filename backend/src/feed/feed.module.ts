import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';

import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FeedTranslateModule } from './feed-translate/feed-translate.module';

@Module({
  imports: [
    FeedTranslateModule,
    PrismaModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 15000,
        baseURL: process.env.WIKIPEDIA_BASE_URL,
      }),
    }),
  ],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
