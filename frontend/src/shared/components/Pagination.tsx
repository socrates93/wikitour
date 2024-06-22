import { useState } from 'react';
import { usePagination } from '../../hooks';

export const Pagination = () => {
  const { pageCount, pageNumber } = usePagination();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const pageCountArray = Array.from(Array(pageCount).keys());

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScrollPosition = documentHeight - windowHeight;
    const maxPage = pageCount - 1;
    const newPage = Math.round((scrollPosition / maxScrollPosition) * maxPage);

    setCurrentPage(pageNumber < newPage ? pageNumber : newPage);
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <div className='fixed right-0 mt-[25vh] flex w-min flex-col items-center gap-2 rounded-l-lg bg-gray-300 bg-opacity-65 px-4 py-4 transition delay-75 duration-300 ease-in-out hover:bg-opacity-100'>
      {pageCountArray.map(v => (
        <span
          className={`select-none ${v === currentPage ? 'text-lg font-bold text-blue-500' : 'text-gray-500'}`}
          key={v}
        >
          {v + 1}
        </span>
      ))}
    </div>
  );
};
