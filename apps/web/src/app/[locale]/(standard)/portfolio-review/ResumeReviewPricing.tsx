'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';

export default function ResumeReviewPricing() {
  const intl = useIntl();
  const tiers = useTiers();

  return (
    <div className="bg-neutral-950" id="pricing">
      <Container className="relative isolate" width="marketing">
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
              {intl.formatMessage({
                defaultMessage: 'Pricing',
                description: 'Resume review pricing section title',
                id: 'Upm5La',
              })}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {intl.formatMessage({
                defaultMessage: 'Simple pricing based on your needs',
                description: 'Resume review pricig section subtitle',
                id: 'lkCgRa',
              })}
            </h2>
            <p className="mx-auto mt-6 text-lg leading-8 text-neutral-300">
              {intl.formatMessage({
                defaultMessage: 'Choose a plan based on what you need.',
                description: 'Resume review pricing plans description',
                id: 'RFAHTi',
              })}
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
                      <Badge
                        label={intl.formatMessage({
                          defaultMessage: 'Most popular',
                          description: 'Label for most popular pricing tier',
                          id: 'c+UYdY',
                        })}
                        variant="special"
                      />
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
                      label={intl.formatMessage({
                        defaultMessage: 'Buy Now',
                        description: 'Buy now button label',
                        id: 'NfOJAX',
                      })}
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

function useTiers() {
  const intl = useIntl();

  return [
    {
      description: intl.formatMessage({
        defaultMessage: 'Suitable to get your foot in the door.',
        description: 'Resume review starter pricing tier description',
        id: 'jhV+k9',
      }),

      features: [
        intl.formatMessage({
          defaultMessage: 'Resume review',
          description: 'Resume review feature',
          id: 'ao1v0H',
        }),
        intl.formatMessage(
          {
            defaultMessage: 'Up to {revisionsCount} revisions',
            description: 'Resume review feature',
            id: '/NjISj',
          },
          { revisionsCount: 3 },
        ),
      ],
      href: 'https://buy.stripe.com/eVa8Ax6jR6IZfuM6oq',
      id: 'tier-starter',
      mostPopular: false,

      name: intl.formatMessage({
        defaultMessage: 'Starter',
        description: 'Resume review starter pricing tier name',
        id: '3I2UJ4',
      }),

      price: <>$350</>,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Suitable for long-term career progression.',
        description: 'Resume review pro pricing tier description',
        id: 'W5WbWT',
      }),

      features: [
        intl.formatMessage({
          defaultMessage: 'Career and profile assessment',
          description: 'Resume review feature',
          id: 'prOmOv',
        }),
        intl.formatMessage({
          defaultMessage: 'Resume review',
          description: 'Resume review feature',
          id: 'ao1v0H',
        }),
        intl.formatMessage({
          defaultMessage: 'GitHub profile review',
          description: 'Resume review feature',
          id: '68jUza',
        }),
        intl.formatMessage({
          defaultMessage: 'Portfolio website review',
          description: 'Resume review feature',
          id: 'jgGtvR',
        }),
        intl.formatMessage(
          {
            defaultMessage: 'Up to {revisionsCount} revisions for each review',
            description: 'Resume review feature',
            id: '2+ZTZX',
          },
          { revisionsCount: 3 },
        ),
      ],

      href: 'https://book.stripe.com/7sIbMJ9w39VbgyQeUX',
      id: 'tier-pro',
      mostPopular: true,

      name: intl.formatMessage({
        defaultMessage: 'All-inclusive',
        description: 'Resume review pro pricing tier name',
        id: 'M1rA+K',
      }),

      price: <>$400</>,
    },
  ];
}
