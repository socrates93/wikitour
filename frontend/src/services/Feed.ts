import { FeedData, IFetchArticles } from '../shared/interfaces';
import { ArticleTranslationResponse } from '../shared/interfaces/article';

export class FeedService {
  constructor() {}

  async getFeed(fetchData: IFetchArticles) {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          '/feed?' +
          this.#getQueryParams(fetchData).toString()
      );

      if (response.ok) {
        return (await response.json()) as FeedData;
      }
    } catch (error) {
      throw new Error('Failed to fetch feed');
    }
  }

  async translateFeed(source: string, target: string, text?: string) {
    try {
      if (!text) throw new Error('No text to translate');

      const params = new URLSearchParams();
      params.append('source', source);
      params.append('text', text);

      const response = await fetch(
        import.meta.env.VITE_API_URL +
          '/feed/translate/' +
          target +
          '?' +
          params,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        return (await response.json()) as ArticleTranslationResponse;
      }

      throw new Error('Failed to translate text');
    } catch (error) {
      throw new Error('Failed to translate text');
    }
  }

  #getQueryParams = (fetchData: IFetchArticles) => {
    const { lang, date, limit, offset } = fetchData;

    const params = new URLSearchParams();

    params.append('language', lang);
    params.append('date', date);

    if (limit) {
      params.append('limit', limit.toString());
    }

    if (offset) {
      params.append('offset', offset.toString());
    }

    return params;
  };
}
