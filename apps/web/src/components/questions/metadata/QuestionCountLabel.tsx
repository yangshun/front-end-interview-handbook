import clsx from 'clsx';
import { useId } from 'react';
import { RiBookOpenLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  count: number;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function QuestionCountLabel({
  showIcon = false,
  count,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Number of questions',
    description: 'Total number of questions in a list',
    id: 'fRGOI+',
  });

  return (
    <Tooltip label={label} position="above">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiBookOpenLine
            aria-hidden="true"
            className={clsx('h-5 w-5 flex-shrink-0', themeIconColor)}
          />
        )}
        <Text
          className="whitespace-nowrap text-neutral-700 dark:text-neutral-500"
          color="inherit"
          size={size}>
          <FormattedMessage
            defaultMessage="{numberOfQuestions} questions"
            description="Number of questions in a list"
            id="L/qzr6"
            values={{
              numberOfQuestions: count,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
