import clsx from 'clsx';
import { useId } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  frequency?: 'daily' | 'weekly';
  hours: number;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function QuestionStudyAllocationLabel({
  showIcon = false,
  hours,
  frequency,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Recommended duration',
    description:
      'Recommended duration tooltip displayed on question cards found on question lists',
    id: 'n8q6oB',
  });

  return (
    <Tooltip label={label} position="above">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiTimeLine
            aria-hidden="true"
            className={clsx('h-5 w-5 flex-shrink-0', themeIconColor)}
          />
        )}
        <Text
          className="whitespace-nowrap text-neutral-700 dark:text-neutral-500"
          color="inherit"
          size={size}>
          {(() => {
            switch (frequency) {
              case 'daily':
                return (
                  <FormattedMessage
                    defaultMessage="{numberOfHours} hours daily"
                    description="Number of hours needed on a daily basis. E.g. 4 hours daily"
                    id="869F+x"
                    values={{
                      numberOfHours: hours,
                    }}
                  />
                );
              case 'weekly':
                return (
                  <FormattedMessage
                    defaultMessage="{numberOfHours} hours weekly"
                    description="Number of hours needed on a weekly basis. E.g. 4 hours weekly"
                    id="WB/L0V"
                    values={{
                      numberOfHours: hours,
                    }}
                  />
                );
            }
          })()}
        </Text>
      </div>
    </Tooltip>
  );
}
