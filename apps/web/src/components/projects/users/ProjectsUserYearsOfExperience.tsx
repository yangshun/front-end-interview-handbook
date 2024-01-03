import clsx from 'clsx';
import { RiGraduationCapLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = '2xs' | 'sm';

type Props = Readonly<{ size?: Size; yearsOfExperience: number }>;

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

export default function ProjectsUserYearsOfExperience({
  yearsOfExperience: yearsOfExperience,
  size = 'sm',
}: Props) {
  return (
    <div
      className={clsx('flex items-center', themeTextSecondaryColor, gap[size])}>
      <RiGraduationCapLine className={iconClasses[size]} />
      <Text className={textClasses[size]} color="inherit" size="custom">
        <FormattedMessage
          defaultMessage="{yearCount} YOE"
          description="Label showing years of experience of a user"
          id="2akDIG"
          values={{ yearCount: yearsOfExperience }}
        />
      </Text>
    </div>
  );
}
