import { useEffect, useRef, useState } from 'react';

type PaginatedList<T> = Readonly<{
  currentPage: number;
  currentPageItems: ReadonlyArray<T>;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}>;

type Options<T> = Readonly<
  {
    deps: React.DependencyList;
    itemsPerPage: number;
    page?: number;
    totalList?: ReadonlyArray<T>;
    updateSearchParamsRequired?: boolean;
  } & (
    | {
        updateSearchParams: (
          key: string,
          value: Array<string> | string,
        ) => void;
        updateSearchParamsRequired?: true;
      }
    | {
        updateSearchParams?: (
          key: string,
          value: Array<string> | string,
        ) => void;
        updateSearchParamsRequired?: false;
      }
  )
>;

const usePagination = <T>(opts: Options<T>): PaginatedList<T> => {
  const {
    deps,
    itemsPerPage,
    page,
    totalList = [],
    updateSearchParams,
    updateSearchParamsRequired,
  } = opts;
  const isMounted = useRef(false);
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const totalPages = Math.ceil(totalList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = totalList.slice(startIndex, endIndex);

  useEffect(() => {
    if (isMounted.current && (deps || []).length >= 1) {
      setCurrentPage(1); // Reset current page when dependencies change
      if (updateSearchParamsRequired) {
        updateSearchParams('page', '1');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    isMounted.current = true;
  });

  return { currentPage, currentPageItems, setCurrentPage, totalPages };
};

export default usePagination;
