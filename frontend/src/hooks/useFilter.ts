import { useCallback, useContext, useRef, useState } from 'react';

import { useArticle } from './useArticle';
import { FilterContext } from '../context/filter';
import { PaginationContext } from '../context/pagination';

export const useFilter = () => {
  const perPageRef = useRef<HTMLSelectElement>(null);
  const [isLoading, setLoading] = useState(false);
  const { lang, date, setLang, setDate } = useContext(FilterContext);
  const { perPage, setPerPage } = useContext(PaginationContext);
  const { articles, hasError, setError, fetchArticles } = useArticle();

  const onFilter = useCallback(
    async (reset?: boolean) => {
      try {
        setLoading(true);

        const limit = Number(perPageRef.current!.value);

        if (limit !== perPage) {
          setPerPage(limit);
          document.documentElement.scrollTo(0, 0);
        }

        await fetchArticles(limit, limit !== perPage || reset);

        hasError && setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [hasError, perPage, fetchArticles, setError, setPerPage]
  );

  return {
    lang,
    date,
    perPageRef,
    articles,
    isLoading,
    perPage,
    setLang,
    setDate,
    onFilter,
  };
};
