import clsx from 'clsx';
import { useId } from 'react';
import React from 'react';

import { useQuestionFormatsData } from '~/data/QuestionCategories';

import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  showIcon?: boolean;
  size?: TextSize;
  value: QuestionFormat;
}>;

export default function QuestionFormatLabel({
  showIcon = false,
  size = 'body3',
  value,
}: Props) {
  const questionFormatsData = useQuestionFormatsData();
  const id = useId();
  const { icon: Icon, label, shortLabel, tooltip } = questionFormatsData[value];

  return (
    <Tooltip label={tooltip}>
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
          className="whitespace-nowrap text-neutral-700 dark:text-neutral-500"
          color="inherit"
          size={size}>
          {shortLabel}
        </Text>
      </div>
    </Tooltip>
  );
}
