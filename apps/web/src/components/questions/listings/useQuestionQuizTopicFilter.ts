import { useIntl } from 'react-intl';

import { useUserPreferencesState } from '~/components/global/UserPreferencesProvider';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCategory } from './types';
import type { QuestionQuizTopic } from '../common/QuestionsTypes';
import useQuestionQuizTopicLabels from '../content/quiz/useQuestionQuizTopicLabels';

// The lower the earlier it appears.
const topicRanks: Record<QuestionQuizTopic, number> = {
  a11y: 3,
  css: 1,
  html: 2,
  i18n: 40,
  javascript: 0,
  network: 60,
  performance: 50,
  security: 80,
  testing: 99,
};

type Props = Readonly<{
  category: QuestionCategory;
}>;

export default function useQuestionQuizTopicFilter({
  category,
}: Props): [Set<QuestionQuizTopic>, QuestionFilter<QuestionQuizTopic>] {
  const intl = useIntl();
  const topicLabels = useQuestionQuizTopicLabels();
  const [topicFilters, setTopicFilters] = useUserPreferencesState<
    Set<QuestionQuizTopic>
  >(`${category}TopicFilters`, new Set());

  const topicFilterOptions: QuestionFilter<QuestionQuizTopic> = {
    id: 'topic',
    name: intl.formatMessage({
      defaultMessage: 'Topic',
      description: 'Question quiz topic',
      id: 'oieVuW',
    }),
    onChange: (value) => {
      const newTopics = new Set(topicFilters);

      newTopics.has(value) ? newTopics.delete(value) : newTopics.add(value);
      setTopicFilters(newTopics);
    },
    options: Object.keys(topicLabels)
      .sort(
        (a, b) =>
          topicRanks[a as QuestionQuizTopic] -
          topicRanks[b as QuestionQuizTopic],
      )
      .map((topic) => ({
        label: topicLabels[topic as QuestionQuizTopic],
        value: topic as QuestionQuizTopic,
      })),
  };

  return [topicFilters, topicFilterOptions];
}
