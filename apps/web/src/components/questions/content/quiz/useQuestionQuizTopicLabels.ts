import { useIntl } from 'react-intl';

import type { QuestionQuizTopic } from '../../common/QuestionsTypes';

export default function useQuestionQuizTopicLabels() {
  const intl = useIntl();

  const topicTitles: Record<QuestionQuizTopic, string> = {
    a11y: intl.formatMessage({
      defaultMessage: 'Accessibility',
      description: 'Accessibility topic for quiz questions',
      id: 'q0+3Lk',
    }),
    css: intl.formatMessage({
      defaultMessage: 'CSS',
      description: 'CSS topic for quiz questions',
      id: 'P4Or/u',
    }),
    html: intl.formatMessage({
      defaultMessage: 'HTML',
      description: 'HTML topic for quiz questions',
      id: 'Yb2e9Q',
    }),
    i18n: intl.formatMessage({
      defaultMessage: 'Internationalization',
      description: 'Internationalization topic for quiz questions',
      id: 'tonRki',
    }),
    javascript: intl.formatMessage({
      defaultMessage: 'JavaScript',
      description: 'JavaScript topic for quiz questions',
      id: 'w22UH7',
    }),
    network: intl.formatMessage({
      defaultMessage: 'Network',
      description: 'Network topic for quiz questions',
      id: 'pM/ZPq',
    }),
    performance: intl.formatMessage({
      defaultMessage: 'Performance',
      description: 'Performance topic for quiz questions',
      id: 'kwblYW',
    }),
    security: intl.formatMessage({
      defaultMessage: 'Security',
      description: 'Security topic for quiz questions',
      id: 'kvLlxS',
    }),
    testing: intl.formatMessage({
      defaultMessage: 'Testing',
      description: 'Testing topic for quiz questions',
      id: 'l9OWsu',
    }),
  };

  return topicTitles;
}
