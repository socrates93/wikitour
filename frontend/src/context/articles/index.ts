import { createContext } from 'react';

import { Article } from '../../shared/interfaces';

type ArticlesContextType = {
  articles: Article[];
  isFetching: boolean;
  hasError: boolean;
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArticlesContext = createContext<ArticlesContextType>(
  {} as ArticlesContextType
);
