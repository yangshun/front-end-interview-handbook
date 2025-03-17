import { useIntl } from '~/components/intl';

import type { QuestionTopic } from '../../common/QuestionsTypes';

export default function useQuestionTopicLabels() {
  const intl = useIntl();

  const topicTitles: Record<
    QuestionTopic,
    Readonly<{
      label: string;
    }>
  > = {
    a11y: {
      label: intl.formatMessage({
        defaultMessage: 'Accessibility',
        description: 'Front end development topic',
        id: 'TbZTWa',
      }),
    },
    array: {
      label: intl.formatMessage({
        defaultMessage: 'Array',
        description: 'Computer science topic',
        id: '0ZP3Ts',
      }),
    },
    async: {
      label: intl.formatMessage({
        defaultMessage: 'Async',
        description: 'Front end development topic',
        id: 'ezEYel',
      }),
    },
    bfs: {
      label: intl.formatMessage({
        defaultMessage: 'Breadth-first search',
        description: 'Computer science topic',
        id: 'NZKztk',
      }),
    },
    binary: {
      label: intl.formatMessage({
        defaultMessage: 'Binary',
        description: 'Computer science topic',
        id: '+nHCR2',
      }),
    },
    'binary-search': {
      label: intl.formatMessage({
        defaultMessage: 'Binary search',
        description: 'Computer science algorithm',
        id: '8jSm6h',
      }),
    },
    'binary-search-tree': {
      label: intl.formatMessage({
        defaultMessage: 'Binary search tree',
        description: 'Computer science data structure',
        id: '7b8bt1',
      }),
    },
    'binary-tree': {
      label: intl.formatMessage({
        defaultMessage: 'Binary tree',
        description: 'Computer science data structure',
        id: 'J7mnO8',
      }),
    },
    browser: {
      label: intl.formatMessage({
        defaultMessage: 'Browser',
        description: 'Front end development topic',
        id: '+4J3PK',
      }),
    },
    closure: {
      label: intl.formatMessage({
        defaultMessage: 'Closure',
        description: 'Front end development topic',
        id: 'MMLnqG',
      }),
    },
    css: {
      label: 'CSS',
    },
    dfs: {
      label: intl.formatMessage({
        defaultMessage: 'Depth-first search',
        description: 'Computer science algorithm',
        id: 'SnhoqJ',
      }),
    },
    'dynamic-programming': {
      label: intl.formatMessage({
        defaultMessage: 'Dynamic programming',
        description: 'Computer science topic',
        id: '1gk5Pf',
      }),
    },
    graph: {
      label: intl.formatMessage({
        defaultMessage: 'Graph',
        description: 'Computer science data structure',
        id: 'WAaivX',
      }),
    },
    greedy: {
      label: intl.formatMessage({
        defaultMessage: 'Greedy',
        description: 'Computer science algorithm',
        id: 'LDHRu2',
      }),
    },
    heap: {
      label: intl.formatMessage({
        defaultMessage: 'Heap',
        description: 'Computer science data structure',
        id: 'to34Rt',
      }),
    },
    html: {
      label: 'HTML',
    },
    i18n: {
      label: intl.formatMessage({
        defaultMessage: 'Internationalization',
        description: 'Front end development topic',
        id: 'Oykw81',
      }),
    },
    intervals: {
      label: intl.formatMessage({
        defaultMessage: 'Intervals',
        description: 'Computer science algorithms data structure',
        id: '/3fbsW',
      }),
    },
    javascript: {
      label: 'JavaScript',
    },
    'linked-list': {
      label: intl.formatMessage({
        defaultMessage: 'Linked list',
        description: 'Computer science data structure',
        id: '52NgJr',
      }),
    },
    matrix: {
      label: intl.formatMessage({
        defaultMessage: 'Matrix',
        description: 'Computer science data structure',
        id: 'p31t35',
      }),
    },
    networking: {
      label: intl.formatMessage({
        defaultMessage: 'Networking',
        description: 'Computer science topic',
        id: 'NzHpGm',
      }),
    },
    oop: {
      label: intl.formatMessage({
        defaultMessage: 'OOP',
        description: 'Computer science topic',
        id: 'tWtbVf',
      }),
    },
    performance: {
      label: intl.formatMessage({
        defaultMessage: 'Performance',
        description: 'Front end development topic',
        id: 'd1LTa+',
      }),
    },
    queue: {
      label: intl.formatMessage({
        defaultMessage: 'Queue',
        description: 'Computer science data structure',
        id: '+uklHy',
      }),
    },
    react: {
      label: intl.formatMessage({
        defaultMessage: 'React',
        description: 'Front end development topic',
        id: 'J4hWfE',
      }),
    },
    'react-hooks': {
      label: intl.formatMessage({
        defaultMessage: 'React Hooks',
        description: 'Front end development topic',
        id: '6jw6wS',
      }),
    },
    recursion: {
      label: intl.formatMessage({
        defaultMessage: 'Recursion',
        description: 'Computer science topic',
        id: 'E5WE+V',
      }),
    },
    security: {
      label: intl.formatMessage({
        defaultMessage: 'Security',
        description: 'Computer science topic',
        id: 'tM5fjO',
      }),
    },
    seo: {
      label: intl.formatMessage({
        defaultMessage: 'SEO',
        description: 'Front end development topic',
        id: 'HY/9dZ',
      }),
    },
    sorting: {
      label: intl.formatMessage({
        defaultMessage: 'Sorting',
        description: 'Computer science algorithm',
        id: 'HYUdzA',
      }),
    },
    stack: {
      label: intl.formatMessage({
        defaultMessage: 'Stack',
        description: 'Computer science data structure',
        id: 'd/YjsO',
      }),
    },
    string: {
      label: intl.formatMessage({
        defaultMessage: 'String',
        description: 'Computer science data structure',
        id: 'njjJbJ',
      }),
    },
    testing: {
      label: intl.formatMessage({
        defaultMessage: 'Testing',
        description: 'Front end development topic',
        id: 'QwoKre',
      }),
    },
    'topological-sort': {
      label: intl.formatMessage({
        defaultMessage: 'Topological sort',
        description: 'Computer science algorithm',
        id: 'SiShj/',
      }),
    },
    tree: {
      label: intl.formatMessage({
        defaultMessage: 'Tree',
        description: 'Computer science data structure',
        id: 'BRZJBS',
      }),
    },
    trie: {
      label: intl.formatMessage({
        defaultMessage: 'Trie',
        description: 'Computer science data structure',
        id: 'hurk0k',
      }),
    },
    'ui-component': {
      label: intl.formatMessage({
        defaultMessage: 'UI component',
        description: 'Front end development topic',
        id: 'kxzXZj',
      }),
    },
    'web-api': {
      label: intl.formatMessage({
        defaultMessage: 'Web APIs',
        description: 'Front end development topic',
        id: 'a1RZkG',
      }),
    },
  };

  return topicTitles;
}
