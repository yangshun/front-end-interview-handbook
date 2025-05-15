import { useIntl } from '~/components/intl';

import type { ProjectsSubscriptionPlanFeatures } from './ProjectsPricingFeaturesConfig';
import {
  annualPlanFeatures,
  freePlanFeatures,
  monthlyPlanFeatures,
} from './ProjectsPricingFeaturesConfig';
import type {
  ProjectsPricingPlanPaymentConfigLocalized,
  ProjectsPricingPlanPaymentConfigLocalizedRecord,
  ProjectsSubscriptionPlanIncludingFree,
} from './ProjectsPricingPlans';

export type ProjectsPricingPlanItem = Readonly<{
  features: ProjectsSubscriptionPlanFeatures;
  name: string;
  numberOfMonths?: number;
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized | null;
  type: ProjectsSubscriptionPlanIncludingFree;
}>;

export default function useProjectsPricingPlansList(
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord,
): ReadonlyArray<ProjectsPricingPlanItem> {
  const intl = useIntl();
  const { ANNUAL: annualPlan, MONTH: monthlyPlan } = plansPaymentConfig;

  const freePlanDetails: ProjectsPricingPlanItem = {
    features: freePlanFeatures,
    name: intl.formatMessage({
      defaultMessage: 'Free plan',
      description: 'Title of free pricing plan',
      id: 'S5984+',
    }),
    paymentConfig: null,
    type: 'FREE',
  };

  const monthlyPlanDetails: ProjectsPricingPlanItem = {
    features: monthlyPlanFeatures,
    name: intl.formatMessage({
      defaultMessage: 'Monthly plan',
      description: 'Title of monthly pricing plan',
      id: 'SuWvZa',
    }),
    numberOfMonths: 1,
    paymentConfig: monthlyPlan,
    type: 'MONTH',
  };

  const annualPlanDetails: ProjectsPricingPlanItem = {
    features: annualPlanFeatures,
    name: intl.formatMessage({
      defaultMessage: 'Annual plan',
      description: 'Title of annual pricing plan',
      id: '6SEbWz',
    }),
    numberOfMonths: 12,
    paymentConfig: annualPlan,
    type: 'ANNUAL',
  };

  return [freePlanDetails, monthlyPlanDetails, annualPlanDetails];
}
