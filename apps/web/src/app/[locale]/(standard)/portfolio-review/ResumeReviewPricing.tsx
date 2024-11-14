'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';

const tiers = [
  {
    description: 'Suitable to get your foot in the door.',
    features: ['Resume review', 'Up to 3 revisions'],
    href: 'https://buy.stripe.com/eVa8Ax6jR6IZfuM6oq',
    id: 'tier-starter',
    mostPopular: false,
    name: 'Starter',
    price: <>$350</>,
  },
  {
    description: 'Suitable for long-term career progression.',
    features: [
      'Career and profile assessment',
      'Resume review',
      'GitHub profile review',
      'Portfolio website review',
      'Up to 3 revisions for each review',
    ],
    href: 'https://book.stripe.com/7sIbMJ9w39VbgyQeUX',
    id: 'tier-pro',
    mostPopular: true,
    name: 'All-inclusive',
    price: <>$400</>,
  },
];

export default function ResumeReviewPricing() {
  return (
    <div className="bg-neutral-950" id="pricing">
      <Container className="relative isolate" width="6xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="from-brand-light to-brand-dark relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-16 lg:max-w-none lg:py-24">
          <div className="mx-auto text-center">
            <p className="text-brand pb-6 text-base font-semibold leading-7">
              Pricing
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple pricing based on your needs
            </h2>
            <p className="mx-auto mt-6 text-lg leading-8 text-neutral-300">
              Choose a plan based on what you need.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="isolate grid max-w-4xl shrink grid-cols-1 gap-8 md:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={clsx(
                    tier.mostPopular
                      ? 'ring-brand bg-neutral-800/40 ring-2'
                      : 'ring-1 ring-white/10',
                    'rounded-3xl p-8 xl:p-10',
                  )}>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      className="text-lg font-semibold leading-8 text-white"
                      id={tier.id}>
                      {tier.name}
                    </h3>
                    {tier.mostPopular && (
                      <Badge label="Most popular" variant="special" />
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-300">
                    {tier.description}
                  </p>
                  <p className="my-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white">
                      {tier.price}
                    </span>
                  </p>
                  <div className="mt-6">
                    <Button
                      aria-describedby={tier.id}
                      display="block"
                      href={tier.href}
                      label="Buy Now"
                      size="lg"
                      variant={tier.mostPopular ? 'primary' : 'secondary'}
                    />
                  </div>
                  <ul
                    className="mt-8 space-y-3 text-sm leading-6 text-neutral-300 xl:mt-10"
                    role="list">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <FaCheck
                          aria-hidden="true"
                          className="text-brand h-6 w-5 flex-none"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
