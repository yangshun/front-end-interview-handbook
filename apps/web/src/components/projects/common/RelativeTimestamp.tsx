import Tooltip from '~/components/ui/Tooltip';

import { getRelativeTimestamp } from './relativeTimestampValues';

type Props = Readonly<{
  timestamp: Date;
}>;

function getTooltipLabel(timestamp: Date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(timestamp);
}

export default function RelativeTimestamp({ timestamp }: Props) {
  return (
    <Tooltip label={getTooltipLabel(timestamp)}>
      <span>{getRelativeTimestamp(timestamp)}</span>
    </Tooltip>
  );
}
