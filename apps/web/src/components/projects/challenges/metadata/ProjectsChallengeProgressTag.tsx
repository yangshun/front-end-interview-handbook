import clsx from 'clsx';
import { RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  completed: number;
  gapClass?: string;
  showProgress?: boolean;
  tooltip?: string;
  total: number;
  variant?: 'normal' | 'skills-roadmap';
}>;

export default function ProjectsChallengeProgressTag({
  completed,
  gapClass = 'gap-1',
  showProgress = true,
  tooltip,
  total,
  variant = 'normal',
}: Props) {
  const intl = useIntl();

  const contents = (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiRocketLine aria-hidden={true} className="size-4 shrink-0" />
      <Text color="inherit" size="body3">
        {variant === 'normal' && (
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
        )}
        {variant === 'skills-roadmap' && (
          <FormattedMessage
            defaultMessage="<bold>{completedCount}</bold>/{totalCount} skill plan challenges"
            description="Rep count label in Projects"
            id="r5RGzk"
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
        )}
      </Text>
    </div>
  );

  return (
    <div className={clsx('flex items-center', gapClass)}>
      {tooltip ? <Tooltip label={tooltip}>{contents}</Tooltip> : contents}
      {showProgress && (
        <div>
          <ProgressBar
            backgroundClass="neutral-200/70 dark:bg-neutral-700"
            heightClass="h-1.5"
            label={intl.formatMessage(
              {
                defaultMessage:
                  'Label for "Completed projects" progress bar of a Projects component track',
                description: '{completedCount} out of {totalCount} challenges',
                id: 'GSfE/S',
              },
              {
                completedCount: completed,
                totalCount: total,
              },
            )}
            total={total}
            value={completed}
          />
        </div>
      )}
    </div>
  );
}
