import { useEffect, useRef, useState } from 'react';

type PaginatedList<T> = Readonly<{
  currentPage: number;
  currentPageItems: ReadonlyArray<T>;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}>;

const usePagination = <T>(
  totalList: ReadonlyArray<T>,
  itemsPerPage: number,
  deps: React.DependencyList,
  page?: number,
): PaginatedList<T> => {
  const isMounted = useRef(false);
  const [currentPage, setCurrentPage] = useState<number>(page ?? 1);
  const totalPages = Math.ceil(totalList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = totalList.slice(startIndex, endIndex);

  useEffect(() => {
    if (isMounted.current) {
      setCurrentPage(1); // Reset current page when dependencies change
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    isMounted.current = true;
  });

  return { currentPage, currentPageItems, setCurrentPage, totalPages };
};

export default usePagination;
