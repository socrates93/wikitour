import { useCallback, useContext, useEffect } from 'react';

import { ArticlesContext } from '../context/articles';
import { FeedService, LocalStorageService } from '../services';
import { READED_ARTICLES_KEY } from '../shared/utils';
import { Article } from '../shared/interfaces';
import { PaginationContext } from '../context/pagination';
import { FilterContext } from '../context/filter';

export const useArticle = (viaFilter: boolean = false) => {
  const {
    perPage,
    pageNumber,
    pageCount,
    setPageNumber,
    setPageCount,
    setHasMorePages,
  } = useContext(PaginationContext);
  const { lang, date } = useContext(FilterContext);
  const { articles, isFetching, hasError, setArticles, setFetching, setError } =
    useContext(ArticlesContext);

  const handleArticleClick = (wikibase_item: string) => {
    const localStorageService = new LocalStorageService();

    const readArticles =
      localStorageService.getItem<string[]>(READED_ARTICLES_KEY) || [];

    const exists = readArticles.some(article => article === wikibase_item);

    if (!exists) {
      localStorageService.setItem(READED_ARTICLES_KEY, [
        ...readArticles,
        wikibase_item,
      ]);

      const updatedArticles = articles.map(article => {
        if (article.wikibase_item === wikibase_item) {
          article.read = true;
        }

        return article;
      });

      setArticles(updatedArticles);
    }
  };

  const getTranslation = useCallback(
    async (text?: string) => {
      if (!text) return text;

      try {
        const feedService = new FeedService();

        const target = navigator.language?.split('-')?.[0] || 'en';

        const result = await feedService.translateFeed(lang, target, text);

        return result?.translatedText || text;
      } catch (error) {
        throw new Error('Failed to translate text');
      }
    },
    [lang]
  );

  const handleArticleTranslation = useCallback(
    async (title: string, summary?: string) => {
      try {
        const titleTranslation = await getTranslation(title);
        const summaryTranslation = await getTranslation(summary);

        return {
          title: titleTranslation,
          summary: summaryTranslation,
        };
      } catch (error) {
        throw new Error('Failed to translate article');
      }
    },
    [getTranslation]
  );

  const updateArticles = useCallback(
    (newArticles: Article[]) => {
      const localStorageService = new LocalStorageService();
      const readArticles =
        localStorageService.getItem<string[]>(READED_ARTICLES_KEY) || [];

      const updatedArticles = newArticles.map(article => {
        article.read = readArticles.some(a => a === article.wikibase_item);
        article.summary = article.extract
          ? article.extract.split(' ').slice(0, 15).join(' ') + '...'
          : article.description || 'No description';

        return article;
      });

      setArticles(updatedArticles);
    },
    [setArticles]
  );

  const fetchArticles = useCallback(
    async (newLimit?: number, reset?: boolean) => {
      try {
        setFetching(true);

        const newArticles = pageNumber === 0 || reset ? [] : articles;

        if (reset) {
          setPageNumber(0);
          setArticles([]);
        }

        const feedService = new FeedService();

        const data = await feedService.getFeed({
          lang,
          date,
          limit: newLimit || perPage,
          offset: reset ? 0 : pageNumber,
        });

        if (data?.onthisday?.length) {
          const pageCount = Math.ceil(
            data.onthisdayCount / (newLimit || perPage)
          );

          setPageCount(pageCount);
          setHasMorePages(reset ? pageCount > 1 : pageCount > pageNumber + 1);

          const articlesList =
            pageNumber > 0 && !reset
              ? [...newArticles, ...data.onthisday]
              : data.onthisday;

          updateArticles(articlesList);
        }
      } catch (error) {
        throw new Error('Failed to fetch articles');
      } finally {
        setFetching(false);
      }
    },
    [
      articles,
      date,
      lang,
      pageNumber,
      perPage,
      setArticles,
      setFetching,
      setHasMorePages,
      setPageCount,
      setPageNumber,
      updateArticles,
    ]
  );

  useEffect(() => {
    if (!viaFilter && pageNumber > 0 && pageNumber <= pageCount) {
      fetchArticles();
    }
  }, [pageNumber]);

  return {
    articles,
    isFetching,
    hasError,
    setError,
    setArticles,
    fetchArticles,
    handleArticleClick,
    handleArticleTranslation,
    updateArticles,
  };
};
