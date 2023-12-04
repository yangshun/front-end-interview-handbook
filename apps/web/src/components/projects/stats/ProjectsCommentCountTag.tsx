import clsx from 'clsx';
import { RiMessage2Fill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  commentCount: number;
}>;

export default function ProjectsCommentCountTag({ commentCount }: Props) {
  return (
    <div className="flex items-center gap-1">
      <RiMessage2Fill className={clsx('h-4 w-4', themeTextSubtleColor)} />
      <Text size="body3">{commentCount}</Text>
    </div>
  );
}