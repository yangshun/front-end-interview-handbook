function getStartOfCurrWeek(date: Date) {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  const startOfWeek = new Date(date.setDate(diff));

  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

function getStartOfPrevWeek(date: Date) {
  const startOfPrevWeek = getStartOfCurrWeek(date);

  startOfPrevWeek.setDate(startOfPrevWeek.getDate() - 7);

  return startOfPrevWeek;
}

function getStartOfCurrMonth(date: Date) {
  const startOfCurrMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  startOfCurrMonth.setHours(0, 0, 0, 0);

  return startOfCurrMonth;
}

function getStartOfPrevMonth(date: Date) {
  const startOfPrevMonth = getStartOfCurrMonth(date);

  startOfPrevMonth.setMonth(startOfPrevMonth.getMonth() - 1);

  return startOfPrevMonth;
}

export function categorizeActivitiesByTimeframe<T extends { createdAt: Date }>(
  data: ReadonlyArray<T>,
): Readonly<{
  activitiesInCurrMonth: ReadonlyArray<T>;
  activitiesInCurrWeek: ReadonlyArray<T>;
  activitiesInPrevMonth: ReadonlyArray<T>;
  activitiesInPrevWeek: ReadonlyArray<T>;
  activitiesOlderThanPrevMonth: ReadonlyArray<T>;
}> {
  const indexOfFirstActivityOlderThanCurrWeek = data.findIndex((activity) => {
    const startOfCurrWeek = getStartOfCurrWeek(new Date());

    return activity.createdAt.getTime() < startOfCurrWeek.getTime();
  });

  const indexOfFirstActivityOlderThanPrevWeek = data.findIndex((activity) => {
    const startOfPrevWeek = getStartOfPrevWeek(new Date());

    return activity.createdAt.getTime() < startOfPrevWeek.getTime();
  });
  const indexOfFirstActivityOlderThanCurrMonth = data.findIndex((activity) => {
    const startOfCurrMonth = getStartOfCurrMonth(new Date());

    return activity.createdAt.getTime() < startOfCurrMonth.getTime();
  });
  const indexOfFirstActivityOlderThanPrevMonth = data.findIndex((activity) => {
    const startOfPrevMonth = getStartOfPrevMonth(new Date());

    return activity.createdAt.getTime() < startOfPrevMonth.getTime();
  });

  const activitiesInCurrWeek = data.slice(
    0,
    indexOfFirstActivityOlderThanCurrWeek === -1
      ? undefined
      : indexOfFirstActivityOlderThanCurrWeek,
  );
  const activitiesInPrevWeek =
    indexOfFirstActivityOlderThanCurrWeek === -1
      ? []
      : data.slice(
          indexOfFirstActivityOlderThanCurrWeek,
          indexOfFirstActivityOlderThanPrevWeek === -1
            ? undefined
            : indexOfFirstActivityOlderThanPrevWeek,
        );
  const activitiesInCurrMonth =
    indexOfFirstActivityOlderThanPrevWeek === -1
      ? []
      : data.slice(
          indexOfFirstActivityOlderThanPrevWeek,
          indexOfFirstActivityOlderThanCurrMonth === -1
            ? undefined
            : indexOfFirstActivityOlderThanCurrMonth,
        );
  const activitiesInPrevMonth =
    indexOfFirstActivityOlderThanCurrMonth === -1
      ? []
      : data.slice(
          indexOfFirstActivityOlderThanCurrMonth,
          indexOfFirstActivityOlderThanPrevMonth === -1
            ? undefined
            : indexOfFirstActivityOlderThanPrevMonth,
        );
  const activitiesOlderThanPrevMonth =
    indexOfFirstActivityOlderThanPrevMonth === -1
      ? []
      : data.slice(indexOfFirstActivityOlderThanPrevMonth);

  return {
    activitiesInCurrMonth,
    activitiesInCurrWeek,
    activitiesInPrevMonth,
    activitiesInPrevWeek,
    activitiesOlderThanPrevMonth,
  };
}
