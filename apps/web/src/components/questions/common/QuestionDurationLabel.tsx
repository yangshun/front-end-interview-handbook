import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TextVariant } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

import { ClockIcon } from '@heroicons/react/24/outline';
type Props = Readonly<{
  mins: number;
  showIcon?: boolean;
  variant?: TextVariant;
}>;

export default function QuestionDurationLabel({
  showIcon = false,
  mins,
  variant = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Recommended Duration',
        description:
          'Recommended duration tooltip displayed on question cards found on question lists',
        id: 'BtCbN4',
      })}
      position="above">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Recommended Duration"
          description="Recommended duration tooltip displayed on question cards found on question lists"
          id="BtCbN4"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        {showIcon && (
          <ClockIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
          />
        )}
        <Text className="whitespace-nowrap" color="secondary" variant={variant}>
          <FormattedMessage
            defaultMessage="{mins} mins"
            description="Actual value for recommended duration that the user should take to complete a question, displayed on question cards found on question lists"
            id="opQRju"
            values={{
              mins,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
