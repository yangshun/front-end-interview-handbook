import clsx from 'clsx';
import { upperFirst } from 'lodash-es';
import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { QuestionDifficulty } from '~/components/questions/common/QuestionsTypes';
import type { TextVariant } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

import { FireIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  children?: React.ReactNode;
  showIcon?: boolean;
  value: QuestionDifficulty;
  variant?: TextVariant;
}>;

const DifficultyLabelClasses: Record<QuestionDifficulty, string> = {
  easy: 'text-teal-500',
  hard: 'text-rose-500',
  medium: 'text-amber-500',
};

export default function QuestionDifficultyLabel({
  children,
  showIcon = false,
  value,
  variant = 'body3',
}: Props) {
  const intl = useIntl();
  const id = useId();

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Difficulty',
        description: 'Question difficulty label',
        id: 'NgxUnY',
      })}
      position="above">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Difficulty"
          description="Question difficulty label"
          id="NgxUnY"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        {showIcon && (
          <FireIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
          />
        )}
        <Text
          className={clsx(DifficultyLabelClasses[value])}
          color="inherit"
          variant={variant}>
          {children ?? upperFirst(value)}
        </Text>
      </div>
    </Tooltip>
  );
}
