import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { FeedService } from './feed.service';
import { getDateObjectFromString, handleFeedsResponse } from '../shared/utils';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { FeedQueryParams, FeedTranslateParams } from '../shared/interfaces';
import { FeedTranslateService } from './feed-translate/feed-translate.service';

@Controller('feed')
@UseInterceptors(LoggingInterceptor)
export class FeedController {
  constructor(
    private feedService: FeedService,
    private feedTranslationService: FeedTranslateService,
  ) {}

  @Get()
  async getFeeds(
    @Query()
    query: FeedQueryParams,
  ) {
    try {
      const { language, date, limit, offset } = query;

      const dateObject = getDateObjectFromString(date);

      if (!dateObject) throw new Error('No date object');

      const response = await this.feedService.getFeeds({
        language,
        ...dateObject,
      });

      const limitNumber = Number(limit);
      const offsetNumber = Number(offset);

      const data = handleFeedsResponse(
        response,
        isNaN(limitNumber) ? undefined : limitNumber,
        isNaN(offsetNumber) ? undefined : offsetNumber,
      );

      return data;
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong.', details: error?.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/translate/:language')
  async feedTranslate(
    @Query()
    query: FeedTranslateParams,
    @Param('language') language: string,
  ) {
    try {
      const { text, source } = query;

      if (!language || !text)
        throw new Error('No language provided nor text to translate');

      const response = await this.feedTranslationService.translateFeed({
        target: language,
        source,
        text,
      });

      return response;
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong.', details: error?.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
