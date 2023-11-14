import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Props = Readonly<{
  repCount: number;
}>;

export default function ProjectsReputationCount({ repCount }: Props) {
  return (
    <div className={clsx('flex items-center gap-1', themeTextSecondaryColor)}>
      <RiFireLine className="h-5 w-5" />
      <Text color='inherit' size="body2">
        <FormattedMessage
          defaultMessage="{repCount} rep"
          description="Rep count label in Projects"
          id="Udnya7"
          values={{
            repCount,
          }}
        />
      </Text>
    </div>
  );
}
