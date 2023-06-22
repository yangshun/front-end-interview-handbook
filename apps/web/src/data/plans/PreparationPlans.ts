import type { IntlShape } from 'react-intl';

import type {
  QuestionFormat,
  QuestionSlug,
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
export type PreparationPlan = Readonly<{
  description: string;
  href: string;
  longName: string;
  name: string;
  questions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  seo: {
    description: string;
    title: string;
  };
  shortDescription: string;
  type: PreparationPlanType;
}>;

export type PreparationPlanTheme = Readonly<{
  backgroundClass: string;
  iconBorderClass: string;
  iconClass: string;
  iconOutline: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconSolid: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>;

type PreparationPlans = Record<PreparationPlanType, PreparationPlan>;
type PreparationPlanThemes = Record<PreparationPlanType, PreparationPlanTheme>;

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
): PreparationPlanTheme {
  const preparationPlanThemes: PreparationPlanThemes = {
    'one-month': getPreparationPlanThemeOneMonth(),
    'one-week': getPreparationPlanThemeOneWeek(),
    'three-months': getPreparationPlanThemeThreeMonths(),
  };

  return preparationPlanThemes[planType];
}
