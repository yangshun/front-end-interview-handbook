import type { RoadmapItem } from '@prisma/client';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import {
  getFilteredData,
  getMonthsForYear,
  getYears,
  hasCurrentYear,
} from '../RoadmapUtils';

export type RoadmapProduct = 'interviews' | 'projects';

export const useRoadmap = () => {
  const {
    isLoading,
    data: roadmapItems,
    error,
  } = trpc.roadmap.getRoadmapItems.useQuery();
  const [filteredData, setFilteredData] = useState<
    Map<string, ReadonlyArray<RoadmapItem>>
  >(new Map());
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonths, setSelectedMonths] = useState<ReadonlyArray<string>>(
    [],
  );
  const [selectedProducts, setSelectedProducts] = useState<
    ReadonlyArray<RoadmapProduct>
  >([]);
  const [showDefaultMonths, setShowDefaultMonths] = useState(true);

  const years: ReadonlyArray<string> = useMemo(
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

  function filterData(
    year: string,
    months: ReadonlyArray<string>,
    products: ReadonlyArray<RoadmapProduct>,
  ) {
    if (roadmapItems) {
      setFilteredData(getFilteredData(roadmapItems, year, months, products));
    }
  }

  return {
    data: filteredData,
    error,
    isLoading,
    months: selectedMonths,
    onApplyFilter: (
      appliedMonths: ReadonlyArray<string>,
      appliedYear: string,
    ) => {
      setSelectedMonths(appliedMonths);
      setSelectedYear(appliedYear);
      filterData(appliedYear, appliedMonths, selectedProducts);
    },
    onMonthChange: (months: ReadonlyArray<string>) => {
      setSelectedMonths(months);
      filterData(selectedYear, months, selectedProducts);
      setShowDefaultMonths(false);
    },
    onProductFilterChange: (products: ReadonlyArray<RoadmapProduct>) => {
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
