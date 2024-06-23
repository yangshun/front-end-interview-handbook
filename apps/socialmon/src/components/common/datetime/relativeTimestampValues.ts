export function getRelativeTimestamp(timestamp: Date) {
  const { unit, value } = getTimeUnitAndValue(timestamp);

  if (unit === 'just now') {
    return unit;
  }

  if (unit === 'month') {
    // Show exact date without the year
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
    }).format(timestamp);
  }

  if (unit === 'year') {
    // Show exact date with the year
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(timestamp);
  }

  if (!value) {
    return '';
  }

  return new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
  }).format(-value, unit);
}

export function getTimeUnitAndValue(timestamp: Date): {
  unit: Intl.RelativeTimeFormatUnit | 'just now';
  value: number | null;
} {
  const now = new Date();
  const diff = Math.abs(now.getTime() - timestamp.getTime());
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));

  if (diffDays > 7) {
    if (now.getFullYear() !== timestamp.getFullYear()) {
      return { unit: 'year', value: null };
    }

    return { unit: 'month', value: null };
  }

  if (diffDays >= 1) {
    return { unit: 'days', value: diffDays };
  }

  const diffHours = Math.floor(diff / (1000 * 3600));

  if (diffHours >= 1) {
    return { unit: 'hour', value: diffHours };
  }

  const diffMinutes = Math.floor(diff / (1000 * 60));

  if (diffMinutes >= 1) {
    return { unit: 'minute', value: diffMinutes };
  }

  const diffSeconds = Math.floor(diff / 1000);

  if (diffSeconds >= 10) {
    return { unit: 'second', value: diffSeconds };
  }

  return { unit: 'just now', value: null };
}
