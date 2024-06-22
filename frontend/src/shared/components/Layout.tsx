import { PropsWithChildren } from 'react';
import { ArticlesProvider } from '../../context/articles/provider';
import { FilterProvider } from '../../context/filter/provider';
import { PaginationProvider } from '../../context/pagination/provider';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ArticlesProvider>
      <FilterProvider>
        <PaginationProvider>{children}</PaginationProvider>
      </FilterProvider>
    </ArticlesProvider>
  );
};
