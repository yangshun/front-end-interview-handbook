'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  RiArrowRightCircleLine,
  RiArrowRightSLine,
  RiCodeSSlashLine,
  RiDiscordFill,
  RiStarSmileFill,
} from 'react-icons/ri';

import fbq from '~/lib/fbq';
import gtag from '~/lib/gtag';

import type {
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';
import { hasProjectsBetaAccess } from '~/data/PromotionConfig';

import ExclusiveTicket from '~/components/common/tickets/ExclusiveTicket';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeBorderColor,
  themeDivideColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

/* TODO: i18n */
const links = [
  {
    description:
      'Join over 1000 users in our private Discord community for Premium users',
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
  plans: PricingPlansLocalized;
}>;

export default function PaymentSuccess({ plans }: Props): JSX.Element {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get('plan') as PricingPlanType | null;

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
        content_name: plan.planType,
        currency: plan.currency.toLocaleUpperCase(),
        value: plan.unitCostCurrency.withPPP.after,
      });

      logMessage({
        level: 'success',
        message: `Purchased ${
          plan.planType
        } plan for ${plan.currency.toLocaleUpperCase()} ${
          plan.unitCostCurrency.withPPP.after
        }`,
        title: 'Purchase',
      });
      logEvent('checkout.success', {
        currency: plan.currency.toLocaleUpperCase(),
        plan: plan.planType,
        value: plan.unitCostCurrency.withPPP.after,
      });
    }
  }, [planSearchParam, plans]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl py-12 sm:py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <span
            className={clsx(
              'size-14 relative flex items-center justify-center rounded-full',
              'shiny',
              'bg-brand-dark dark:bg-brand/20',
            )}>
            <RiStarSmileFill
              aria-hidden={true}
              className="dark:text-brand size-10 shrink-0 text-white"
            />
          </span>
          <Heading className="text-center" level="heading4">
            {/* TODO: i18n */}
            Welcome to the Premium Club for GreatFrontEnd Interviews!
          </Heading>
        </div>
        <Section>
          {hasProjectsBetaAccess(Date.now()) && (
            <div className="mt-12 flex flex-col items-center gap-y-5">
              <Text color="secondary" display="block">
                You've also earned:
              </Text>
              <ExclusiveTicket
                addOnElement={<Badge label="Coming soon" variant="warning" />}
                ratio="wide"
                subtitle="2 months free"
                title="Exclusive beta access"
                tooltip="Ticket for exclusive beta access to our new mystery product dropping in Jan – Feb 2024"
                width={400}
              />
              <Text color="secondary" display="block">
                We'll send you email updates nearer to launch
              </Text>
            </div>
          )}
          <div className="mt-12">
            <Heading
              className={clsx('text-base', themeTextSecondaryColor)}
              color="custom"
              level="custom">
              {/* TODO: i18n */}
              Next steps
            </Heading>
            <Section>
              <ul
                className={clsx(
                  'mt-4 divide-y border-b border-t',
                  themeBorderColor,
                  themeDivideColor,
                )}
                role="list">
                {links.map((link) => (
                  <li
                    key={link.title}
                    className="group relative flex items-start space-x-4 py-6">
                    <div className="shrink-0">
                      <span
                        className={clsx(
                          'size-10 inline-flex items-center justify-center rounded-md',
                          themeBackgroundChipColor,
                          themeTextSecondaryColor,
                          'border border-transparent transition',
                          'group-hover:border-brand-dark group-hover:text-brand-dark',
                          'dark:group-hover:border-brand dark:group-hover:text-brand',
                        )}>
                        <link.icon aria-hidden={true} className="size-6" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <Heading
                        className="inline-flex gap-4 text-base font-medium"
                        level="custom">
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
                        {link.featured && (
                          <Badge
                            label="Recommended!"
                            size="sm"
                            variant="success"
                          />
                        )}
                      </Heading>
                      <Section>
                        <Text
                          className="mt-1"
                          color="secondary"
                          display="block"
                          size="body2">
                          {link.description}
                        </Text>
                      </Section>
                    </div>
                    <div className="shrink-0 self-center">
                      <RiArrowRightSLine
                        aria-hidden="true"
                        className={clsx('size-5', themeTextSecondaryColor)}
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
