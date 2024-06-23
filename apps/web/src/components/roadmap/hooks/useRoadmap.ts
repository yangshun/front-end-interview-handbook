import format from 'date-fns/format';
import { useEffect, useMemo, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import {
  getFilteredData,
  getMonthsForYear,
  getYears,
  hasCurrentYear,
} from '../utils';

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
  const [showDefaultMonths, setShowDefaultMonths] = useState(true);

  const years: Array<string> = useMemo(
    () => (roadmapItems ? getYears(roadmapItems) : []),
    [roadmapItems],
  );

  useEffect(() => {
    if (roadmapItems?.length) {
      /**
       * Check if data has current year
       * if not then select the first year in the data
       */
      const dataHasCurrentYear = hasCurrentYear(roadmapItems);

      const year: string | undefined = dataHasCurrentYear
        ? format(new Date(), 'yyyy')
        : format(roadmapItems[0].dueDate, 'yyyy');

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
      setShowDefaultMonths(false);
    },
    onProductFilterChange: (products: Array<Product>) => {
      setSelectedProducts(products);
      filterData(selectedYear, selectedMonths, products);
    },
    onYearChange: (year: string) => {
      setSelectedYear(year);

      const months = getMonthsForYear(year);

      setShowDefaultMonths(true);

      setSelectedMonths(months);
      filterData(year, months, selectedProducts);
    },
    selectedProducts,
    selectedYear,
    showDefaultMonths,
    years,
  };
};
