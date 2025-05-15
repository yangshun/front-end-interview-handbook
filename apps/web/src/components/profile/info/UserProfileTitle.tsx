import clsx from 'clsx';
import { RiBuildingLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = 'body2' | 'body3';

type Props = Readonly<{
  size?: 'body2' | 'body3';
  userProfile: Readonly<{
    company: string | null;
    title: string | null;
  }>;
}>;

const iconClasses: Record<Size, string> = {
  body2: 'size-5',
  body3: 'size-4',
};

const gap: Record<Size, string> = {
  body2: 'gap-2',
  body3: 'gap-1',
};

export default function UserProfileTitle({
  size = 'body2',
  userProfile,
}: Props) {
  const { company, title } = userProfile;

  if (!title) {
    return null;
  }

  return (
    <div className={clsx('flex items-center', gap[size])}>
      <RiBuildingLine
        className={clsx(iconClasses[size], themeTextSecondaryColor, 'shrink-0')}
      />
      <Text className="line-clamp-1" color="secondary" size={size}>
        {company ? `${title} @ ${company}` : title}
      </Text>
    </div>
  );
}
