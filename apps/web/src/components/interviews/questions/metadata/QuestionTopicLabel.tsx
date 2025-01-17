import clsx from 'clsx';
import type { ReactNode } from 'react';

import Text from '~/components/ui/Text';
import { themeBackgroundCardNoAlphaColor } from '~/components/ui/theme';

import type { QuestionTopic } from '../common/QuestionsTypes';
import useQuestionTopicLabels from '../listings/items/useQuestionTopicLabels';

export default function QuestionTopicLabel({
  value,
}: Readonly<{ children?: ReactNode; value: QuestionTopic }>) {
  const topicLabels = useQuestionTopicLabels();

  return (
    <Text
      className={clsx(
        'inline-flex items-center',
        'rounded',
        'px-2 py-0.5',
        themeBackgroundCardNoAlphaColor,
      )}
      color="secondary"
      size="body3"
      weight="medium">
      {topicLabels[value].label}
    </Text>
  );
}
