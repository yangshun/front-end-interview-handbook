export const InterviewsMarketingDisplayTopics = [
  'a11y',
  'async',
  'css',
  'closure',
  'html',
  'i18n',
  'javascript',
  'networking',
  'oop',
  'performance',
  'react-hooks',
  'security',
  'web-api',
] as const;

export type QuestionTopicToDisplay =
  (typeof InterviewsMarketingDisplayTopics)[number];

export const InterviewsMarketingDisplayTopicsHrefs: Record<
  QuestionTopicToDisplay,
  string
> = {
  a11y: '/questions/formats/ui-coding',
  async: '/questions/formats/javascript-functions',
  closure: '/questions/formats/javascript-functions',
  css: '/questions/css-interview-questions/quiz',
  html: '/questions/html-interview-questions/quiz',
  i18n: '/questions/formats/quiz',
  javascript: '/questions/javascript-interview-questions/quiz',
  networking: '/questions/formats/quiz',
  oop: '/questions/javascript-interview-questions/quiz',
  performance: '/questions/formats/quiz',
  'react-hooks': '/questions/react-interview-questions',
  security: '/questions/formats/quiz',
  'web-api': '/questions/formats/quiz',
};
