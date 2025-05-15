import clsx from 'clsx';
import { useCallback } from 'react';
import { RiGraduationCapLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';
import type { ProjectsYoeReplacement } from '~/components/projects/types';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = 'body2' | 'body3';

type Props = Readonly<{
  size?: Size;
  userProfile: Readonly<{
    currentStatus: string | null;
    startWorkDate: Date | null;
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

export default function UserProfileExperience({
  size = 'body2',
  userProfile,
}: Props) {
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

  if (userProfile.currentStatus == null && userProfile.startWorkDate == null) {
    return null;
  }

  const yearsOfExperience = userProfile.startWorkDate
    ? calculateYearsOfExperience(userProfile.startWorkDate)
    : 0;

  return (
    <div className={clsx('flex items-center', gap[size])}>
      <RiGraduationCapLine
        className={clsx(iconClasses[size], themeTextSecondaryColor, 'shrink-0')}
      />
      <Text className="line-clamp-1" color="secondary" size={size}>
        {userProfile.startWorkDate ? (
          <FormattedMessage
            defaultMessage="{yoe} YOE"
            description="Years of experience"
            id="er6Ns7"
            values={{
              yoe: yearsOfExperience,
            }}
          />
        ) : userProfile.currentStatus &&
          userProfile.currentStatus in yoeOptionMap ? (
          yoeOptionMap[userProfile.currentStatus as ProjectsYoeReplacement]
            .label
        ) : (
          userProfile.currentStatus
        )}
      </Text>
    </div>
  );
}
