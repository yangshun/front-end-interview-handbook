import clsx from 'clsx';
import type { ReactNode } from 'react';

import Text from '~/components/ui/Text';

import type { QuestionTopic } from '../common/QuestionsTypes';
import useQuestionTopicLabels from '../listings/filters/useQuestionTopicLabels';

const TopicLabelClasses: Record<QuestionTopic, string> = {
  a11y: 'bg-pink-500 text-white dark:bg-neutral-800 dark:text-pink-500',
  async: '',
  browser: '',
  closure: '',
  css: 'bg-sky-500 text-white dark:bg-neutral-800 dark:text-sky-500',
  graph: '',
  html: 'bg-orange-600 text-white dark:bg-neutral-800 dark:text-orange-600',
  i18n: 'bg-neutral-700 text-white dark:bg-neutral-800 dark:text-neutral-300',
  javascript:
    'bg-yellow-500 text-black dark:bg-neutral-800 dark:text-yellow-500',
  networking: 'bg-teal-400 text-white dark:bg-neutral-800 dark:text-teal-400',
  oop: '',
  performance:
    'bg-indigo-500 text-white dark:bg-neutral-800 dark:text-indigo-400',
  recursion: '',
  security: 'bg-red text-white dark:bg-neutral-800 dark:text-red',
  testing: 'bg-green-dark text-white dark:bg-neutral-800 dark:text-green',
  tree: '',
  'web-api': '',
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
