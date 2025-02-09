import clsx from 'clsx';
import { useId } from 'react';
import { RiTimeLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import NumberFlow from '@number-flow/react';

type Props = Readonly<{
  color?: 'default' | 'inherit';
  mins: number;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function QuestionTotalTimeLabel({
  showIcon = false,
  mins,
  size = 'body3',
  color = 'default',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Total time',
    description: 'Total time needed to complete the questions',
    id: 'ImDbLo',
  });

  const numberOfHours = Math.ceil(mins / 60);

  return (
    <Tooltip label={label}>
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiTimeLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
          />
        )}
        <Text
          className={clsx(
            'whitespace-nowrap',
            color === 'default' && 'text-neutral-700 dark:text-neutral-500',
          )}
          color="inherit"
          size={size}>
          <FormattedMessage
            defaultMessage="{numberOfHours, plural, =1 {<number>#</number> hour total} other {<number>#</number> hours total}}"
            description="Number of applied filters"
            id="oMKaYH"
            values={{
              number: () => <NumberFlow value={numberOfHours} />,
              numberOfHours,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
