import { useState } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type {
  QuestionMetadata,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionTopicLabels from '~/components/interviews/questions/listings/items/useQuestionTopicLabels';
import { useIntl } from '~/components/intl';

import type { QuestionFilter } from '../QuestionFilterType';

// The lower the earlier it appears.
const topicRanks: Record<QuestionTopic, number> = {
  a11y: 3,
  array: 99,
  async: 99,
  bfs: 99,
  binary: 99,
  'binary-search': 99,
  'binary-search-tree': 99,
  'binary-tree': 99,
  browser: 99,
  closure: 99,
  css: 1,
  dfs: 99,
  'dynamic-programming': 99,
  graph: 99,
  greedy: 99,
  heap: 99,
  html: 2,
  i18n: 40,
  intervals: 99,
  javascript: 0,
  'linked-list': 99,
  matrix: 99,
  networking: 60,
  oop: 0,
  performance: 50,
  queue: 99,
  react: 0,
  recursion: 99,
  security: 80,
  seo: 99,
  sorting: 99,
  stack: 99,
  string: 99,
  testing: 99,
  'topological-sort': 99,
  tree: 99,
  trie: 99,
  'ui-component': 99,
  'web-api': 99,
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
    useGreatStorageLocal<Set<QuestionTopic>>(
      `qns:${namespace}:filter:topic`,
      new Set(initialValue),
      {
        ttl: 24 * 60 * 60,
      },
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
