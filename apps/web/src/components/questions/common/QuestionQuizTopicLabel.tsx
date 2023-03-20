import clsx from 'clsx';
import type { ReactNode } from 'react';

import Text from '~/components/ui/Text';

import type { QuestionQuizTopic } from './QuestionsTypes';
import useQuestionQuizTopicLabels from '../content/quiz/useQuestionQuizTopicLabels';

const TopicLabelClasses: Record<QuestionQuizTopic, string> = {
  a11y: 'bg-blue-400 text-white',
  css: 'bg-sky-600 text-white',
  html: 'bg-orange-600 text-white',
  i18n: 'bg-slate-700 text-white',
  javascript: 'bg-yellow-400 text-black',
  network: 'bg-teal-400 text-white',
  performance: 'bg-indigo-500 text-white',
  security: 'bg-amber-400 text-black',
  testing: 'bg-green-400 text-white',
};

export default function QuestionQuizTopicLabel({
  value,
}: Readonly<{ children?: ReactNode; value: QuestionQuizTopic }>) {
  const topicLabels = useQuestionQuizTopicLabels();

  return (
    <Text
      className={clsx(
        'inline-flex items-center rounded px-2 py-0.5',
        TopicLabelClasses[value],
      )}
      color="inherit"
      variant="body3"
      weight="bold">
      {topicLabels[value].toLocaleUpperCase()}
    </Text>
  );
}
