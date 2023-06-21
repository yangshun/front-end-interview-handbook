import {
  RiFireFill,
  RiFireLine,
  RiFlashlightFill,
  RiFlashlightLine,
  RiStarFill,
  RiStarLine,
} from 'react-icons/ri';

import type { PreparationPlanType } from '~/components/questions/common/PreparationPlanTypes';
import type {
  QuestionFormat,
  QuestionSlug,
} from '~/components/questions/common/QuestionsTypes';
import {
  themeGradient1,
  themeGradient2,
  themeGradient3,
} from '~/components/ui/theme';

import usePreparationPlans from './PreparationPlans';

export type PreparationPlanExtra = Readonly<{
  backgroundClass: string;
  description: string;
  href: string;
  iconBorderClass: string;
  iconClass: string;
  iconOutline: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconSolid: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  longName: string;
  name: string;
  questions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  shortDescription: string;
  type: PreparationPlanType;
}>;

type PreparationPlansExtra = Record<PreparationPlanType, PreparationPlanExtra>;

export function usePreparationPlansUI() {
  const preparationPlans = usePreparationPlans();

  const preparationPlansExtra: PreparationPlansExtra = {
    'one-month': {
      backgroundClass: themeGradient1.className,
      description: preparationPlans['one-month'].description,
      href: preparationPlans['one-month'].href,
      iconBorderClass: 'border-violet-600',
      iconClass: 'text-violet-600',
      iconOutline: RiFireLine,
      iconSolid: RiFireFill,
      key: preparationPlans['one-month'].type,
      longName: preparationPlans['one-month'].longTitle,
      name: preparationPlans['one-month'].title,
      questions: preparationPlans['one-month'].questions,
      shortDescription: preparationPlans['one-month'].shortDescription,
      type: preparationPlans['one-month'].type,
    },
    'one-week': {
      backgroundClass: themeGradient2.className,
      description: preparationPlans['one-week'].description,
      href: preparationPlans['one-week'].href,
      iconBorderClass: 'border-purple-600',
      iconClass: 'text-purple-600',
      iconOutline: RiFlashlightLine,
      iconSolid: RiFlashlightFill,
      key: preparationPlans['one-week'].type,
      longName: preparationPlans['one-week'].longTitle,
      name: preparationPlans['one-week'].title,
      questions: preparationPlans['one-week'].questions,
      shortDescription: preparationPlans['one-week'].shortDescription,
      type: preparationPlans['one-week'].type,
    },
    'three-months': {
      backgroundClass: themeGradient3.className,
      description: preparationPlans['three-months'].description,
      href: preparationPlans['three-months'].href,
      iconBorderClass: 'border-indigo-600',
      iconClass: 'text-indigo-600',
      iconOutline: RiStarLine,
      iconSolid: RiStarFill,
      key: preparationPlans['three-months'].type,
      longName: preparationPlans['three-months'].longTitle,
      name: preparationPlans['three-months'].title,
      questions: preparationPlans['three-months'].questions,
      shortDescription: preparationPlans['three-months'].shortDescription,
      type: preparationPlans['three-months'].type,
    },
  };

  return preparationPlansExtra;
}
