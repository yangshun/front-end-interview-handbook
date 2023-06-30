import { TbForms } from 'react-icons/tb';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import { themeGradientBlueGreen } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaForms(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Master the art of building interactive and user-friendly forms by exploring various form components, validation techniques, and handling form submissions.',
      description: 'Description for interview preparation focus area',
      id: 'T3JUSj',
    }),
    href: '/focus-areas/forms',
    longName: intl.formatMessage({
      defaultMessage: 'Forms',
      description: 'Name of focus area questions',
      id: 'YKZzqP',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Forms',
      description: 'Name of focus area questions',
      id: 'YKZzqP',
    }),
    questions: {
      javascript: [],
      quiz: [],
      'system-design': ['e-commerce-amazon'],
      'user-interface': [
        'contact-form',
        'todo-list',
        'flight-booker',
        'temperature-converter',
        'mortgage-calculator',
        'signup-form',
        'transfer-list-ii',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Master the art of building interactive and user-friendly forms by exploring various form components, validation techniques, and handling form submissions.',
        description: 'Description for interview preparation focus area',
        id: 'T3JUSj',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Prepare for tackling form questions in front end interviews',
        description: 'Title for interview preparation focus area',
        id: 'xBj9I5',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Master the art of building interactive and user-friendly forms.',
      description: 'Description for interview preparation focus area',
      id: 'DbEF7d',
    }),
    type: 'forms',
  };
}

export function getFocusAreaThemeForms(): QuestionListTheme {
  return {
    gradient: themeGradientBlueGreen,
    iconOutline: TbForms,
    iconSolid: TbForms,
  };
}
