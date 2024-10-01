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

export default function QuestionDurationLabel({
  showIcon = false,
  mins,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Recommended duration to spend during interviews',
    description:
      'Recommended duration tooltip displayed on question cards found on question lists',
    id: 'lD302L',
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
            defaultMessage="{duration} mins"
            description="Actual value for recommended duration that the user should take to complete a question, displayed on question cards found on question lists"
            id="PfOyMR"
            values={{
              duration: mins,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
