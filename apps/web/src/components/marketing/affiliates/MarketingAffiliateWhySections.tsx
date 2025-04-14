'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import {
  RiArrowRightLine,
  RiHandCoinLine,
  RiMoneyDollarBoxLine,
  RiThumbUpLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import * as SliderPrimitive from '@radix-ui/react-slider';

function useFeatures() {
  const intl = useIntl();

  return [
    intl.formatMessage({
      defaultMessage: 'Coding Questions',
      description: 'Coding Questions feature',
      id: 'CzttCA',
    }),
    intl.formatMessage({
      defaultMessage: 'JavaScript Questions',
      description: 'JavaScript Questions feature',
      id: '+hHAg7',
    }),
    intl.formatMessage({
      defaultMessage: 'User Interface Questions',
      description: 'User Interface Questions feature',
      id: 'AA5pTU',
    }),
    intl.formatMessage({
      defaultMessage: 'System Design Questions',
      description: 'System Design Questions feature',
      id: 'D9w0Np',
    }),
    intl.formatMessage({
      defaultMessage: 'Quiz Questions',
      description: 'Quiz Questions feature',
      id: 'nHJcbV',
    }),
    intl.formatMessage({
      defaultMessage: 'Quality Solutions',
      description: 'Quality Solutions feature',
      id: 'Zt9KyW',
    }),
    intl.formatMessage({
      defaultMessage: 'React',
      description: 'React feature',
      id: 'IzjiBy',
    }),
    intl.formatMessage({
      defaultMessage: 'Vanilla JavaScript',
      description: 'Vanilla JavaScript feature',
      id: '3wchxl',
    }),
    intl.formatMessage({
      defaultMessage: 'Large Question Pool',
      description: 'Large Question Pool feature',
      id: '5r2tdW',
    }),
    intl.formatMessage({
      defaultMessage: 'Company Tags',
      description: 'Company Tags feature',
      id: 'J91SLD',
    }),
    intl.formatMessage({
      defaultMessage: 'Algorithms',
      description: 'Algorithms feature',
      id: 'lkiyFB',
    }),
    intl.formatMessage({
      defaultMessage: 'Coding Workspace',
      description: 'Coding Workspace feature',
      id: 'QBq/oI',
    }),
    intl.formatMessage({
      defaultMessage: 'Difficulty Levels',
      description: 'Difficulty Levels feature',
      id: 'ouuGkB',
    }),
  ];
}

function ProductSection() {
  const features = useFeatures();

  return (
    <div className="flex flex-wrap gap-4">
      {features.map((feature) => (
        <div
          key={feature}
          className={clsx(
            'inline-flex items-center gap-1 rounded-lg px-4 py-2',
            'bg-neutral-100 dark:bg-neutral-800/40',
          )}>
          <FaCheck aria-hidden={true} className="text-success size-4 -ml-1" />
          <Text color="secondary" size="body2" weight="medium">
            {feature}
          </Text>
        </div>
      ))}
    </div>
  );
}

function SliderSection() {
  const intl = useIntl();
  const [sales, setSales] = useState(30);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 text-center">
        <Text
          className="flex justify-center gap-2 text-4xl font-bold"
          color="active"
          size="inherit"
          weight="bold">
          ${Math.round(0.15 * sales * 99 * 100) / 100}{' '}
          <span className="self-end text-lg font-medium">USD</span>
        </Text>
        <Text className="block italic" color="secondary" size="body2">
          *{' '}
          {intl.formatMessage({
            defaultMessage: 'Based on average order value',
            description: 'Affiliate program commission section note',
            id: 'SpQduM',
          })}
        </Text>
      </div>
      <SliderPrimitive.Root
        className="relative flex h-4 w-full items-center"
        id="weeks"
        max={100}
        min={1}
        step={1}
        value={[sales]}
        onValueChange={([val]) => setSales(val)}>
        <SliderPrimitive.Track
          className={clsx(
            'grow-1 relative !h-3 w-full rounded-full',
            themeBackgroundChipColor,
          )}>
          <SliderPrimitive.Range className="bg-brand-dark absolute h-full rounded" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="bg-brand-dark hover:bg-brand-darker focus:ring-brand-darker size-8 block rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-offset-2" />
      </SliderPrimitive.Root>
      <Text
        className="mt-8 block text-center text-2xl"
        color="secondary"
        size="inherit"
        weight="medium">
        {intl.formatMessage(
          {
            defaultMessage: '{sales} sales',
            description: 'Sales count',
            id: 'LTio0D',
          },
          { sales },
        )}
      </Text>
    </div>
  );
}

