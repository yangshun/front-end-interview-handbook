import clsx from 'clsx';
import { RiMessage2Fill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';

export default function ProjectsChallengeSubmissionHeroCommentButton({
  comments,
}: {
  comments: number;
}) {
  return (
    <button
      className={clsx(
        'flex items-center gap-1 py-2 px-3 md:w-auto justify-center w-full rounded-2xl border',
        themeBackgroundLayerEmphasized,
        themeBorderElementColor,
      )}
      type="button">
      <RiMessage2Fill className={clsx('h-4 w-4', themeTextColor)} />
      <Text size="body3">{comments}</Text>
    </button>
  );
}
