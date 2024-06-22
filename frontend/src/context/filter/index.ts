import { createContext } from 'react';

type FilterContextType = {
  lang: string;
  date: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

export const FilterContext = createContext<FilterContextType>(
  {} as FilterContextType
);
