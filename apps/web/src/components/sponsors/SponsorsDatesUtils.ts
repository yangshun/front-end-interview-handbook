import {
  addWeeks,
  endOfWeek,
  format as formatDate,
  startOfWeek,
} from 'date-fns';

export const sponsorsDateFormatter = Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const sponsorsDateFormatterShort = Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
});

export const sponsorsDateFormatterWithoutYear = Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
});

export const sponsorsDateFormatterWithYear = Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const sponsorsDateFormatterWithDayAndYear = Intl.DateTimeFormat(
  'en-US',
  {
    day: '2-digit',
    month: 'short',
    weekday: 'long',
    year: 'numeric',
  },
);

export const sponsorsDateFormatterFull = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  month: 'long',
  second: '2-digit',
  timeZoneName: 'short',
  year: 'numeric',
});

export function sponsorsWeekDateRange(
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
