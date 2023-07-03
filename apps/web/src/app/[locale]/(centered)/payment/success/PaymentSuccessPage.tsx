'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  RiArrowRightCircleLine,
  RiArrowRightSLine,
  RiCheckboxCircleLine,
  RiCodeSSlashLine,
} from 'react-icons/ri';

import fbq from '~/lib/fbq';
import gtag from '~/lib/gtag';

import type {
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';

import DiscordIcon from '~/components/icons/DiscordIcon';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeDivideColor,
  themeLineColor,
  themeTextInvertColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

/* TODO: i18n */
const links = [
  {
    description: 'Get started with study plans and questions',
    href: '/get-started',
    icon: RiArrowRightCircleLine,
    title: 'Get Started',
  },
  {
    description: 'Start practicing front end interview questions',
    href: '/prepare/coding',
    icon: RiCodeSSlashLine,
    title: 'Practice Questions',
  },
  {
    description: 'Join the exclusive Discord community for Premium users',
    href: 'https://discord.gg/8suTg77xXz',
    icon: DiscordIcon,
    title: 'Join Discord',
  },
];

type Props = Readonly<{
  plans: PricingPlansLocalized;
}>;

export default function PaymentSuccess({ plans }: Props): JSX.Element {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get('plan') as PricingPlanType | null;

  useEffect(() => {
    if (planSearchParam != null) {
      // Special conversion event expected by GA.
      gtag.event({
        action: 'purchase',
        category: 'ecommerce',
        extra: {
          ignore_referrer: 'true',
          items: [
            {
              item_variant: planSearchParam,
              quantity: 1,
            },
          ],
        },
        label: planSearchParam,
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
        action: `checkout.success.${planSearchParam}`,
        category: 'ecommerce',
        extra: {
          ignore_referrer: 'true',
        },
        label: String(planSearchParam),
      });

      const plan = plans[planSearchParam];

      gtag.event({
        action: 'conversion',
        extra: {
          currency: plan.currency.toLocaleUpperCase(),
          ignore_referrer: 'true',
          send_to: 'AW-11039716901/SrTfCIrox5UYEKXskpAp',
          transaction_id: '',
          value: plan.unitCostLocalizedInCurrency,
        },
      });

      fbq.track('Purchase', {
        content_name: plan.planType,
        currency: plan.currency.toLocaleUpperCase(),
        value: plan.unitCostLocalizedInCurrency,
      });

      logMessage({
        level: 'success',
        message: `Purchased ${
          plan.planType
        } plan for ${plan.currency.toLocaleUpperCase()} ${
          plan.unitCostLocalizedInCurrency
        }`,
        title: 'Purchase',
      });
      logEvent('checkout.success', {
        currency: plan.currency.toLocaleUpperCase(),
        plan: plan.planType,
        value: plan.unitCostLocalizedInCurrency,
      });
    }
  }, [planSearchParam, plans]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl py-12 sm:py-16">
        <div className="mb-2 flex justify-center">
          <RiCheckboxCircleLine
            aria-hidden={true}
            className="text-success h-16 w-16"
          />
        </div>
        <Heading className="text-center" level="heading4">
          {/* TODO: i18n */}
          Welcome to the Premium Club!
        </Heading>
        <Section>
          <div className="mt-12">
            <Heading
              className={clsx('text-base', themeTextSecondaryColor)}
              color="custom"
              level="custom">
              {/* TODO: i18n */}
              Next Steps
            </Heading>
            <Section>
              <ul
                className={clsx(
                  'mt-4 divide-y border-t border-b',
                  themeLineColor,
                  themeDivideColor,
                )}
                role="list">
                {links.map((link) => (
                  <li
                    key={link.title}
                    className="relative flex items-start space-x-4 py-6">
                    <div className="flex-shrink-0">
                      <span
                        className={clsx(
                          'bg-brand flex h-12 w-12 items-center justify-center rounded-lg',
                          themeTextInvertColor,
                        )}>
                        <link.icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      {/* TODO: i18n */}
                      <Heading className="text-base font-medium" level="custom">
                        <span className="focus-within:ring-brand rounded-sm focus-within:ring-2 focus-within:ring-offset-2">
                          <Anchor
                            className="focus:outline-none"
                            href={link.href}
                            variant="unstyled">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {link.title}
                          </Anchor>
                        </span>
                      </Heading>
                      <Section>
                        <Text color="secondary" display="block" size="body2">
                          {link.description}
                        </Text>
                      </Section>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <RiArrowRightSLine
                        aria-hidden="true"
                        className={clsx('h-5 w-5', themeTextSecondaryColor)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </Section>
      </div>
    </main>
  );
}
