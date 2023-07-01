import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type {
  QuestionQuizMetadata,
  QuestionQuizTopic,
} from '~/components/questions/common/QuestionsTypes';
import useQuestionQuizTopicLabels from '~/components/questions/content/quiz/useQuestionQuizTopicLabels';

import type { QuestionFilter } from '../QuestionFilterType';

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
  namespace: string;
}>;

export default function useQuestionQuizTopicFilter({
  namespace,
}: Props): [
  Set<QuestionQuizTopic>,
  QuestionFilter<QuestionQuizTopic, QuestionQuizMetadata>,
] {
  const intl = useIntl();
  const topicLabels = useQuestionQuizTopicLabels();
  const [topicFilters, setTopicFilters] =
    useSessionStorageForSets<QuestionQuizTopic>(
      `gfe:${namespace}:topic-filter`,
      new Set(),
    );
  const topicFilterOptions: QuestionFilter<
    QuestionQuizTopic,
    QuestionQuizMetadata
  > = {
    id: 'topic',
    matches: (question) =>
      topicFilters.size === 0 ||
      question.topics.some((topic) => topicFilters.has(topic)),
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
        icon: topicLabels[topic as QuestionQuizTopic].icon,
        label: topicLabels[topic as QuestionQuizTopic].label,
        value: topic as QuestionQuizTopic,
      })),
  };

  return [topicFilters, topicFilterOptions];
}
