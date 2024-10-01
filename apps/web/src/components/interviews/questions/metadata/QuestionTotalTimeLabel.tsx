import clsx from 'clsx';
import { useId } from 'react';
import { RiTimeLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  mins: number;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function QuestionTotalTimeLabel({
  showIcon = false,
  mins,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Total time',
    description: 'Total time needed to complete the questions',
    id: 'ImDbLo',
  });

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
          className="whitespace-nowrap text-neutral-700 dark:text-neutral-500"
          color="inherit"
          size={size}>
          <FormattedMessage
            defaultMessage="{numberOfHours} hours total"
            description="Total duration needed to complete the list of questions"
            id="sGSrxk"
            values={{
              numberOfHours: Math.ceil(mins / 60),
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
