import clsx from 'clsx';
import { RiThumbUpFill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeElementBorderColor,
  themeTextColor,
} from '~/components/ui/theme';

export default function ProjectsChallengeSubmissionHeroLikeButton({
  votes,
}: {
  votes: number;
}) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-1 py-2 px-3 rounded-2xl border md:w-auto w-full',
        themeBackgroundLayerEmphasized,
        themeElementBorderColor,
      )}
      type="button">
      <RiThumbUpFill className={clsx('h-4 w-4', themeTextColor)} />
      <Text size="body3">{votes}</Text>
    </button>
  );
}
