'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import fbq from '~/lib/fbq';
import * as gtag from '~/lib/gtag';

import type {
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';

import DiscordIcon from '~/components/icons/DiscordIcon';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { CodeBracketIcon } from '@heroicons/react/20/solid';
import {
  ArrowRightCircleIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

const links = [
  {
    description: 'Get started with study plans and questions',
    href: '/get-started',
    icon: ArrowRightCircleIcon,
    title: 'Get Started',
  },
  {
    description: 'Start practicing front end interview questions',
    href: '/prepare/coding',
    icon: CodeBracketIcon,
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
        label: planSearchParam,
      });
      gtag.event({
        action: `checkout.success.${planSearchParam}`,
        category: 'ecommerce',
        label: String(planSearchParam),
      });

      const plan = plans[planSearchParam];

      fbq.track('Purchase', {
        content_name: plan.planType,
        currency: plan.currency.toLocaleUpperCase(),
        value: plan.unitCostLocalizedInCurrency,
      });
    }
  }, [planSearchParam, plans]);

  return (
    <div className="bg-white">
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl py-12 sm:py-16">
          <div className="mb-2 flex justify-center">
            <CheckBadgeIcon
              aria-hidden={true}
              className="h-16 w-16 text-emerald-500"
            />
          </div>
          <Heading className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl sm:tracking-tight">
            Welcome to the Premium Club!{' '}
          </Heading>
          <Section>
            <div className="mt-12">
              <Heading className="text-base font-semibold text-slate-500">
                Next Steps
              </Heading>
              <Section>
                <ul
                  className="mt-4 divide-y divide-slate-200 border-t border-b border-slate-200"
                  role="list">
                  {links.map((link) => (
                    <li
                      key={link.title}
                      className="relative flex items-start space-x-4 py-6">
                      <div className="flex-shrink-0">
                        <span className="bg-brand-50 flex h-12 w-12 items-center justify-center rounded-lg">
                          <link.icon
                            aria-hidden="true"
                            className="text-brand-700 h-6 w-6"
                          />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <Heading className="text-base font-medium text-slate-900">
                          <span className="focus-within:ring-brand-500 rounded-sm focus-within:ring-2 focus-within:ring-offset-2">
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
                          <p className="text-base text-slate-500">
                            {link.description}
                          </p>
                        </Section>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-slate-400"
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
    </div>
  );
}
