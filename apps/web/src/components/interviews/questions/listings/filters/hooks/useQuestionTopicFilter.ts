import { useState } from 'react';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type {
  QuestionMetadata,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionTopicLabels from '~/components/interviews/questions/listings/filters/useQuestionTopicLabels';
import { useIntl } from '~/components/intl';

import type { QuestionFilter } from '../QuestionFilterType';

// The lower the earlier it appears.
const topicRanks: Record<QuestionTopic, number> = {
  a11y: 3,
  async: 0,
  browser: 0,
  closure: 0,
  css: 1,
  graph: 0,
  html: 2,
  i18n: 40,
  javascript: 0,
  networking: 60,
  oop: 0,
  performance: 50,
  recursion: 0,
  security: 80,
  testing: 99,
  tree: 0,
  'web-api': 0,
};

type Props = Readonly<{
  initialValue?: ReadonlyArray<QuestionTopic>;
  namespace?: string;
}>;

export default function useQuestionTopicFilter(
  props?: Props,
): [Set<QuestionTopic>, QuestionFilter<QuestionTopic, QuestionMetadata>] {
  const { initialValue, namespace } = props || {};
  const intl = useIntl();
  const topicLabels = useQuestionTopicLabels();
  const [topicFiltersState, setTopicFiltersState] = useState<
    Set<QuestionTopic>
  >(new Set(initialValue));
  const [topicFiltersSessionStorage, setTopicFiltersSessionStorage] =
    useSessionStorageForSets<QuestionTopic>(
      `gfe:${namespace}:topic-filter`,
      new Set(initialValue),
    );

  // Conditionally select which hook's state to use
  const topicFilters = namespace
    ? topicFiltersSessionStorage
    : topicFiltersState;
  const setTopicFilters = namespace
    ? setTopicFiltersSessionStorage
    : setTopicFiltersState;

  const topicFilterOptions: QuestionFilter<QuestionTopic, QuestionMetadata> = {
    id: 'topic',
    matches: (question) =>
      topicFilters.size === 0 ||
      question.topics.some((topic) => topicFilters.has(topic)),
    name: intl.formatMessage({
      defaultMessage: 'Topics',
      description: 'Question quiz topic',
      id: 'edBcYW',
    }),
    onChange: (value) => {
      const newTopics = new Set(topicFilters);

      newTopics.has(value) ? newTopics.delete(value) : newTopics.add(value);
      setTopicFilters(newTopics);
    },
    onClear: () => {
      setTopicFilters(new Set());
    },
    options: Object.keys(topicLabels)
      .sort(
        (a, b) =>
          topicRanks[a as QuestionTopic] - topicRanks[b as QuestionTopic],
      )
      .map((topic) => ({
        label: topicLabels[topic as QuestionTopic].label,
        value: topic as QuestionTopic,
      })),
    setValues: setTopicFilters,
  };

  return [topicFilters, topicFilterOptions];
}
