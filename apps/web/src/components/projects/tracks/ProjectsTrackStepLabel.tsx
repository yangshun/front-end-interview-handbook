import clsx from 'clsx';

import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  label: number;
}>;

export default function ProjectsTrackStepLabel({ label }: Props) {
  return (
    <div
      className={clsx(
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full z-10',
        ['border', themeBorderElementColor],
        themeBackgroundCardColor,
      )}>
      <Text color="secondary" size="body2" weight="medium">
        {label}
      </Text>
    </div>
  );
}
