import Text from '~/components/ui/Text';

import { getRelativeTimestamp } from './relativeTimestampValues';

type Props = Readonly<{
  timestamp: Date;
}>;

export default function RelativeTimestamp({ timestamp }: Props) {
  return (
    <Text color="secondary" size="body3">
      {getRelativeTimestamp(timestamp)}
    </Text>
  );
}
