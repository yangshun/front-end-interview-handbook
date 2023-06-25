import { TbForms } from 'react-icons/tb';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import { themeGradientBlueGreen } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaForms(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for your front end interviews in one month. All rounded coverage that is sure to bring your front end interview skills to the next level.',
      description: 'Description for one month study plan',
      id: 'CyhMLj',
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
      // Use question importance for now.
      quiz: [],
      'system-design': [],
      'user-interface': [
        'contact-form',
        'todo-list',
        'flight-booker',
        'temperature-converter',
        'signup-form',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Structured study plan developed by ex-interviewers at FAANG. Prepare holistically for front end interviews within a month',
        description: 'Description of 1 Month Preparation Plan page',
        id: 'N4F6al',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Study plan to prepare for front end interviews in 1 month',
        description: 'Title of 1 Month Preparation Plan page',
        id: 'O7MAvX',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage: 'All rounded coverage to bring you to the next level.',
      description: 'Short description for one month study plan',
      id: 'SId1Gq',
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
