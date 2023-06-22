import type { IntlShape } from 'react-intl';

import type {
  QuestionList,
  QuestionListTheme,
} from '~/components/questions/common/QuestionsTypes';

import {
  getPreparationPlanOneMonth,
  getPreparationPlanThemeOneMonth,
} from './items/PreparationPlanOneMonth';
import {
  getPreparationPlanOneWeek,
  getPreparationPlanThemeOneWeek,
} from './items/PreparationPlanOneWeek';
import {
  getPreparationPlanThemeThreeMonths,
  getPreparationPlanThreeMonths,
} from './items/PreparationPlanThreeMonths';

export type PreparationPlanType = 'one-month' | 'one-week' | 'three-months';

// Can only contain serializable values as it's passed between the server-client boundary.
export type PreparationPlan = QuestionList &
  Readonly<{
    type: PreparationPlanType;
  }>;

type PreparationPlans = Record<PreparationPlanType, PreparationPlan>;
type PreparationPlanThemes = Record<PreparationPlanType, QuestionListTheme>;

export function getPreparationPlans(intl: IntlShape): PreparationPlans {
  const preparationPlans: PreparationPlans = {
    'one-month': getPreparationPlanOneMonth(intl),
    'one-week': getPreparationPlanOneWeek(intl),
    'three-months': getPreparationPlanThreeMonths(intl),
  };

  return preparationPlans;
}

export function getPreparationPlanTheme(
  planType: PreparationPlanType,
): QuestionListTheme {
  const preparationPlanThemes: PreparationPlanThemes = {
    'one-month': getPreparationPlanThemeOneMonth(),
    'one-week': getPreparationPlanThemeOneWeek(),
    'three-months': getPreparationPlanThemeThreeMonths(),
  };

  return preparationPlanThemes[planType];
}
