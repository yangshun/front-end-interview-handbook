import clsx from 'clsx';
import { useState } from 'react';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  BanknotesIcon,
  CheckIcon,
  CreditCardIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import * as Slider from '@radix-ui/react-slider';

const features = [
  'Coding Questions',
  'JavaScript Questions',
  'User Interface Questions',
  'System Design Questions',
  'Quiz Questions',
  'Quality Solutions',
  'React',
  'Vanilla JavaScript',
  'Large Question Pool',
  'Company Tags',
  'Algorithms',
  'Coding Workspace',
  'Difficulty Levels',
];

function ProductSection() {
  return (
    <div className="flex flex-wrap gap-4">
      {features.map((feature) => (
        <div
          key={feature}
          className={clsx(
            'inline-flex items-center gap-1 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium',
          )}>
          <CheckIcon
            aria-hidden={true}
            className="text-success -ml-1 h-4 w-4"
          />
          {feature}
        </div>
      ))}
    </div>
  );
}

function SliderSection() {
  const [sales, setSales] = useState(30);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 text-center">
        <p className="text-brand-600 flex justify-center gap-2 text-4xl font-bold">
          ${Math.round(0.15 * sales * 99 * 100) / 100}{' '}
          <span className="self-end text-lg font-medium">USD</span>
        </p>
        <p className="text-sm italic text-slate-500">
          *Based on average order value
        </p>
      </div>
      <Slider.Root
        className="relative flex h-4 w-full items-center"
        id="weeks"
        max={100}
        min={1}
        step={1}
        value={[sales]}
        onValueChange={([val]) => setSales(val)}>
        <Slider.Track className="flex-grow-1 relative !h-3 w-full rounded-full bg-slate-300">
          <Slider.Range className="bg-brand-600 absolute h-full rounded" />
        </Slider.Track>
        <Slider.Thumb className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-700 block h-8 w-8 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-offset-2" />
      </Slider.Root>
      <p className="mt-8 text-center text-2xl font-medium text-slate-700">
        {sales} sales
      </p>
    </div>
  );
}

const reasons = [
  {
    action: {
      href: '/',
      label: 'View all features',
    },
    icon: SparklesIcon,
    media: <ProductSection />,
    secondaryAction: {
      href: '/get-started',
      label: 'Try the product',
    },
    subtitle:
      'Our platform has many unique advantages, making it easily recommendable to users looking for front end interview preparation.',
    title: 'A great product worth recommending',
  },
  {
    icon: BanknotesIcon,
    media: <SliderSection />,
    subtitle:
      'Earn a generous 15% commission on every purchase within 7 days of using your affiliate link. Earn as much as you refer - no limits to payouts, no frills.',
    title: 'Simple 15% commission, no limit',
  },
  {
    icon: CreditCardIcon,
    media: (
      <img
        alt="PayPal logo"
        className="mx-auto max-w-[400px]"
        src="/img/affiliate/paypal-logo.png"
      />
    ),
    subtitle: 'Easily get paid with PayPal at the end of every month.',
    title: 'Regular payouts through PayPal',
  },
];

export default function MarketingAffiliateWhySections() {
  return (
    <div className="relative space-y-16 overflow-hidden bg-white">
      {reasons.map((reason) => (
        <div
          key={reason.title}
          className="lg:mx-auto lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
          <div className="mx-auto lg:col-start-2 lg:mx-0 lg:py-24">
            <div>
              <span className="bg-brand-600 flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
                <reason.icon
                  aria-hidden="true"
                  className="h-7 w-7 text-white sm:h-8 sm:w-8"
                />
              </span>
            </div>
            <div className="mt-6">
              <Heading level="heading4">{reason.title}</Heading>
              <Section>
                <p className="mt-4 text-lg text-slate-500 lg:text-xl">
                  {reason.subtitle}
                </p>
                <div className="mt-12 space-x-4">
                  {reason.action && (
                    <Button
                      href={reason.action.href}
                      label={reason.action.label}
                      size="lg"
                      variant="primary"
                    />
                  )}
                  {reason.secondaryAction && (
                    <Button
                      href={reason.secondaryAction.href}
                      label={reason.secondaryAction.label}
                      size="lg"
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
