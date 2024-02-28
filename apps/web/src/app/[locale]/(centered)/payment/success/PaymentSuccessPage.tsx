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

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

/* TODO: i18n */
const links = [
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
      <div className="flex flex-col items-center justify-center gap-4">
        <span
          className={clsx(
            'relative flex items-center justify-center',
            'size-14 rounded-full',
            'shiny',
            'bg-brand-dark dark:bg-brand/20',
          )}>
          <RiStarSmileFill
            aria-hidden={true}
            className={clsx('size-10 shrink-0', 'dark:text-brand text-white')}
          />
        </span>
        <Heading className="text-center" level="heading4">
          {/* TODO: i18n */}
          Welcome to the Premium Club for GreatFrontEnd Interviews!
        </Heading>
      </div>
      <Section>
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
                        [
                          themeTextSecondaryColor,
                          themeTextBrandColor_GroupHover,
                        ],
                        [
                          'border border-transparent',
                          'group-hover:border-brand-dark dark:group-hover:border-brand',
                        ],
                        'transition',
                      )}>
                      <link.icon aria-hidden={true} className="size-6" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Heading
                      className="inline-flex gap-4 text-base font-medium"
                      level="custom">
                      <Anchor href={link.href} variant="blend">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {link.title}
                      </Anchor>
                      {link.featured && (
                        <Badge
                          label="Recommended!"
                          size="sm"
                          variant="success"
                        />
                      )}
                    </Heading>
                    <Section>
                      <Text color="secondary" display="block" size="body2">
                        {link.description}
                      </Text>
                    </Section>
                  </div>
                  <div className="shrink-0 self-center">
                    <RiArrowRightSLine
                      aria-hidden="true"
                      className={clsx(
                        'size-5 shrink-0',
                        themeTextSecondaryColor,
                        themeTextBrandColor_GroupHover,
                      )}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </Section>
    </Container>
  );
}
