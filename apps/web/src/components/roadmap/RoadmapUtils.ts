import type { RoadmapItem } from '@prisma/client';
import format from 'date-fns/format';

import { DEC, JAN, MONTH_DELTA, MONTHS } from './constants';
import type { RoadmapProduct } from './hooks/useRoadmap';

export function getYears(roadmapItems: ReadonlyArray<RoadmapItem>) {
  const yearsSet = new Set<string>();

  roadmapItems.forEach((item) => {
    const year = format(item.dueDate, 'yyyy');

    yearsSet.add(year);
  });

  const years = Array.from(yearsSet);

  // Sort by descending years.
  years.sort((a, b) => (a > b ? -1 : 1));

  return years;
}

export function getFilteredData(
  data: ReadonlyArray<RoadmapItem>,
  year: string,
  months: ReadonlyArray<string>,
  selectedProducts: ReadonlyArray<RoadmapProduct>,
) {
  const monthlyRoadmapItems = data.filter((item) => {
    const itemYear = format(item.dueDate, 'yyyy');
    const itemMonth = format(item.dueDate, 'MMM');

    return itemYear === year && months.includes(itemMonth);
  });

  if (selectedProducts.length) {
    const filteredData = monthlyRoadmapItems.filter((roadmapItem) => {
      return roadmapItem.tags.some((tag) =>
        (selectedProducts as ReadonlyArray<string>).includes(tag.toLowerCase()),
      );
    });

    return groupRoadmapItemByDay(filteredData);
  }

  return groupRoadmapItemByDay(monthlyRoadmapItems);
}

export function getMonthsForYear(year: string) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  let startMonth = JAN;

  if (currentYear.toString() === year) {
    startMonth = currentMonth + MONTH_DELTA;
  }

  const defaultOption = [];

  for (let i = startMonth; i <= DEC; i++) {
    defaultOption.push(MONTHS[i]);
  }

  return defaultOption;
}

export function groupRoadmapItemByDay(
  roadmapItems: ReadonlyArray<RoadmapItem>,
) {
  const groupedItems = new Map<string, Array<RoadmapItem>>();

  return roadmapItems.reduce((acc, item) => {
    const date = format(item.dueDate, 'dd-MMM-yyy');

    if (!acc.has(date)) {
      acc.set(date, []);
    }
    acc.get(date)?.push(item);

    return acc;
  }, groupedItems);
}

export function hasCurrentYear(roadmapItems: ReadonlyArray<RoadmapItem>) {
  return roadmapItems.some(
    (item) => new Date(item.dueDate).getFullYear === new Date().getFullYear,
  );
}
