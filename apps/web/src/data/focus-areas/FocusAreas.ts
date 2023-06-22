import type { IntlShape } from 'react-intl';

import type { QuestionList } from '~/components/questions/common/QuestionsTypes';

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

export type FocusAreaTheme = Readonly<{
  backgroundClass: string;
  iconBorderClass: string;
  iconClass: string;
  iconOutline: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconSolid: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>;

type FocusAreas = Record<FocusAreaType, FocusArea>;
type FocusAreaThemes = Record<FocusAreaType, FocusAreaTheme>;

export function getFocusAreas(intl: IntlShape): FocusAreas {
  const focusAreas: FocusAreas = {
    accessibility: getFocusAreaAccessibility(intl),
    'data-structure-algorithms': getFocusAreaDataStructuresAlgorithms(intl),
    forms: getFocusAreaForms(intl),
    lodash: getFocusAreaLodash(intl),
  };

  return focusAreas;
}

export function getFocusAreaTheme(planType: FocusAreaType): FocusAreaTheme {
  const focusAreaThemes: FocusAreaThemes = {
    accessibility: getFocusAreaThemeAccessibility(),
    'data-structure-algorithms': getFocusAreaThemeDataStructuresAlgorithms(),
    forms: getFocusAreaThemeForms(),
    lodash: getFocusAreaThemeLodash(),
  };

  return focusAreaThemes[planType];
}
