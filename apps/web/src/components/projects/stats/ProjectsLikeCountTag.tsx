import clsx from 'clsx';
import { RiThumbUpFill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  likeCount: number;
}>;

export default function ProjectsLikeCountTag({ likeCount }: Props) {
  return (
    <div className="flex items-center gap-1">
      <RiThumbUpFill className={clsx('h-4 w-4', themeTextSubtleColor)} />
      <Text size="body3">{likeCount}</Text>
    </div>
  );
}
