import clsx from 'clsx';
import { RiMessage2Fill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  count: number;
}>;

export default function ProjectsCommentCountTag({ count }: Props) {
  if (count === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <RiMessage2Fill className={clsx('size-4', themeTextSubtleColor)} />
      <Text size="body3">{count}</Text>
    </div>
  );
}
