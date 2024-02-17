import clsx from 'clsx';
import { RiBuildingLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = 'body2' | 'body3';

type Props = Readonly<{
  profile: Readonly<{
    title: string | null;
  }>;
  size?: 'body2' | 'body3';
}>;

const iconClasses: Record<Size, string> = {
  body2: 'size-5',
  body3: 'size-4',
};

const gap: Record<Size, string> = {
  body2: 'gap-2',
  body3: 'gap-1',
};

export default function UserProfileTitle({ profile, size = 'body2' }: Props) {
  const { title } = profile;

  if (title === '' || title == null) {
    return null;
  }

  return (
    <div className={clsx('flex items-center', gap[size])}>
      <RiBuildingLine
        className={clsx(iconClasses[size], themeTextSecondaryColor)}
      />
      <Text color="secondary" size={size}>
        {title}
      </Text>
    </div>
  );
}
