import { Module } from '@nestjs/common';

import { FeedTranslateService } from './feed-translate.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [FeedTranslateService],
  exports: [FeedTranslateService],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 15000,
        baseURL: process.env.LIBRE_TRANSLATE_API_URL,
      }),
    }),
  ],
})
export class FeedTranslateModule {}
