'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  RiArrowRightCircleLine,
  RiCodeSSlashLine,
  RiDiscordFill,
} from 'react-icons/ri';

import fbq from '~/lib/fbq';
import gtag from '~/lib/gtag';

import type {
  InterviewsPricingPlanPaymentConfigLocalizedRecord,
  InterviewsPricingPlanType,
} from '~/components/interviews/purchase/InterviewsPricingPlans';
import PurchasePaymentSuccessSection from '~/components/purchase/PurchasePaymentSuccessSection';
import Container from '~/components/ui/Container';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

/* TODO: i18n */
const actions = [
  {
    description:
      'Join over 2000 users in our private Discord community for Premium users',
    featured: true,
    href: 'https://discord.gg/8suTg77xXz',
    icon: RiDiscordFill,
    title: 'Join Premium Discord',
  },
  {
    description: 'Start practicing coding and system design questions',
    href: '/prepare',
    icon: RiArrowRightCircleLine,
    title: 'Start practicing',
  },
  {
    description: 'Get started with study plans and focus areas',
    href: '/study-plans',
    icon: RiCodeSSlashLine,
    title: 'Study plans',
  },
];

type Props = Readonly<{
  plans: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function PaymentSuccessPage({ plans }: Props): JSX.Element {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as InterviewsPricingPlanType | null;

  useEffect(() => {
    if (planSearchParam != null) {
      const plan = plans[planSearchParam];

      // Special conversion event expected by GA.
      gtag.event({
        action: 'purchase',
        category: 'ecommerce',
        extra: {
          currency: plan.currency.toLocaleUpperCase(),
          ignore_referrer: 'true',
          items: [
            {
              item_variant: planSearchParam,
              quantity: 1,
            },
          ],
        },
        label: planSearchParam,
        value: plan.unitCostCurrency.withPPP.after,
      });

      // Custom event logging.
      gtag.event({
        action: 'checkout.success',
        category: 'ecommerce',
        extra: {
          ignore_referrer: 'true',
        },
        label: planSearchParam,
      });

      gtag.event({
        action: 'conversion',
        extra: {
          currency: plan.currency.toLocaleUpperCase(),
          ignore_referrer: 'true',
          send_to: 'AW-11039716901/SrTfCIrox5UYEKXskpAp',
          transaction_id: '',
          value: plan.unitCostCurrency.withPPP.after,
        },
      });

      fbq.track('Purchase', {
        content_name: `[interviews] ${plan.planType}`,
        currency: plan.currency.toLocaleUpperCase(),
        value: plan.unitCostCurrency.withPPP.after,
      });

      logMessage({
        level: 'success',
        message: `[interviews] Purchased ${
          plan.planType
        } plan for ${plan.currency.toLocaleUpperCase()} ${
          plan.unitCostCurrency.withPPP.after
        }`,
        title: 'Purchase',
      });
      logEvent('checkout.success', {
        currency: plan.currency.toLocaleUpperCase(),
        plan: `interviews.${plan.planType}`,
        value: plan.unitCostCurrency.withPPP.after,
      });
    }
  }, [planSearchParam, plans]);

  return (
    <Container className="py-16" variant="3xl">
      <PurchasePaymentSuccessSection
        actions={actions}
        title="Welcome to the Premium Club for GreatFrontEnd Interviews!"
      />
    </Container>
  );
}
