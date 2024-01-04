import clsx from 'clsx';
import { RiCheckboxMultipleLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsTrackMetadata } from '../details/types';

type Props = Readonly<{
  track: ProjectsTrackMetadata;
}>;

export default function ProjectsComponentTrackTag({ track }: Props) {
  return (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiCheckboxMultipleLine className="h-4 w-4" />
      <Text color="inherit" size="body2">
        {track.name}
      </Text>
    </div>
  );
}
