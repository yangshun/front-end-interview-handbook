import { RiJavascriptFill } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme_DEPRECATED } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea_DEPRECATED } from '../FocusAreas';

export function getFocusAreaJavaScriptPolyfills(
  intl: IntlShape,
): FocusArea_DEPRECATED {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Targeted practice on JavaScript Polyfills interview questions',
      description: 'Description for interview preparation focus area',
      id: '7+uXHt',
    }),
    href: '/focus-areas/javascript-polyfills',
    longName: intl.formatMessage({
      defaultMessage: 'JavaScript Polyfills',
      description: 'Name of focus area questions',
      id: '9Q8e4/',
    }),
    name: intl.formatMessage({
      defaultMessage: 'JavaScript Polyfills',
      description: 'Name of focus area questions',
      id: '9Q8e4/',
    }),
    questions: {
      algo: [],
      javascript: [
        'array-at',
        'array-concat',
        'array-filter',
        'array-map',
        'array-reduce',
        'event-emitter',
        'event-emitter-ii',
        'find-index',
        'find-last-index',
        'flatten',
        'function-apply',
        'function-bind',
        'function-call',
        'get-elements-by-class-name',
        'get-elements-by-tag-name',
        'get-elements-by-tag-name-hierarchy',
        'json-stringify',
        'promise-all',
        'promise-all-settled',
        'promise-any',
        'promise-race',
        'promise-reject',
        'promise-resolve',
        'promise-with-resolvers',
        'type-utilities',
        'type-utilities-ii',
      ],
      quiz: [],
      'system-design': [],
      'user-interface': [],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice JavaScript Polyfills interview questions by implementing JS and DOM APIs from scratch. Code in-browser with solutions by ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: 'LmjB8K',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage:
          'JavaScript Polyfills Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: '30sSdR',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Practice JavaScript Polyfills Interview Questions with Solutions',
        description: 'Title for interview preparation focus area',
        id: '7aqW08',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Gain proficiency in front end fundamentals by implementing JavaScript and DOM APIs from scratch.',
      description: 'Description for interview preparation focus area',
      id: 'YGqz7y',
    }),
    type: 'javascript-polyfills',
  };
}

const gradient: ThemeGradient<'#f7df1e', '#f7df1e'> = {
  className: 'bg-[linear-gradient(133.77deg,_#f7df1e_0%,_#f7df1e_97.95%)]',
  endColor: '#f7df1e',
  startColor: '#f7df1e',
};

export function getFocusAreaThemeJavaScriptPolyfills(): QuestionListTheme_DEPRECATED {
  return {
    gradient,
    iconOutline: RiJavascriptFill,
    iconSolid: RiJavascriptFill,
  };
}
