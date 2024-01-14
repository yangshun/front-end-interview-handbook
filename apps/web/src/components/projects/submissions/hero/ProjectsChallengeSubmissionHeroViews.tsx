import { clsx } from 'clsx';
import { RiEyeFill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

export default function ProjectsChallengeSubmissionHeroViews({
  views,
}: {
  views: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <RiEyeFill className={clsx('h-4 w-4', themeTextColor)} />
      <Text size="body3">{views}</Text>
    </div>
  );
}
