import clsx from 'clsx';
import { RiGraduationCapLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Props = Readonly<{ yearsOfExperience: number }>;

export default function ProjectsUserYearsOfExperience({
  yearsOfExperience: yearsOfExperience,
}: Props) {
  return (
    <div className={clsx('flex items-center gap-1', themeTextSecondaryColor)}>
      <RiGraduationCapLine className="h-4 w-4" />
      <Text color="inherit" size="body2">
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
