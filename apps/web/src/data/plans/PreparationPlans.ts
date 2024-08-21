import type { IntlShape } from 'react-intl';

import type {
  QuestionList,
  QuestionListTheme,
} from '~/components/interviews/questions/common/QuestionsTypes';

import {
  getPreparationPlanGFE75,
  getPreparationPlanThemeGFE75,
} from './items/PreparationPlanGFE75';
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

export type PreparationPlanType =
  | 'greatfrontend75'
  | 'one-month'
  | 'one-week'
  | 'three-months';
export type PreparationPlanSchedule = Readonly<{
  frequency: 'daily' | 'weekly';
  hours: number;
}>;
// Can only contain serializable values as it's passed between the server-client boundary.
export type PreparationPlan = QuestionList &
  Readonly<{
    schedule: PreparationPlanSchedule;
    type: PreparationPlanType;
  }>;

export type PreparationPlans = Record<PreparationPlanType, PreparationPlan>;

// Note that these plans are missing the quiz questions.
export function getPreparationPlans(intl: IntlShape): PreparationPlans {
  const preparationPlans: PreparationPlans = {
    greatfrontend75: getPreparationPlan('greatfrontend75', intl),
    'one-month': getPreparationPlan('one-month', intl),
    'one-week': getPreparationPlan('one-week', intl),
    'three-months': getPreparationPlan('three-months', intl),
  };

  return preparationPlans;
}

// Note that these plans are missing the quiz questions.
export function getPreparationPlan(
  planType: PreparationPlanType,
  intl: IntlShape,
): PreparationPlan {
  switch (planType) {
    case 'one-week':
      return getPreparationPlanOneWeek(intl);
    case 'one-month':
      return getPreparationPlanOneMonth(intl);
    case 'three-months':
      return getPreparationPlanThreeMonths(intl);
    case 'greatfrontend75':
      return getPreparationPlanGFE75(intl);
  }
}

export function getPreparationPlanThemes(): Record<
  PreparationPlanType,
  QuestionListTheme
> {
  return {
    greatfrontend75: getPreparationPlanTheme('greatfrontend75'),
    'one-month': getPreparationPlanTheme('one-month'),
    'one-week': getPreparationPlanTheme('one-week'),
    'three-months': getPreparationPlanTheme('three-months'),
  };
}

export function getPreparationPlanTheme(
  planType: PreparationPlanType,
): QuestionListTheme {
  switch (planType) {
    case 'one-week':
      return getPreparationPlanThemeOneWeek();
    case 'one-month':
      return getPreparationPlanThemeOneMonth();
    case 'three-months':
      return getPreparationPlanThemeThreeMonths();
    case 'greatfrontend75':
      return getPreparationPlanThemeGFE75();
  }
}
