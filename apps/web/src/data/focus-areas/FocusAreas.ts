import type { IntlShape } from 'react-intl';

import type {
  QuestionList_DEPRECATED,
  QuestionListTheme,
} from '~/components/interviews/questions/common/QuestionsTypes';

import {
  getFocusAreaAccessibility,
  getFocusAreaThemeAccessibility,
} from './items/FocusAreaAccessibility';
import {
  getFocusAreaAsyncOperations,
  getFocusAreaThemeAsyncOperations,
} from './items/FocusAreaAsyncOperations';
import {
  getFocusAreaDataStructuresAlgorithms,
  getFocusAreaThemeDataStructuresAlgorithms,
} from './items/FocusAreaDataStructuresAlgorithms';
import {
  getFocusAreaDesignSystemComponents,
  getFocusAreaThemeDesignSystemComponents,
} from './items/FocusAreaDesignSystemComponents';
import {
  getFocusAreaDOMManipulation,
  getFocusAreaThemeDOMManipulation,
} from './items/FocusAreaDOMManipulation';
import {
  getFocusAreaForms,
  getFocusAreaThemeForms,
} from './items/FocusAreaForms';
import {
  getFocusAreaJavaScriptPolyfills,
  getFocusAreaThemeJavaScriptPolyfills,
} from './items/FocusAreaJavaScriptPolyfills';
import {
  getFocusAreaLodash,
  getFocusAreaThemeLodash,
} from './items/FocusAreaLodash';
import {
  getFocusAreaStateManagement,
  getFocusAreaThemeStateManagement,
} from './items/FocusAreaStateManagement';

export type FocusAreaType =
  | 'accessibility'
  | 'async-operations'
  | 'data-structures-algorithms'
  | 'design-system-components'
  | 'dom-manipulation'
  | 'forms'
  | 'javascript-polyfills'
  | 'lodash'
  | 'state-management';

// Can only contain serializable values as it's passed between the server-client boundary.
export type FocusArea = QuestionList_DEPRECATED &
  Readonly<{
    type: FocusAreaType;
  }>;

export type FocusAreas = Record<FocusAreaType, FocusArea>;

export function getFocusAreas(intl: IntlShape): FocusAreas {
  const focusAreas: FocusAreas = {
    accessibility: getFocusArea('accessibility', intl),
    'async-operations': getFocusArea('async-operations', intl),
    'data-structures-algorithms': getFocusArea(
      'data-structures-algorithms',
      intl,
    ),
    'design-system-components': getFocusArea('design-system-components', intl),
    'dom-manipulation': getFocusArea('dom-manipulation', intl),
    forms: getFocusArea('forms', intl),
    'javascript-polyfills': getFocusArea('javascript-polyfills', intl),
    lodash: getFocusArea('lodash', intl),
    'state-management': getFocusArea('state-management', intl),
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
    case 'data-structures-algorithms':
      return getFocusAreaDataStructuresAlgorithms(intl);
    case 'forms':
      return getFocusAreaForms(intl);
    case 'lodash':
      return getFocusAreaLodash(intl);
    case 'async-operations':
      return getFocusAreaAsyncOperations(intl);
    case 'design-system-components':
      return getFocusAreaDesignSystemComponents(intl);
    case 'dom-manipulation':
      return getFocusAreaDOMManipulation(intl);
    case 'javascript-polyfills':
      return getFocusAreaJavaScriptPolyfills(intl);
    case 'state-management':
      return getFocusAreaStateManagement(intl);
  }
}

export function getFocusAreaThemes(): Record<FocusAreaType, QuestionListTheme> {
  return {
    accessibility: getFocusAreaTheme('accessibility'),
    'async-operations': getFocusAreaTheme('async-operations'),
    'data-structures-algorithms': getFocusAreaTheme(
      'data-structures-algorithms',
    ),
    'design-system-components': getFocusAreaTheme('design-system-components'),
    'dom-manipulation': getFocusAreaTheme('dom-manipulation'),
    forms: getFocusAreaTheme('forms'),
    'javascript-polyfills': getFocusAreaTheme('javascript-polyfills'),
    lodash: getFocusAreaTheme('lodash'),
    'state-management': getFocusAreaTheme('state-management'),
  };
}

export function getFocusAreaTheme(focusArea: FocusAreaType): QuestionListTheme {
  switch (focusArea) {
    case 'accessibility':
      return getFocusAreaThemeAccessibility();
    case 'data-structures-algorithms':
      return getFocusAreaThemeDataStructuresAlgorithms();
    case 'forms':
      return getFocusAreaThemeForms();
    case 'lodash':
      return getFocusAreaThemeLodash();
    case 'async-operations':
      return getFocusAreaThemeAsyncOperations();
    case 'design-system-components':
      return getFocusAreaThemeDesignSystemComponents();
    case 'dom-manipulation':
      return getFocusAreaThemeDOMManipulation();
    case 'javascript-polyfills':
      return getFocusAreaThemeJavaScriptPolyfills();
    case 'state-management':
      return getFocusAreaThemeStateManagement();
  }
}

export function categorizeFocusAreas(intl: IntlShape) {
  const focusAreas = getFocusAreas(intl);

  return [
    {
      items: [
        focusAreas['javascript-polyfills'],
        focusAreas['async-operations'],
        focusAreas.lodash,
      ],
      title: intl.formatMessage({
        defaultMessage: 'JavaScript Engineering',
        description: 'Title for focus area type',
        id: 'er249T',
      }),
    },
    {
      items: [
        focusAreas['dom-manipulation'],
        focusAreas.forms,
        focusAreas['design-system-components'],
        focusAreas.accessibility,
        focusAreas['state-management'],
      ],
      title: intl.formatMessage({
        defaultMessage: 'User Interface Development',
        description: 'Title for focus area type',
        id: '2M6LN4',
      }),
    },
    {
      items: [focusAreas['data-structures-algorithms']],
      title: intl.formatMessage({
        defaultMessage: 'Computer Science Foundations',
        description: 'Title for focus area type',
        id: 'L7w0Ka',
      }),
    },
  ];
}
