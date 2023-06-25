import type { IntlShape } from 'react-intl';

import type {
  QuestionList,
  QuestionListTheme,
} from '~/components/questions/common/QuestionsTypes';

import {
  getFocusAreaAccessibility,
  getFocusAreaThemeAccessibility,
} from './items/FocusAreaAccessibility';
import {
  getFocusAreaDataStructuresAlgorithms,
  getFocusAreaThemeDataStructuresAlgorithms,
} from './items/FocusAreaDataStructuresAlgorithms';
import {
  getFocusAreaForms,
  getFocusAreaThemeForms,
} from './items/FocusAreaForms';
import {
  getFocusAreaLodash,
  getFocusAreaThemeLodash,
} from './items/FocusAreaLodash';

export type FocusAreaType =
  | 'accessibility'
  | 'data-structure-algorithms'
  | 'forms'
  | 'lodash';

// Can only contain serializable values as it's passed between the server-client boundary.
export type FocusArea = QuestionList &
  Readonly<{
    type: FocusAreaType;
  }>;

type FocusAreas = Record<FocusAreaType, FocusArea>;

export function getFocusAreas(intl: IntlShape): FocusAreas {
  const focusAreas: FocusAreas = {
    accessibility: getFocusArea('accessibility', intl),
    'data-structure-algorithms': getFocusArea(
      'data-structure-algorithms',
      intl,
    ),
    forms: getFocusArea('forms', intl),
    lodash: getFocusArea('lodash', intl),
  };

  return focusAreas;
}

export function getFocusArea(
  focusArea: FocusAreaType,
  intl: IntlShape,
): FocusArea {
  switch (focusArea) {
    case 'accessibility':
      return getFocusAreaAccessibility(intl);
    case 'data-structure-algorithms':
      return getFocusAreaDataStructuresAlgorithms(intl);
    case 'forms':
      return getFocusAreaForms(intl);
    case 'lodash':
      return getFocusAreaLodash(intl);
  }
}

export function getFocusAreaThemes(): Record<FocusAreaType, QuestionListTheme> {
  return {
    accessibility: getFocusAreaTheme('accessibility'),
    'data-structure-algorithms': getFocusAreaTheme('data-structure-algorithms'),
    forms: getFocusAreaTheme('forms'),
    lodash: getFocusAreaTheme('lodash'),
  };
}

export function getFocusAreaTheme(focusArea: FocusAreaType): QuestionListTheme {
  switch (focusArea) {
    case 'accessibility':
      return getFocusAreaThemeAccessibility();
    case 'data-structure-algorithms':
      return getFocusAreaThemeDataStructuresAlgorithms();
    case 'forms':
      return getFocusAreaThemeForms();
    case 'lodash':
      return getFocusAreaThemeLodash();
  }
}