export default function MarketingAffiliateWhySections() {
  const reasons = useReasons();

  return (
    <div className="relative space-y-16 overflow-hidden">
      {reasons.map((reason) => (
        <div
          key={reason.title}
          className="md:grid-cols-2 lg:mx-auto lg:grid lg:grid-flow-col-dense lg:gap-24">
          <div className="mx-auto lg:col-start-2 lg:mx-0 lg:py-24">
            <div>
              <span
                aria-hidden="true"
                className={clsx(
                  'inline-flex',
                  'rounded-full p-3 dark:bg-neutral-800/70',
                  themeGlassyBorder,
                )}>
                <reason.icon
                  className={clsx(
                    'text-primary size-6',
                    themeTextSubtitleColor,
                  )}
                />
              </span>
            </div>

            <div className="mt-6">
              <Heading level="heading4">{reason.title}</Heading>
              <Section>
                <Text
                  className="mt-4 block text-lg lg:text-xl"
                  color="secondary">
                  {reason.subtitle}
                </Text>
                <div className="mt-12 space-x-4">
                  {reason.action && (
                    <Button
                      href={reason.action.href}
                      icon={RiArrowRightLine}
                      label={reason.action.label}
                      size="md"
                      variant="secondary"
                    />
                  )}
                  {reason.secondaryAction && (
                    <Button
                      href={reason.secondaryAction.href}
                      label={reason.secondaryAction.label}
                      size="md"
                      variant="tertiary"
                    />
                  )}
                </div>
              </Section>
            </div>
          </div>
          <div className="mt-12 self-center sm:mt-16 lg:col-start-1 lg:mt-0">
            {reason.media}
          </div>
        </div>
      ))}
    </div>
  );
}

function useReasons() {
  const intl = useIntl();

  return [
    {
      action: {
        href: '/',
        label: intl.formatMessage({
          defaultMessage: 'View all features',
          description: 'View all features button label',
          id: 'VVq82g',
        }),
      },
      icon: RiThumbUpLine,
      media: <ProductSection />,
      secondaryAction: {
        href: '/get-started',
        label: intl.formatMessage({
          defaultMessage: 'Try the product',
          description: 'Try the product button label',
          id: '4+KbJS',
        }),
      },
      subtitle: intl.formatMessage({
        defaultMessage:
          'Our platform has many unique advantages, making it easily recommendable to users looking for front end interview preparation.',
        description: 'Affiliate program why section subtitle',
        id: 'yAxqQL',
      }),
      title: intl.formatMessage({
        defaultMessage: 'A great product worth recommending',
        description: 'Affiliate program why section title',
        id: 'qt9prY',
      }),
    },
    {
      icon: RiHandCoinLine,
      media: <SliderSection />,
      subtitle: intl.formatMessage(
        {
          defaultMessage:
            'Earn a generous {percent}% commission on every purchase within {days} days of using your affiliate link. Earn as much as you refer - no limits to payouts, no frills.',
          description: 'Affiliate program commission section subtitle',
          id: 'hW0hdr',
        },
        { days: 7, percent: 15 },
      ),
      title: intl.formatMessage(
        {
          defaultMessage: 'Simple {percent}% commission, no limit',
          description: 'Affiliate program commission section title',
          id: 'M87zrX',
        },
        { percent: 15 },
      ),
    },
    {
      icon: RiMoneyDollarBoxLine,
      media: (
        <Img
          alt="PayPal logo"
          className="mx-auto max-w-[400px]"
          src="/img/affiliate/paypal-logo.png"
        />
      ),
      subtitle: intl.formatMessage({
        defaultMessage:
          'Easily get paid with PayPal at the end of every month.',
        description: 'Affiliate program payout section subtitle',
        id: 'Q44acV',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Regular payouts through PayPal',
        description: 'Affiliate program payout section title',
        id: 'jqfqCr',
      }),
    },
  ];
}
