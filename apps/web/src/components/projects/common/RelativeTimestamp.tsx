import Tooltip from '~/components/ui/Tooltip';

import { getRelativeTimestamp } from './relativeTimestampValues';

type Props = Readonly<{
  timestamp: Date;
}>;

const formatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  hour: 'numeric',
  hour12: true,
  minute: '2-digit',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
});

export default function RelativeTimestamp({ timestamp }: Props) {
  return (
    <Tooltip label={formatter.format(timestamp)}>
      <span>{getRelativeTimestamp(timestamp)}</span>
    </Tooltip>
  );
}
