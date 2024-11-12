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

// Function to parse a date string in DD/MM/YYYY format
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);

  return new Date(year, month - 1, day);
}

// Function to find the maximum number of consecutive days
export function findMaxConsecutiveDays(data?: Record<string, number>): number {
  if (!data) {
    return 0;
  }

  const dates: Array<Date> = Object.keys(data).map(parseDate);
  const sortedDates = sortBy(dates);

  let maxConsecutive = 1;
  let currentConsecutive = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];
    const diffInTime = currentDate.getTime() - prevDate.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentConsecutive++;
    } else {
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
      currentConsecutive = 1;
    }
  }

  return Math.max(maxConsecutive, currentConsecutive);
}

export const groupByDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});
