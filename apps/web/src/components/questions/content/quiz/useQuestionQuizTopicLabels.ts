import type { QuestionQuizTopic } from '../../common/QuestionsTypes';

export default function useQuestionQuizTopicLabels() {
  const topicTitles: Record<QuestionQuizTopic, string> = {
    a11y: 'Accessibility',
    css: 'CSS',
    html: 'HTML',
    i18n: 'Internationalization',
    javascript: 'JavaScript',
    network: 'Network',
    performance: 'Performance',
    security: 'Security',
    testing: 'Testing',
  };

  return topicTitles;
}
