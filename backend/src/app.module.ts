import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { FeedModule } from './feed/feed.module';

@Module({
  imports: [FeedModule, ConfigModule.forRoot()],
})
export class AppModule {}
