import { RiJavascriptFill } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaJavaScriptPolyfills(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Gain proficiency in front end fundamentals by implementing JavaScript and DOM APIs from scratch.',
      description: 'Description for interview preparation focus area',
      id: 'YGqz7y',
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
      javascript: [
        'array-at',
        'array-filter',
        'array-map',
        'array-reduce',
        'event-emitter',
        'event-emitter-ii',
        'event-emitter-ii',
        'find-index',
        'find-last-index',
        'flatten',
        'get-elements-by-class-name',
        'get-elements-by-tag-name',
        'json-stringify',
        'promise-all',
        'promise-all-settled',
        'promise-any',
        'promise-race',
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
          'Gain proficiency in front end fundamentals by implementing JavaScript and DOM APIs from scratch.',
        description: 'Description for interview preparation focus area',
        id: 'YGqz7y',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Practice writing JavaScript and DOM API Polyfills',
        description: 'Title for interview preparation focus area',
        id: '9fclPT',
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

const gradient: ThemeGradient<'#f7ff00', '#db36a4'> = {
  className: 'bg-[linear-gradient(133.77deg,_#f7ff00_0%,_#db36a4_97.95%)]',
  endColor: '#db36a4',
  startColor: '#f7ff00',
};

export function getFocusAreaThemeJavaScriptPolyfills(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiJavascriptFill,
    iconSolid: RiJavascriptFill,
  };
}
