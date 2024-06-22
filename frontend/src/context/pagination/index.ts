import { createContext } from 'react';

type PaginationContextType = {
  hasMorePages: boolean;
  pageCount: number;
  pageNumber: number;
  perPage: number;
  setHasMorePages: React.Dispatch<React.SetStateAction<boolean>>;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const PaginationContext = createContext<PaginationContextType>(
  {} as PaginationContextType
);
