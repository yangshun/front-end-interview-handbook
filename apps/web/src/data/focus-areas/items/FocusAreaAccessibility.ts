import { BiUniversalAccess } from 'react-icons/bi';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme_DEPRECATED } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea_DEPRECATED } from '../FocusAreas';

export function getFocusAreaAccessibility(
  intl: IntlShape,
): FocusArea_DEPRECATED {
  return {
    description: intl.formatMessage({
      defaultMessage: 'Targeted practice on Accessibility interview questions',
      description: 'Description for interview preparation focus area',
      id: 'XauDQh',
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
      algo: [],
      javascript: [],
      quiz: [],
      'system-design': [],
      'user-interface': [
        'accordion',
        'accordion-ii',
        'accordion-iii',
        'auth-code-input',
        'file-explorer-ii',
        'modal-dialog',
        'modal-dialog-ii',
        'modal-dialog-iii',
        'modal-dialog-iv',
        'tabs',
        'tabs-ii',
        'tabs-iii',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice front end Accessibility interview questions on semantic HTML, ARIA, and screen readers. Code in-browser with curated solutions from ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: 'FwKG3p',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'Accessibility Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: 'ZcKmXM',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Practice Accessibility Interview Questions with Solutions',
        description: 'Title for interview preparation focus area',
        id: 'GQfy69',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Practice developing inclusive and accessible web experiences.',
      description: 'Description for interview preparation focus area',
      id: 'Sj1CaY',
    }),
    type: 'accessibility',
  };
}

const gradient: ThemeGradient<'#f953c6', '#b91d73'> = {
  className: 'bg-[linear-gradient(133.77deg,_#f953c6_0%,_#b91d73_97.95%)]',
  endColor: '#b91d73',
  startColor: '#f953c6',
};

export function getFocusAreaThemeAccessibility(): QuestionListTheme_DEPRECATED {
  return {
    gradient,
    iconOutline: BiUniversalAccess,
    iconSolid: BiUniversalAccess,
  };
}
