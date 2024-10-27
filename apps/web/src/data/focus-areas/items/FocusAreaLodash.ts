import { SiLodash } from 'react-icons/si';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme_DEPRECATED } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea_DEPRECATED } from '../FocusAreas';

export function getFocusAreaLodash(intl: IntlShape): FocusArea_DEPRECATED {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Targeted practice on Lodash Functions interview questions',
      description: 'Description for interview preparation focus area',
      id: 'EDmnjv',
    }),
    href: '/focus-areas/lodash',
    longName: intl.formatMessage({
      defaultMessage: 'Lodash Functions',
      description: 'Name of focus area questions',
      id: '0HOYxB',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Lodash Functions',
      description: 'Name of focus area questions',
      id: '0HOYxB',
    }),
    questions: {
      algo: [],
      javascript: [
        'chunk',
        'clamp',
        'compact',
        'count-by',
        'curry',
        'debounce',
        'deep-clone',
        'deep-equal',
        'difference',
        'drop-right-while',
        'drop-while',
        'fill',
        'find-index',
        'find-last-index',
        'flatten',
        'from-pairs',
        'get',
        'group-by',
        'in-range',
        'intersection',
        'intersection-by',
        'intersection-with',
        'is-empty',
        'limit',
        'once',
        'size',
        'throttle',
        'unique-array',
      ],
      // Use question importance for now.
      quiz: [],
      'system-design': [],
      'user-interface': [],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice Lodash interview questions, implementing functions to manipulate and transform data efficiently. Code in-browser with solutions from ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: 'ANgYyn',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'Lodash Functions Interview Questions | GreatFrontEnd',
        description: 'Title for interview preparation focus area',
        id: 'qbj/DA',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Practice Lodash Interview Questions with Solutions',
        description: 'Title for interview preparation focus area',
        id: '97VOmx',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Strengthen your proficiency in JavaScript through writing Lodash functions from scratch.',
      description: 'Description for interview preparation focus area',
      id: 'NoFZV/',
    }),
    type: 'lodash',
  };
}

const gradient: ThemeGradient<'#7474BF', '#348AC7'> = {
  className: 'bg-[linear-gradient(133.77deg,_#7474BF_0%,_#348AC7_97.95%)]',
  endColor: '#348AC7',
  startColor: '#7474BF',
};

export function getFocusAreaThemeLodash(): QuestionListTheme_DEPRECATED {
  return {
    gradient,
    iconOutline: SiLodash,
    iconSolid: SiLodash,
  };
}
