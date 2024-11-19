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
    async: {
      label: intl.formatMessage({
        defaultMessage: 'Async',
        description: 'Front end development topic',
        id: 'ezEYel',
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
    graph: {
      label: intl.formatMessage({
        defaultMessage: 'Graph',
        description: 'Front end development topic',
        id: 'F8ULPJ',
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
    javascript: {
      label: 'JavaScript',
    },
    networking: {
      label: intl.formatMessage({
        defaultMessage: 'Networking',
        description: 'Front end development topic',
        id: 'ZutazH',
      }),
    },
    oop: {
      label: intl.formatMessage({
        defaultMessage: 'OOP',
        description: 'Front end development topic',
        id: '9a88P6',
      }),
    },
    performance: {
      label: intl.formatMessage({
        defaultMessage: 'Performance',
        description: 'Front end development topic',
        id: 'd1LTa+',
      }),
    },
    react: {
      label: intl.formatMessage({
        defaultMessage: 'React',
        description: 'Front end development topic',
        id: 'J4hWfE',
      }),
    },
    recursion: {
      label: intl.formatMessage({
        defaultMessage: 'Recursion',
        description: 'Front end development topic',
        id: 'trRb9Z',
      }),
    },
    security: {
      label: intl.formatMessage({
        defaultMessage: 'Security',
        description: 'Front end development topic',
        id: '4MzF6x',
      }),
    },
    seo: {
      label: intl.formatMessage({
        defaultMessage: 'SEO',
        description: 'Front end development topic',
        id: 'HY/9dZ',
      }),
    },
    testing: {
      label: intl.formatMessage({
        defaultMessage: 'Testing',
        description: 'Front end development topic',
        id: 'QwoKre',
      }),
    },
    tree: {
      label: intl.formatMessage({
        defaultMessage: 'Tree',
        description: 'Front end development topic',
        id: 'Rs1Xi9',
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
