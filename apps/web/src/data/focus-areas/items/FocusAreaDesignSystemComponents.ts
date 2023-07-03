import { RiDashboardLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';
import { themeGradientBlueGreen } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaDesignSystemComponents(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Elevate your front-end skills by practicing the creation of front end design system components.',
      description: 'Description for interview preparation focus area',
      id: 'PGq6U8',
    }),
    href: '/focus-areas/design-system-components',
    longName: intl.formatMessage({
      defaultMessage: 'Design System Components',
      description: 'Name of focus area questions',
      id: 'onNjnt',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Design System Components',
      description: 'Name of focus area questions',
      id: 'onNjnt',
    }),
    questions: {
      javascript: [],
      quiz: [],
      'system-design': ['image-carousel', 'dropdown-menu', 'modal-dialog'],
      'user-interface': [
        'accordion',
        'accordion-ii',
        'accordion-iii',
        'tabs',
        'tabs-ii',
        'tabs-iii',
        'progress-bar',
        'star-rating',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Elevate your front-end skills by practicing the creation of front end design system components.',
        description: 'Description for interview preparation focus area',
        id: 'PGq6U8',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Practice creating design system components',
        description: 'Title for interview preparation focus area',
        id: 'QsAiLH',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Elevate your front-end skills by practicing the creation of front end design system components.',
      description: 'Description for interview preparation focus area',
      id: 'PGq6U8',
    }),
    type: 'design-system-components',
  };
}

const gradient: ThemeGradient<'#FF5F6D', '#FFC371'> = {
  className: 'bg-[linear-gradient(133.77deg,_#FF5F6D_0%,_#FFC371_97.95%)]',
  endColor: '#FFC371',
  startColor: '#FF5F6D',
};

export function getFocusAreaThemeDesignSystemComponents(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiDashboardLine,
    iconSolid: RiDashboardLine,
  };
}
