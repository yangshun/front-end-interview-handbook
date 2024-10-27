import type { IntlShape } from 'react-intl';

import type {
  QuestionList_DEPRECATED,
  QuestionListTheme_DEPRECATED,
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

/** @deprecated */
export type FocusAreaType_DEPRECATED =
  | 'accessibility'
  | 'async-operations'
  | 'data-structures-algorithms'
  | 'design-system-components'
  | 'dom-manipulation'
  | 'forms'
  | 'javascript-polyfills'
  | 'lodash'
  | 'state-management';

/** @deprecated Can only contain serializable values as it's passed between the server-client boundary. */
export type FocusArea_DEPRECATED = QuestionList_DEPRECATED &
  Readonly<{
    type: FocusAreaType_DEPRECATED;
  }>;

/** @deprecated */
export type FocusAreas_DEPRECATED = Record<
  FocusAreaType_DEPRECATED,
  FocusArea_DEPRECATED
>;

/** @deprecated */
export function getFocusAreas_DEPRECATED(
  intl: IntlShape,
): FocusAreas_DEPRECATED {
  const focusAreas: FocusAreas_DEPRECATED = {
    accessibility: getFocusArea_DEPRECATED('accessibility', intl),
    'async-operations': getFocusArea_DEPRECATED('async-operations', intl),
    'data-structures-algorithms': getFocusArea_DEPRECATED(
      'data-structures-algorithms',
      intl,
    ),
    'design-system-components': getFocusArea_DEPRECATED(
      'design-system-components',
      intl,
    ),
    'dom-manipulation': getFocusArea_DEPRECATED('dom-manipulation', intl),
    forms: getFocusArea_DEPRECATED('forms', intl),
    'javascript-polyfills': getFocusArea_DEPRECATED(
      'javascript-polyfills',
      intl,
    ),
    lodash: getFocusArea_DEPRECATED('lodash', intl),
    'state-management': getFocusArea_DEPRECATED('state-management', intl),
  };

  return focusAreas;
}

/** @deprecated */
export function getFocusArea_DEPRECATED(
  focusArea: FocusAreaType_DEPRECATED,
  intl: IntlShape,
): FocusArea_DEPRECATED {
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

export function getFocusAreaThemes_DEPRECATED(): Record<
  FocusAreaType_DEPRECATED,
  QuestionListTheme_DEPRECATED
> {
  return {
    accessibility: getFocusAreaTheme_DEPRECATED('accessibility'),
    'async-operations': getFocusAreaTheme_DEPRECATED('async-operations'),
    'data-structures-algorithms': getFocusAreaTheme_DEPRECATED(
      'data-structures-algorithms',
    ),
    'design-system-components': getFocusAreaTheme_DEPRECATED(
      'design-system-components',
    ),
    'dom-manipulation': getFocusAreaTheme_DEPRECATED('dom-manipulation'),
    forms: getFocusAreaTheme_DEPRECATED('forms'),
    'javascript-polyfills': getFocusAreaTheme_DEPRECATED(
      'javascript-polyfills',
    ),
    lodash: getFocusAreaTheme_DEPRECATED('lodash'),
    'state-management': getFocusAreaTheme_DEPRECATED('state-management'),
  };
}

/** @deprecated */
export function getFocusAreaTheme_DEPRECATED(
  focusArea: string,
): QuestionListTheme_DEPRECATED {
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
    default:
      throw Error('No such focus area');
  }
}

/** @deprecated */
export function categorizeFocusAreas_DEPRECATED(intl: IntlShape) {
  const focusAreas = getFocusAreas_DEPRECATED(intl);

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
