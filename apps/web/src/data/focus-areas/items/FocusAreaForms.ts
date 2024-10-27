import { TbForms } from 'react-icons/tb';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme_DEPRECATED } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea_DEPRECATED } from '../FocusAreas';

export function getFocusAreaForms(intl: IntlShape): FocusArea_DEPRECATED {
  return {
    description: intl.formatMessage({
      defaultMessage: 'Targeted practice on Forms interview questions',
      description: 'Description for interview preparation focus area',
      id: 'sRPvHx',
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
      algo: [],
      javascript: [],
      quiz: [],
      'system-design': ['e-commerce-amazon'],
      'user-interface': [
        'auth-code-input',
        'contact-form',
        'flight-booker',
        'mortgage-calculator',
        'nested-checkboxes',
        'signup-form',
        'todo-list',
        'temperature-converter',
        'transfer-list-ii',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice form-related interview questions on form components, validation, and submission handling. Code in-browser with solutions from ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: '9kGiQx',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'Forms Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: 'pyOncc',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Practice Forms Interview Questions with Solutions',
        description: 'Title for interview preparation focus area',
        id: '65GCar',
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

const gradient: ThemeGradient<'#56ab2f', '#a8e063'> = {
  className: 'bg-[linear-gradient(133.77deg,_#56ab2f_0%,_#a8e063_97.95%)]',
  endColor: '#a8e063',
  startColor: '#56ab2f',
};

export function getFocusAreaThemeForms(): QuestionListTheme_DEPRECATED {
  return {
    gradient,
    iconOutline: TbForms,
    iconSolid: TbForms,
  };
}
