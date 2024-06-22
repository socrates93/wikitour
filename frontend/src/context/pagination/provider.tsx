import { PropsWithChildren, useState } from 'react';

import { useWindowDimensions } from '../../hooks';
import { PaginationContext } from '.';

export const PaginationProvider = ({ children }: PropsWithChildren) => {
  const { width } = useWindowDimensions();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [hasMorePages, setHasMorePages] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(width > 640 ? 10 : 5);

  return (
    <PaginationContext.Provider
      value={{
        pageCount,
        perPage,
        pageNumber,
        hasMorePages,
        setHasMorePages,
        setPageNumber,
        setPerPage,
        setPageCount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
