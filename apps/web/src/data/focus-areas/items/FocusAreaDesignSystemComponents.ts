import { RiDashboardLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme_DEPRECATED } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea_DEPRECATED } from '../FocusAreas';

export function getFocusAreaDesignSystemComponents(
  intl: IntlShape,
): FocusArea_DEPRECATED {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Targeted practice on Design System Components interview questions',
      description: 'Description for interview preparation focus area',
      id: 't55S7k',
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
      algo: [],
      javascript: [],
      quiz: [],
      'system-design': ['image-carousel', 'dropdown-menu', 'modal-dialog'],
      'user-interface': [
        'accordion',
        'accordion-ii',
        'accordion-iii',
        'modal-dialog',
        'modal-dialog-ii',
        'modal-dialog-iii',
        'modal-dialog-iv',
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
          'Practice design system components interview questions, including Tabs, Modals, Accordions, and Progress Bars. Code in-browser with solutions from ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: 'geKY+2',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage:
          'Design System Components Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: 'xW6w5q',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Practice Design System Components Interview Questions',
        description: 'Title for interview preparation focus area',
        id: 'KyrxLW',
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

export function getFocusAreaThemeDesignSystemComponents(): QuestionListTheme_DEPRECATED {
  return {
    gradient,
    iconOutline: RiDashboardLine,
    iconSolid: RiDashboardLine,
  };
}
