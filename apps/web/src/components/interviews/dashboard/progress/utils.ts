import { set, subWeeks } from 'date-fns';
import { sortBy } from 'lodash-es';

type DayOfWeek =
  | 'Friday'
  | 'Monday'
  | 'Saturday'
  | 'Sunday'
  | 'Thursday'
  | 'Tuesday'
  | 'Wednesday';

// Function to get the number of days in a month
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getAllDatesInRange(
  startDate: Date,
  endDate: Date,
): Array<{
  days: Array<{ date: string; dayOfWeek: DayOfWeek }>;
  month: string;
}> {
  if (startDate > endDate) {
    return [];
  }

  const allDates: Array<{
    days: Array<{ date: string; dayOfWeek: DayOfWeek }>;
    month: string;
  }> = [];

  // Function to get the day of the week
  function getDayOfWeek(date: Date): DayOfWeek {
    const days: Array<DayOfWeek> = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return days[date.getDay()];
  }

  const currentStartDate = new Date(startDate);

  while (currentStartDate <= endDate) {
    const year = currentStartDate.getFullYear();
    const month = currentStartDate.getMonth();

    // Create an array to hold dates for the current month
    const monthDates: Array<{ date: string; dayOfWeek: DayOfWeek }> = [];

    // Get the number of days in the current month
    const daysCount = daysInMonth(year, month);

    // Generate dates for the current month
    for (let day = 1; day <= daysCount; day++) {
      const date = new Date(year, month, day);

      // Only include dates between startDate and endDate
      if (date >= startDate && date <= endDate) {
        monthDates.push({
          date: date.toLocaleDateString('en-US'),
          dayOfWeek: getDayOfWeek(date),
        });
      }
    }

    if (monthDates.length > 0) {
      allDates.push({
        days: monthDates,
        month: new Date(year, month, 1).toLocaleString('en-US', {
          month: 'short',
        }),
      });
    }

    // Move to the next month
    currentStartDate.setMonth(currentStartDate.getMonth() + 1);
    currentStartDate.setDate(1);
  }

  return allDates;
}

export function getDateRangeFromToday() {
  // Get today's date
  const today = new Date();

  // Calculate the day 52 weeks ago
  const lastYearDate = subWeeks(today, 52);

  // Set the year of lastYearDate to the current year
  const startOfDayThisYear = set(today, { year: today.getFullYear() });

  // Set the year of lastYearDate to the last year
  const startOfDayLastYear = set(lastYearDate, {
    year: lastYearDate.getFullYear(),
  });

  return {
    endTime: startOfDayThisYear,
    startTime: startOfDayLastYear,
  };
}

function isConsecutiveDay(currentDate: Date, previousDate: Date): boolean {
  const differenceInTime = currentDate.getTime() - previousDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

  return differenceInDays === 1;
}

// Function to find the maximum number of consecutive days
export function findMaxConsecutiveDays(data?: Record<string, number>): number {
  if (!data) {
    return 0;
  }

  const dates: Array<Date> = Object.keys(data).map(
    (dateStr) => new Date(dateStr),
  );
  const sortedDates = sortBy(dates);

  let maxConsecutive = 1;
  let currentConsecutive = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];

    if (isConsecutiveDay(currentDate, prevDate)) {
      currentConsecutive++;
    } else {
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
      currentConsecutive = 1;
    }
  }

  return Math.max(maxConsecutive, currentConsecutive);
}

// Function to find the current number of consecutive days
export function findCurrentMaxConsecutiveDays(
  data?: Record<string, number>,
): number {
  if (!data) {
    return 0;
  }

  const dates: Array<Date> = Object.keys(data).map(
    (dateStr) => new Date(dateStr),
  );
  const sortedDates = sortBy(dates);

  const today = new Date();
  const yesterday = groupByDateFormatter.format(
    new Date(today).setDate(today.getDate() - 1),
  );
  const isIncludedTodayContribution = Object.keys(data).includes(
    groupByDateFormatter.format(today),
  );
  const isIncludedYesterdayContribution = Object.keys(data).includes(yesterday);

  if (!isIncludedYesterdayContribution && !isIncludedTodayContribution) {
    return 0; // No contribution on the most recent day, so streak is 0
  }

  let currentStreak = 1;

  for (let i = sortedDates.length - 1; i > 0; i--) {
    const currentDate = sortedDates[i];
    const previousDate = sortedDates[i - 1];

    if (isConsecutiveDay(currentDate, previousDate)) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return currentStreak;
}

export const groupByDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});
