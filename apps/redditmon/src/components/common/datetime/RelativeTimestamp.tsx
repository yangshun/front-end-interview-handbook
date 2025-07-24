import { capitalize } from 'lodash-es';

import { getRelativeTimestamp } from './relativeTimestampValues';

type Props = Readonly<{
  capitalize?: boolean;
  timestamp: Date;
}>;

export default function RelativeTimestamp({
  capitalize: capitalizeProp = false,
  timestamp,
}: Props) {
  const relativeLabel = getRelativeTimestamp(timestamp);

  return (
    <span>{capitalizeProp ? capitalize(relativeLabel) : relativeLabel}</span>
  );
}
