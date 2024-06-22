import { PropsWithChildren, useState } from 'react';

import { Article } from '../../shared/interfaces';
import { ArticlesContext } from '.';

export const ArticlesProvider = ({ children }: PropsWithChildren) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        isFetching,
        hasError,
        setError,
        setFetching,
        setArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
