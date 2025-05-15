import type { SponsorsAdFormat } from '@prisma/client';
import {
  addWeeks,
  endOfWeek,
  format as formatDate,
  getISOWeek,
  getYear,
  startOfWeek,
} from 'date-fns';
import { range } from 'lodash-es';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import prisma from '~/server/prisma';
import { getErrorMessage } from '~/utils/getErrorMessage';

const availabilityMaxWeeksAhead = 12;

function incrementISOWeek(week: number, delta = 1) {
  const newWeek = week + delta;

  return newWeek <= 52 ? newWeek : newWeek - 52;
}

// Function to get start and end dates of an ISO week number
function getWeekDateRange(
  year: number,
  weekNumber: number,
): { end: string; start: string } {
  const firstDayOfYear = new Date(year, 0, 1); // Jan 1st
  const firstMonday = startOfWeek(firstDayOfYear, { weekStartsOn: 1 }); // Adjust to first Monday

  const startDate = addWeeks(firstMonday, weekNumber - 1); // Get Monday of the target week
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 }); // Get Sunday of that week

  return {
    end: formatDate(endDate, 'yyyy-MM-dd'),
    start: formatDate(startDate, 'yyyy-MM-dd'),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const date = new Date();
    const currentYear = Number(searchParams.get('year')) || getYear(date);
    const currentWeek = Number(searchParams.get('week')) || getISOWeek(date);

    const availabilityStartWeek = incrementISOWeek(currentWeek);
    const availabilityEndWeek = incrementISOWeek(
      availabilityStartWeek,
      availabilityMaxWeeksAhead,
    );

    const publishedAdsQuery = {
      ad: {
        format: (searchParams.get('format') ||
          'IN_CONTENT') as SponsorsAdFormat,
        request: {
          status: 'PUBLISHED',
        },
      },
    } as const;

    const slots = await prisma.sponsorsAdSlot.findMany({
      where:
        availabilityStartWeek < availabilityEndWeek
          ? {
              ...publishedAdsQuery,
              week: {
                gte: availabilityStartWeek,
                lte: availabilityEndWeek,
              },
              year: currentYear,
            }
          : {
              // Goes into next year
              OR: [
                {
                  ...publishedAdsQuery,
                  week: {
                    gte: availabilityStartWeek,
                    lte: 52,
                  },
                  year: currentYear,
                },
                {
                  ...publishedAdsQuery,
                  week: {
                    lte: availabilityEndWeek,
                  },
                  year: currentYear + 1,
                },
              ],
            },
    });

    const data = range(1, availabilityMaxWeeksAhead + 1).map((weekDelta) => {
      const week = incrementISOWeek(currentWeek, weekDelta);
      const year = currentWeek < week ? currentYear : currentYear + 1;
      const hasMatchingSlot = slots.find(
        (slot) => slot.year === year && slot.week === week,
      );

      return {
        ...getWeekDateRange(year, week),
        available: !hasMatchingSlot,
        week,
        year,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ err: getErrorMessage(error) }, { status: 500 });
  }
}
