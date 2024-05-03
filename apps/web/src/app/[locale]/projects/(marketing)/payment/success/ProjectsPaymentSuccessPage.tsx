'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { RiArrowRightCircleLine, RiCodeSSlashLine } from 'react-icons/ri';

import { fbqGFE } from '~/lib/fbq';
import gtag from '~/lib/gtag';

import { SocialLinks } from '~/data/SocialLinks';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from '~/components/projects/purchase/ProjectsPricingPlans';
import PurchasePaymentSuccessSection from '~/components/purchase/PurchasePaymentSuccessSection';
import Container from '~/components/ui/Container';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

/* TODO: i18n */
const actions = [
  {
    description: 'Join our Discord community for GreatFrontEnd Projects',
    featured: true,
    href: SocialLinks.discord.href,
    icon: SocialLinks.discord.icon,
    title: 'Join Discord',
  },
  {
    description:
      'Choose a skill you want to hone, or a component library you want to build',
    href: '/projects/challenges',
    icon: RiArrowRightCircleLine,
    title: 'Start on a project',
  },
  {
    description: "Review other's submissions and leave a feedback or question",
    href: '/projects/submissions',
    icon: RiCodeSSlashLine,
    title: 'Learn from others or help them out',
  },
];

type Props = Readonly<{
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function ProjectsPaymentSuccessPage({
  plansPaymentConfig,
}: Props): JSX.Element {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as ProjectsSubscriptionPlan | null;

  useEffect(() => {
    if (planSearchParam != null) {
      const plan = plansPaymentConfig[planSearchParam];

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

      fbqGFE('track', 'Purchase', {
        content_name: `[projects] ${planSearchParam}`,
        currency: plan.currency.toLocaleUpperCase(),
        value: plan.unitCostCurrency.withPPP.after,
      });

      logMessage({
        level: 'success',
        message: `[projects] Purchased ${planSearchParam} plan for ${plan.currency.toLocaleUpperCase()} ${
          plan.unitCostCurrency.withPPP.after
        }`,
        title: 'Purchase',
      });
      logEvent('checkout.success', {
        currency: plan.currency.toLocaleUpperCase(),
        plan: `projects.${planSearchParam}`,
        value: plan.unitCostCurrency.withPPP.after,
      });
    }
  }, [planSearchParam, plansPaymentConfig]);

  return (
    <Container className="py-16" variant="3xl">
      <PurchasePaymentSuccessSection
        actions={actions}
        title="Welcome to the Premium Club for GreatFrontEnd Projects!"
      />
    </Container>
  );
}
