import { useCallback, useContext, useEffect } from 'react';

import { ArticlesContext } from '../context/articles';
import { useDebounce } from './useDebounce';
import { PaginationContext } from '../context/pagination';

export const usePagination = () => {
  const { isFetching } = useContext(ArticlesContext);
  const {
    perPage,
    pageCount,
    pageNumber,
    hasMorePages,
    setPageCount,
    setPageNumber,
    setPerPage,
  } = useContext(PaginationContext);

  const handleScroll = useCallback(() => {
    if (!hasMorePages) return;

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
      setPageNumber(prev => prev + 1);
    }
  }, [hasMorePages, isFetching, setPageNumber]);

  const debouncedScrollHandler = useDebounce(handleScroll, 500);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScrollHandler);

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, [debouncedScrollHandler]);

  return {
    perPage,
    pageCount,
    pageNumber,
    isFetching,
    setPageCount,
    setPerPage,
  };
};
