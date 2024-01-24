import clsx from 'clsx';
import { useCallback } from 'react';
import { RiGraduationCapLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';
import type { YOEReplacement } from '~/components/projects/types';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = 'sm' | 'xs';

type Props = Readonly<{
  profile: Readonly<{
    currentStatus: string | null;
    startWorkDate: Date | null;
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

export default function UserProfileExperience({ profile, size = 'sm' }: Props) {
  const { yoeOptionMap } = useProjectsYOEReplacementOptions();

  const calculateYearsOfExperience = useCallback((timestamp: Date) => {
    const startDate = new Date(timestamp);
    const currentDate = new Date();

    return (
      currentDate.getFullYear() -
      startDate.getFullYear() +
      (currentDate.getMonth() < startDate.getMonth() ? -1 : 0)
    );
  }, []);

  if (profile.currentStatus == null && profile.startWorkDate == null) {
    return null;
  }

  const yearsOfExperience = profile.startWorkDate
    ? calculateYearsOfExperience(profile.startWorkDate)
    : 0;

  return (
    <div className={clsx('flex items-center', gap[size])}>
      <RiGraduationCapLine
        className={clsx(iconClasses[size], themeTextSecondaryColor)}
      />
      <Text className={textClasses[size]} color="secondary" size="inherit">
        {profile.startWorkDate ? (
          <FormattedMessage
            defaultMessage="{yoe} YOE"
            description="Years of experience"
            id="er6Ns7"
            values={{
              yoe: yearsOfExperience,
            }}
          />
        ) : (
          profile.currentStatus &&
          yoeOptionMap[profile.currentStatus as YOEReplacement].label
        )}
      </Text>
    </div>
  );
}
