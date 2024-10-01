import clsx from 'clsx';
import { RiRocketLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  completed: number;
  tooltip?: string;
  total: number;
}>;

export default function ProjectsChallengeFractionalCompletedTag({
  completed,
  tooltip,
  total,
}: Props) {
  const contents = (
    <div className={clsx('flex items-center gap-1')}>
      <RiRocketLine
        aria-hidden={true}
        className={clsx('size-4 shrink-0', themeTextSubtleColor)}
      />
      <Text color="subtle" size="body3">
        <FormattedMessage
          defaultMessage="{totalCount, plural, one {<bold>{completedCount}</bold>/# challenge} other {<bold>{completedCount}</bold>/# challenges}}"
          description="Rep count label in Projects"
          id="23zW1O"
          values={{
            bold: (chunks) => (
              <Text color="secondary" size="body2" weight="medium">
                {chunks}
              </Text>
            ),
            completedCount: completed,
            totalCount: total,
          }}
        />
      </Text>
    </div>
  );

  return (
    <> {tooltip ? <Tooltip label={tooltip}>{contents}</Tooltip> : contents}</>
  );
}
