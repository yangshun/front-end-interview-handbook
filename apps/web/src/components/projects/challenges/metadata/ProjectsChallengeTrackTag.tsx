import clsx from 'clsx';
import { RiCheckboxMultipleLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsChallengeTrackPayload } from '../types';

type Props = Readonly<{
  track: ProjectsChallengeTrackPayload;
}>;

export default function ProjectsChallengeTrackTag({ track }: Props) {
  return (
    <div className={clsx('flex items-center gap-1')}>
      <RiCheckboxMultipleLine
        className={clsx('h-4 w-4', themeTextSubtleColor)}
      />
      <Text color="subtle" size="body3">
        {track.title}
      </Text>
    </div>
  );
}
