import clsx from 'clsx';
import { RiBuildingLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Props = Readonly<{ jobTitle: string }>;

export default function ProjectsUserJobTitle({ jobTitle }: Props) {
  return (
    <div className={clsx('flex items-center gap-1', themeTextSecondaryColor)}>
      <RiBuildingLine className="h-4 w-4" />
      <Text color="inherit" size="body2">
        {jobTitle}
      </Text>
    </div>
  );
}
