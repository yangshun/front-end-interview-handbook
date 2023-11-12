import clsx from 'clsx';
import type { ReactNode } from 'react';

import Text from '~/components/ui/Text';

import type { QuestionTopic } from '../common/QuestionsTypes';
import useQuestionTopicLabels from '../listings/filters/useQuestionTopicLabels';

const TopicLabelClasses: Record<QuestionTopic, string> = {
  a11y: 'bg-blue text-white',
  css: 'bg-sky-600 text-white',
  html: 'bg-orange-600 text-white',
  i18n: 'bg-neutral-700 text-white',
  javascript: 'bg-yellow-500 text-black',
  network: 'bg-teal-400 text-white',
  performance: 'bg-indigo-500 text-white',
  security: 'bg-red text-white',
  testing: 'bg-green-dark text-white',
};

export default function QuestionTopicLabel({
  value,
}: Readonly<{ children?: ReactNode; value: QuestionTopic }>) {
  const topicLabels = useQuestionTopicLabels();

  return (
    <Text
      className={clsx(
        'inline-flex items-center rounded px-2 py-0.5',
        TopicLabelClasses[value],
      )}
      color="inherit"
      size="body3"
      weight="bold">
      {topicLabels[value].label.toLocaleUpperCase()}
    </Text>
  );
}
