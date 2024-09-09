import { RiWindowFill } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaDOMManipulation(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Targeted practice on DOM Manipulation interview questions',
      description: 'Description for interview preparation focus area',
      id: '8Luumm',
    }),
    href: '/focus-areas/dom-manipulation',
    longName: intl.formatMessage({
      defaultMessage: 'DOM Manipulation',
      description: 'Name of focus area questions',
      id: 'RvPm3x',
    }),
    name: intl.formatMessage({
      defaultMessage: 'DOM Manipulation',
      description: 'Name of focus area questions',
      id: 'RvPm3x',
    }),
    questions: {
      algo: [],
      javascript: [
        'get-elements-by-class-name',
        'get-elements-by-style',
        'get-elements-by-tag-name',
        'get-elements-by-tag-name-hierarchy',
        'jquery-class-manipulation',
        'jquery-css',
        'html-serializer',
        'identical-dom-trees',
        'table-of-contents',
        'text-search',
      ],
      quiz: [],
      'system-design': [],
      'user-interface': [],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice DOM manipulation interview questions on CSS selectors, DOM traversal, and element manipulation. Code in-browser with solutions from ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: 'kWg+JN',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'DOM Manipulation Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: 'l1pp5/',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Practice DOM Manipulation Interview Questions with Solutions',
        description: 'Title for interview preparation focus area',
        id: 'o4CKFi',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Familiarize with selecting elements using CSS selectors, traverse the DOM hierarchy, and manipulate their properties, content, and styles.',
      description: 'Description for interview preparation focus area',
      id: 'yAJsl0',
    }),
    type: 'dom-manipulation',
  };
}

const gradient: ThemeGradient<'#bc4e9c', '#f80759'> = {
  className: 'bg-[linear-gradient(133.77deg,_#bc4e9c_0%,_#f80759_97.95%)]',
  endColor: '#f80759',
  startColor: '#bc4e9c',
};

export function getFocusAreaThemeDOMManipulation(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiWindowFill,
    iconSolid: RiWindowFill,
  };
}
