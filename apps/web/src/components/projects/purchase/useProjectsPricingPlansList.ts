import { useIntl } from 'react-intl';

import {
  annualPlanFeatures,
  freePlanFeatures,
  monthlyPlanFeatures,
} from './ProjectsPricingFeaturesConfig';
import type { ProjectsPricingPlansLocalized } from './ProjectsPricingPlans';
import type { ProjectsPricingPlanTier } from './ProjectsPricingTable';

export default function useProjectsPricingPlansList(
  plans: ProjectsPricingPlansLocalized,
) {
  const intl = useIntl();
  const { MONTH: monthlyPlan, ANNUAL: annualPlan } = plans;

  const freePlanDetails: ProjectsPricingPlanTier = {
    features: freePlanFeatures,
    name: intl.formatMessage({
      defaultMessage: 'Free plan',
      description: 'Title of free pricing plan',
      id: 'S5984+',
    }),
    plan: null,
    type: 'FREE',
  };

  const monthlyPlanDetails: ProjectsPricingPlanTier = {
    features: monthlyPlanFeatures,
    name: intl.formatMessage({
      defaultMessage: 'Monthly plan',
      description: 'Title of monthly pricing plan',
      id: 'SuWvZa',
    }),
    numberOfMonths: 1,
    plan: monthlyPlan,
    type: 'MONTH',
  };

  const annualPlanDetails: ProjectsPricingPlanTier = {
    features: annualPlanFeatures,
    name: intl.formatMessage({
      defaultMessage: 'Annual plan',
      description: 'Title of annual pricing plan',
      id: '6SEbWz',
    }),
    numberOfMonths: 12,
    plan: annualPlan,
    type: 'ANNUAL',
  };

  return [freePlanDetails, monthlyPlanDetails, annualPlanDetails];
}
