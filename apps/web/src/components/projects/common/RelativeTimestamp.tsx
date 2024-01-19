import Text from '~/components/ui/Text';

import { getTimeUnitAndValue } from './relativeTimestampValues';

type Props = Readonly<{
  timestamp: Date;
}>;

function getRelativeTimestamp(
  timestamp: Date,
  unit: Intl.RelativeTimeFormatUnit | 'Just now' | 'Yesterday',
  value: number | null,
) {
  if (unit === 'Just now' || unit === 'Yesterday') {
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

export default function RelativeTimestamp({ timestamp }: Props) {
  const { unit, value } = getTimeUnitAndValue(timestamp);

  return <Text>{getRelativeTimestamp(timestamp, unit, value)}</Text>;
}
