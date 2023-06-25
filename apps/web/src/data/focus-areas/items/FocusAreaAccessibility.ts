import { BiUniversalAccess } from 'react-icons/bi';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import { themeGradientBlueGreen } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaAccessibility(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for your front end interviews in one month. All rounded coverage that is sure to bring your front end interview skills to the next level.',
      description: 'Description for one month study plan',
      id: 'CyhMLj',
    }),
    href: '/focus-areas/accessibility',
    longName: intl.formatMessage({
      defaultMessage: 'Accessibility',
      description: 'Name of focus area questions',
      id: '1kiNiW',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Accessibility',
      description: 'Name of focus area questions',
      id: '1kiNiW',
    }),
    questions: {
      javascript: [],
      // Use question importance for now.
      quiz: [],
      'system-design': [],
      'user-interface': [
        'accordion',
        'accordion-ii',
        'accordion-iii',
        'tabs',
        'tabs-ii',
        'tabs-iii',
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
    type: 'accessibility',
  };
}

export function getFocusAreaThemeAccessibility(): QuestionListTheme {
  return {
    gradient: themeGradientBlueGreen,
    iconOutline: BiUniversalAccess,
    iconSolid: BiUniversalAccess,
  };
}
