import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import { FeedData } from 'src/shared/interfaces';

@Injectable()
export class FeedService {
  constructor(private readonly httpService: HttpService) {}

  async getFeeds(filter: {
    language: string;
    year: string;
    month: string;
    day: string;
  }) {
    try {
      const { language, year, month, day } = filter;

      const response = await firstValueFrom(
        this.httpService.get(
          `/feed/v1/wikipedia/${language}/featured/${year}/${month}/${day}`,
        ),
      );

      return response.data as FeedData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
