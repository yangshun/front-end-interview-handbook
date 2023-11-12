import { RiWindowFill } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaDOMManipulation(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Dive into the world of element selection and modification in the DOM. Practice selecting elements using CSS selectors, traverse the DOM hierarchy, and manipulate their properties, content, and styles.',
      description: 'Description for interview preparation focus area',
      id: 'T9GECe',
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
      javascript: [
        'get-elements-by-class-name',
        'get-elements-by-tag-name',
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
          'Practice selecting elements using CSS selectors, traverse the DOM hierarchy, and manipulate their properties, content, and styles.',
        description: 'Description for interview preparation focus area',
        id: 'huMizZ',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Master async programming for front end interviews',
        description: 'Title for interview preparation focus area',
        id: 'EmirPr',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Practice selecting elements using CSS selectors, traverse the DOM hierarchy, and manipulate their properties, content, and styles.',
      description: 'Description for interview preparation focus area',
      id: 'huMizZ',
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
