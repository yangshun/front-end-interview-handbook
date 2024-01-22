import clsx from 'clsx';
import { RiEyeFill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  count: number;
}>;

export default function ProjectsViewCountTag({ count }: Props) {
  if (count === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <RiEyeFill className={clsx('h-4 w-4', themeTextSubtleColor)} />
      <Text size="body3">{count}</Text>
    </div>
  );
}
