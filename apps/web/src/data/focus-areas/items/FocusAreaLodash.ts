import { SiLodash } from 'react-icons/si';
import type { IntlShape } from 'react-intl';

import { themeGradient1 } from '~/components/ui/theme';

import type { FocusArea, FocusAreaTheme } from '../FocusAreas';

export function getFocusAreaLodash(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for your front end interviews in one month. All rounded coverage that is sure to bring your front end interview skills to the next level.',
      description: 'Description for one month study plan',
      id: 'CyhMLj',
    }),
    href: '/focus-areas/lodash',
    longName: intl.formatMessage({
      defaultMessage: 'Lodash functions',
      description: 'Name of focus area questions',
      id: 'mNMq+n',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Lodash functions',
      description: 'Name of focus area questions',
      id: 'mNMq+n',
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
    type: 'lodash',
  };
}

export function getFocusAreaThemeLodash(): FocusAreaTheme {
  return {
    backgroundClass: themeGradient1.className,
    iconBorderClass: 'border-violet-600',
    iconClass: 'text-violet-600',
    iconOutline: SiLodash,
    iconSolid: SiLodash,
  };
}
