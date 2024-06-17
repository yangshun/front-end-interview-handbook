import format from 'date-fns/format';

import { DEC, JAN, MONTHS } from './constants';
import type { Product } from './hooks/useRoadmap';

import type { RoadmapItem } from '@prisma/client';

export function getYears(roadmapItems: Array<RoadmapItem>) {
  const years = new Set<string>();

  for (const item of roadmapItems) {
    const year = format(item.dueDate, 'yyyy');

    years.add(year);
  }

  return Array.from(years);
}

export function getFilteredData(
  data: Array<RoadmapItem>,
  year: string,
  months: Array<string>,
  selectedProducts: Array<Product>,
) {
  const monthlyRoadmapItems = data.filter((item) => {
    const itemYear = format(item.dueDate, 'yyyy');
    const itemMonth = format(item.dueDate, 'MMM');

    return itemYear === year && months.includes(itemMonth);
  });

  if (selectedProducts.length) {
    const filteredData = monthlyRoadmapItems.filter((roadmapItem) => {
      return roadmapItem.tags.some((tag) =>
        (selectedProducts as Array<string>).includes(tag.toLowerCase()),
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
    startMonth = currentMonth === DEC ? currentMonth : currentMonth + 1;
  }

  const defaultOption = [];

  for (let i = startMonth; i <= DEC; i++) {
    defaultOption.push(MONTHS[i]);
  }

  return defaultOption;
}

export function groupRoadmapItemByDay(roadmapItems: Array<RoadmapItem>) {
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
