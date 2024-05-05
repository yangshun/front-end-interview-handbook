import { capitalize } from 'lodash-es';

import Tooltip from '~/components/ui/Tooltip';

import { getRelativeTimestamp } from './relativeTimestampValues';

type Props = Readonly<{
  capitalize?: boolean;
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

export default function RelativeTimestamp({
  capitalize: capitalizeProp = false,
  timestamp,
}: Props) {
  const relativeLabel = getRelativeTimestamp(timestamp);

  return (
    <Tooltip label={formatter.format(timestamp)}>
      <span suppressHydrationWarning={true}>
        {capitalizeProp ? capitalize(relativeLabel) : relativeLabel}
      </span>
    </Tooltip>
  );
}
