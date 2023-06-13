import { RiFireFill, RiFireLine, RiStarFill, RiStarLine } from 'react-icons/ri';

import type { PreparationPlanType } from '~/components/questions/common/PreparationPlanTypes';

import usePreparationPlans from './PreparationPlans';

import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon as AcademicCapSolidIcon } from '@heroicons/react/24/solid';

type PreparationPlanExtra = Readonly<{
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
  shortDescription: string;
  type: PreparationPlanType;
}>;

type PreparationPlansExtra = Record<PreparationPlanType, PreparationPlanExtra>;

export function usePreparationPlansUI() {
  const preparationPlans = usePreparationPlans();

  const preparationPlansExtra: PreparationPlansExtra = {
    'one-month': {
      backgroundClass: 'bg-violet-600 hover:bg-violet-500',
      description: preparationPlans['one-month'].description,
      href: preparationPlans['one-month'].href,
      iconBorderClass: 'border-violet-600',
      iconClass: 'text-violet-600',
      iconOutline: RiStarLine,
      iconSolid: RiStarFill,
      key: preparationPlans['one-month'].type,
      longName: preparationPlans['one-month'].longTitle,
      name: preparationPlans['one-month'].title,
      shortDescription: preparationPlans['one-month'].shortDescription,
      type: preparationPlans['one-month'].type,
    },
    'one-week': {
      backgroundClass: 'bg-purple-600 hover:bg-purple-500',
      description: preparationPlans['one-week'].description,
      href: preparationPlans['one-week'].href,
      iconBorderClass: 'border-purple-600',
      iconClass: 'text-purple-600',
      iconOutline: RiFireLine,
      iconSolid: RiFireFill,
      key: preparationPlans['one-week'].type,
      longName: preparationPlans['one-week'].longTitle,
      name: preparationPlans['one-week'].title,
      shortDescription: preparationPlans['one-week'].shortDescription,
      type: preparationPlans['one-week'].type,
    },
    'three-months': {
      backgroundClass: 'bg-indigo-600 hover:bg-indigo-500',
      description: preparationPlans['three-months'].description,
      href: preparationPlans['three-months'].href,
      iconBorderClass: 'border-indigo-600',
      iconClass: 'text-indigo-600',
      iconOutline: AcademicCapIcon,
      iconSolid: AcademicCapSolidIcon,
      key: preparationPlans['three-months'].type,
      longName: preparationPlans['three-months'].longTitle,
      name: preparationPlans['three-months'].title,
      shortDescription: preparationPlans['three-months'].shortDescription,
      type: preparationPlans['three-months'].type,
    },
  };

  return preparationPlansExtra;
}
