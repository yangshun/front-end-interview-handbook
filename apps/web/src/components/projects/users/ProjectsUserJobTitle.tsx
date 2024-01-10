import clsx from 'clsx';
import { RiBuildingLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = '2xs' | 'sm';

type Props = Readonly<{ jobTitle: string; size?: Size }>;

const textClasses: Record<Size, string> = {
  '2xs': 'text-2xs',
  sm: 'text-sm',
};

const iconClasses: Record<Size, string> = {
  '2xs': 'h-4 w-4',
  sm: 'h-5 w-5',
};

const gap: Record<Size, string> = {
  '2xs': 'gap-1',
  sm: 'gap-2',
};

export default function ProjectsUserJobTitle({ jobTitle, size = 'sm' }: Props) {
  return (
    <div className={clsx('flex items-center', gap[size])}>
      <RiBuildingLine
        className={clsx(iconClasses[size], themeTextSecondaryColor)}
      />
      <Text className={textClasses[size]} color="secondary" size="inherit">
        {jobTitle}
      </Text>
    </div>
  );
}
