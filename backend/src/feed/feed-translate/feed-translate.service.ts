import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import {
  FeedTranslateLanguageResponse,
  FeedTranslateResponse,
} from '../../shared/interfaces';

interface TranslateDataRequest {
  source?: string;
  target?: string;
  text?: string;
}

@Injectable()
export class FeedTranslateService {
  constructor(private readonly httpService: HttpService) {}

  async translateFeed({ source = 'es', target, text }: TranslateDataRequest) {
    try {
      const isValid = await this.validateIfLanguageIsSupported(source, target);

      if (!isValid) {
        throw new Error('Language not supported');
      }

      const resp = await firstValueFrom(
        this.httpService.post<FeedTranslateResponse>('translate', {
          q: text,
          source,
          target,
          format: 'text',
        }),
      );

      if (!resp.data) {
        throw new Error('No data');
      }

      return resp.data;
    } catch (error) {
      console.log(error);

      throw new Error('Error translating feed');
    }
  }

  async validateIfLanguageIsSupported(language: string, target?: string) {
    try {
      const resp = await firstValueFrom(
        this.httpService.get<FeedTranslateLanguageResponse[]>('languages'),
      );

      if (!resp.data) {
        return false;
      }

      const supportedLanguages = resp.data;

      return supportedLanguages.some(
        (lang) =>
          lang.code === language && lang.targets.some((t) => t === target),
      );
    } catch (error) {
      console.log(error);

      throw new Error('Error validating language');
    }
  }
}
