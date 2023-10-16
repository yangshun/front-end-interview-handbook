import clsx from 'clsx';
import { useId } from 'react';
import { RiFireLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { QuestionDifficulty } from '~/components/questions/common/QuestionsTypes';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  showIcon?: boolean;
  size?: TextSize;
  value: QuestionDifficulty;
}>;

const DifficultyLabelClasses: Record<QuestionDifficulty, string> = {
  easy: 'text-green',
  hard: 'text-red',
  medium: 'text-yellow-500',
};

export default function QuestionDifficultyLabel({
  showIcon = false,
  value,
  size = 'body3',
}: Props) {
  const intl = useIntl();
  const id = useId();
  const labels: Record<QuestionDifficulty, string> = {
    easy: intl.formatMessage({
      defaultMessage: 'Easy',
      description: 'Easy question difficulty',
      id: 'ldOgfx',
    }),
    hard: intl.formatMessage({
      defaultMessage: 'Hard',
      description: 'Hard question difficulty',
      id: 'zw0Ov8',
    }),
    medium: intl.formatMessage({
      defaultMessage: 'Medium',
      description: 'Medium question difficulty',
      id: 'gtouN7',
    }),
  };
  const label = intl.formatMessage({
    defaultMessage: 'Difficulty',
    description: 'Question difficulty label',
    id: 'NgxUnY',
  });

  return (
    <Tooltip label={label} position="above">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiFireLine
            aria-hidden="true"
            className={clsx('h-5 w-5 flex-shrink-0', themeIconColor)}
          />
        )}
        <Text
          className={clsx(DifficultyLabelClasses[value])}
          color="inherit"
          size={size}>
          {labels[value]}
        </Text>
      </div>
    </Tooltip>
  );
}