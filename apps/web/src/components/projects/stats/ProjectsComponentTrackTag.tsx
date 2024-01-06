import clsx from 'clsx';
import { RiCheckboxMultipleLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  trackName: string;
}>;

export default function ProjectsComponentTrackTag({ trackName }: Props) {
  return (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiCheckboxMultipleLine className="h-4 w-4" />
      <Text color="inherit" size="body3">
        {trackName}
      </Text>
    </div>
  );
}
