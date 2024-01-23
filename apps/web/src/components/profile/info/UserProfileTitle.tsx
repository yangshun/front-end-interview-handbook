import clsx from 'clsx';
import { RiBuildingLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = 'sm' | 'xs';

type Props = Readonly<{
  profile: Readonly<{
    title: string | null;
  }>;
  size?: Size;
}>;

const textClasses: Record<Size, string> = {
  sm: 'text-sm',
  xs: 'text-xs',
};

const iconClasses: Record<Size, string> = {
  sm: 'h-5 w-5',
  xs: 'h-4 w-4',
};

const gap: Record<Size, string> = {
  sm: 'gap-2',
  xs: 'gap-1',
};

export default function UserProfileTitle({ profile, size = 'sm' }: Props) {
  const { title } = profile;

  if (title == null) {
    return null;
  }

  return (
    <div className={clsx('flex items-center', gap[size])}>
      <RiBuildingLine
        className={clsx(iconClasses[size], themeTextSecondaryColor)}
      />
      <Text className={textClasses[size]} color="secondary" size="inherit">
        {title}
      </Text>
    </div>
  );
}
