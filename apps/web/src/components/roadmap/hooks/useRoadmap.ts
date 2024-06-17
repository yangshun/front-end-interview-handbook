import format from 'date-fns/format';
import { useEffect, useMemo, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { getFilteredData, getMonthsForYear, getYears } from '../utils';

import type { RoadmapItem } from '@prisma/client';

export type Product = 'interviews' | 'projects';

export const useRoadmap = () => {
  const {
    isLoading,
    data: roadmapItems,
    error,
  } = trpc.roadmap.getRoadmapItems.useQuery();
  const [filteredData, setFilteredData] = useState<
    Map<string, Array<RoadmapItem>>
  >(new Map());
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonths, setSelectedMonths] = useState<Array<string>>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([]);

  const years = useMemo(
    () => (roadmapItems ? getYears(roadmapItems) : []),
    [roadmapItems],
  );

  useEffect(() => {
    if (roadmapItems?.length) {
      const year: string | undefined = format(roadmapItems[0].dueDate, 'yyyy');

      if (year) {
        setSelectedYear(year);

        const months = getMonthsForYear(year);

        setSelectedMonths(months);
        setFilteredData(getFilteredData(roadmapItems, year, months, []));
      }
    }
  }, [roadmapItems]);

  const filterData = (
    year: string,
    months: Array<string>,
    products: Array<Product>,
  ) => {
    if (roadmapItems) {
      setFilteredData(getFilteredData(roadmapItems, year, months, products));
    }
  };

  return {
    data: filteredData,
    error,
    isLoading,
    months: selectedMonths,
    onApplyFilter: (appliedMonths: Array<string>, appliedYear: string) => {
      setSelectedMonths(appliedMonths);
      setSelectedYear(appliedYear);
      filterData(appliedYear, appliedMonths, selectedProducts);
    },
    onMonthChange: (months: Array<string>) => {
      setSelectedMonths(months);
      filterData(selectedYear, months, selectedProducts);
    },
    onProductFilterChange: (products: Array<Product>) => {
      setSelectedProducts(products);
      filterData(selectedYear, selectedMonths, products);
    },
    onYearChange: (year: string) => {
      setSelectedYear(year);

      const months = getMonthsForYear(year);

      setSelectedMonths(months);
      filterData(year, months, selectedProducts);
    },
    selectedProducts,
    selectedYear,
    years,
  };
};
