import { getRelativeTimestamp } from './relativeTimestampValues';

type Props = Readonly<{
  timestamp: Date;
}>;

export default function RelativeTimestamp({ timestamp }: Props) {
  return <span>{getRelativeTimestamp(timestamp)}</span>;
}
