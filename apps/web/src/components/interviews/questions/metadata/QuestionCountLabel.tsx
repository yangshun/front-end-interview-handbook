import clsx from 'clsx';
import { useId } from 'react';
import { RiBookOpenLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  color?: 'default' | 'inherit';
  count: number;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label?: string;
  showIcon?: boolean;
  showQuestionsLabel?: boolean;
  size?: TextSize;
}>;

export default function QuestionCountLabel({
  count,
  color = 'default',
  icon,
  label: labelProp,
  showQuestionsLabel = true,
  showIcon = false,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const defaultLabel = intl.formatMessage({
    defaultMessage: 'Number of questions',
    description: 'Total number of questions in a list',
    id: 'fRGOI+',
  });
  const label = labelProp ?? defaultLabel;

  const Icon = icon ?? RiBookOpenLine;

  return (
    <Tooltip label={label}>
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <Icon
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
          {showQuestionsLabel ? (
            <FormattedMessage
              defaultMessage="{numberOfQuestions, plural, =0 {No questions} one {1 question} other {# questions}}"
              description="Number of questions in a list"
              id="Ghc5ye"
              values={{
                numberOfQuestions: count,
              }}
            />
          ) : (
            count
          )}
        </Text>
      </div>
    </Tooltip>
  );
}
