import { useIntl } from '~/components/intl';

import type { PreparationPlanType } from './PreparationPlans';
import { getPreparationPlan, getPreparationPlans } from './PreparationPlans';

export function usePreparationPlans() {
  const intl = useIntl();

  return getPreparationPlans(intl);
}

export function usePreparationPlan(preparationPlan: PreparationPlanType) {
  const intl = useIntl();

  return getPreparationPlan(preparationPlan, intl);
}
