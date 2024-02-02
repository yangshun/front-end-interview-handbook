import clsx from 'clsx';
import { RiMessage2Fill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  comments: number;
  onClick: () => void;
}>;

export default function ProjectsChallengeSubmissionHeroCommentButton({
  comments,
  onClick,
}: Props) {
  return (
    <button
      className={clsx(
        'flex items-center gap-1 py-2 px-3 justify-center',
        'w-full md:w-auto',
        themeBackgroundLayerEmphasized,
        'border',
        themeBorderElementColor,
        'rounded-2xl',
      )}
      type="button"
      onClick={onClick}>
      <RiMessage2Fill className={clsx('h-4 w-4', themeTextColor)} />
      <Text size="body3">{comments}</Text>
    </button>
  );
}
