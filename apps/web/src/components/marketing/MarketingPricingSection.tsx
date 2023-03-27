import axios from 'axios';
import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import fbq from '~/lib/fbq';
import gtag from '~/lib/gtag';
import { isProhibitedCountry } from '~/lib/stripeUtils';

import type {
  PricingPlanDetailsLocalized,
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import Alert from '~/components/ui/Alert';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import logMessage from '~/logging/logMessage';

import MarketingSectionTitleLabel from './MarketingSectionTitleLabel';
import { priceRoundToNearestNiceNumber } from '../pricing/pricingUtils';

import { CheckIcon } from '@heroicons/react/20/solid';
import { loadStripe } from '@stripe/stripe-js';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  countryCode: string;
  plans: PricingPlansLocalized;
}>;

export function usePricingPlansLabels() {
  const intl = useIntl();
  const labels: Record<PricingPlanType, string> = {
    annual: intl.formatMessage({
      defaultMessage: 'Annual',
      description: 'Title of annual pricing plan',
      id: 'Rdi/Kx',
    }),
    lifetime: intl.formatMessage({
      defaultMessage: 'Lifetime',
      description: 'Title of lifetime pricing plan',
      id: 'vaKldd',
    }),
    monthly: intl.formatMessage({
      defaultMessage: 'Monthly',
      description: 'Title of monthly pricing plan',
      id: 'y7sRet',
    }),
    quarterly: intl.formatMessage({
      defaultMessage: '3 Months',
      description: 'Title of quarterly pricing plan',
      id: 'JOj1C3',
    }),
  };

  return labels;
}

function PricingButton({
  'aria-describedby': ariaDescribedBy,
  href,
  isDisabled,
  isLoading,
  label,
  onClick,
}: Readonly<{
  'aria-describedby': string;
  href?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}>) {
  return (
    <Button
      aria-describedby={ariaDescribedBy}
      display="block"
      href={href}
      isDisabled={isLoading || isDisabled}
      isLoading={isLoading}
      label={label}
      size="lg"
      type="button"
      variant="special"
      onClick={onClick}
    />
  );
}

function PricingButtonSection({
  'aria-describedby': ariaDescribedBy,
  countryCode,
  plan,
}: Readonly<{
  'aria-describedby': string;
  countryCode: string;
  plan: PricingPlanDetailsLocalized;
}>) {
  const intl = useIntl();
  const { isLoading: isUserLoading } = useSessionContext();
  const user = useUser();
  const { userProfile, isUserProfileLoading } = useUserProfile();
  const [isCheckoutSessionLoading, setIsCheckoutSessionLoading] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  async function processSubscription(planType: PricingPlanType) {
    setIsCheckoutSessionLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/payments/purchase/checkout`, {
        params: {
          plan_type: planType,
        },
      });
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
      );

      await stripe?.redirectToCheckout({ sessionId: data.payload.id });
    } catch (err: any) {
      setError(
        intl.formatMessage({
          defaultMessage:
            'An error has occurred. Please try again later and contact support if the error persists.',
          description:
            'Error message shown to user when they are trying to checkout but it fails',
          id: 'Hj6BTz',
        }),
      );
      gtag.event({
        action: 'checkout.failure',
        category: 'ecommerce',
        label: planType,
      });
      gtag.event({
        action: `checkout.failure.${planType}.${plan.countryCode}`,
        category: 'ecommerce',
        label: planType,
      });
      logMessage({
        level: 'error',
        message: err?.message,
        title: 'Checkout attempt error',
      });
    } finally {
      setIsCheckoutSessionLoading(false);
    }
  }

  const isPending = isUserLoading || isUserProfileLoading;

  if (isProhibitedCountry(countryCode)) {
    return null;
  }

  return (
    <div>
      {(() => {
        // User is not logged in, they have to create an account first.
        if (!user) {
          return (
            <div className="space-y-2 text-center">
              <PricingButton
                aria-describedby={ariaDescribedBy}
                href={`/sign-up?next=${encodeURIComponent(
                  '/pricing',
                )}&source=buy_now`}
                isDisabled={isPending}
                label={intl.formatMessage({
                  defaultMessage: 'Buy Now',
                  description: 'Purchase button label',
                  id: 'ATwxZX',
                })}
                onClick={() => {
                  gtag.event({
                    action: `checkout.sign_up`,
                    category: 'ecommerce',
                    label: 'Buy Now (not logged in)',
                  });
                  gtag.event({
                    action: `checkout.sign_up.${plan.planType}.purchase`,
                    category: 'ecommerce',
                    label: 'Buy Now (not logged in)',
                  });
                  logMessage({
                    level: 'info',
                    message: `${
                      plan.planType
                    } plan for ${plan.currency.toLocaleUpperCase()} ${
                      plan.unitCostLocalizedInCurrency
                    } but not signed in`,
                    title: 'Checkout initiate (non-signed in)',
                  });
                }}
              />
            </div>
          );
        }
        // User is logged in but not a premium user.
        if (userProfile != null && !userProfile.isPremium) {
          return (
            <div className="flex flex-col gap-4">
              <PricingButton
                aria-describedby={ariaDescribedBy}
                isDisabled={isPending}
                isLoading={isCheckoutSessionLoading}
                label={intl.formatMessage({
                  defaultMessage: 'Buy Now',
                  description: 'Purchase button label',
                  id: 'ATwxZX',
                })}
                onClick={() => {
                  gtag.event({
                    action: `checkout.attempt`,
                    category: 'ecommerce',
                    label: 'Buy Now',
                  });
                  gtag.event({
                    action: `checkout.attempt.${plan.planType}`,
                    category: 'ecommerce',
                    label: 'Buy Now',
                  });
                  fbq.track('InitiateCheckout', {
                    content_category: plan.planType,
                    currency: plan.currency.toLocaleUpperCase(),
                    value: plan.unitCostLocalizedInCurrency,
                  });
                  logMessage({
                    level: 'info',
                    message: `${
                      plan.planType
                    } plan for ${plan.currency.toLocaleUpperCase()} ${
                      plan.unitCostLocalizedInCurrency
                    }`,
                    title: 'Checkout Initiate',
                  });

                  return processSubscription(plan.planType);
                }}
              />
              <Text className="text-center" color="error" variant="body3">
                {error}
              </Text>
            </div>
          );
        }
        // User is already subscribed.
        if (!!userProfile && userProfile.isPremium) {
          return (
            <PricingButton
              aria-describedby={ariaDescribedBy}
              href="/profile"
              isDisabled={isPending}
              label={intl.formatMessage({
                defaultMessage: 'Manage Subscription',
                description: 'Manage user membership subscription button label',
                id: 'snLKzs',
              })}
            />
          );
        }
      })()}
    </div>
  );
}

export default function MarketingPricingSectionNew({
  countryCode,
  plans,
}: Props) {
  const titleMarkerRef = useRef(null);
  const titleIsInView = useInView(titleMarkerRef, {
    amount: 'all',
    once: true,
  });
  const intl = useIntl();
  const pricingCardMarkerRef = useRef(null);
  const pricingPlanLabels = usePricingPlansLabels();

  const {
    monthly: monthlyPlan,
    quarterly: quarterlyPlan,
    lifetime: lifetimePlan,
    annual: annualPlan,
  } = plans;

  const planList = [
    {
      description: intl.formatMessage({
        defaultMessage: 'Perfect for short term job hunts.',
        description: 'Supporting statement for a monthly pricing plan',
        id: 'GObvI2',
      }),
      includedFeatures: [
        intl.formatMessage({
          defaultMessage:
            'Access to all premium content including solutions and companies.',
          description: 'Feature of monthly pricing plan',
          id: 'P/sSbP',
        }),
        intl.formatMessage({
          defaultMessage: 'Access to continuously updating question library.',
          description: 'Feature of monthly pricing plan',
          id: 'iqc+V7',
        }),
      ],
      numberOfMonths: 1,
      plan: monthlyPlan,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Discounted rate for a typical job hunt duration.',
        description: 'Supporting statement for a quarterly pricing plan',
        id: 'h63G52',
      }),
      includedFeatures: [
        intl.formatMessage({
          defaultMessage:
            'Access to all premium content including solutions and companies.',
          description: 'Feature of quarterly pricing plan',
          id: 'JFHL5z',
        }),
        intl.formatMessage({
          defaultMessage: 'Access to continuously updating question library.',
          description: 'Feature of quarterly pricing plan',
          id: 'cU6AYV',
        }),
      ],
      numberOfMonths: 3,
      plan: quarterlyPlan,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'For serious job seekers or longer term job hunts.',
        description: 'Supporting statement for an annual pricing plan',
        id: 'td80TL',
      }),
      includedFeatures: [
        intl.formatMessage({
          defaultMessage:
            'Access to all premium content including solutions and companies.',
          description: 'Feature of annual pricing plan',
          id: '0JrrHl',
        }),
        intl.formatMessage({
          defaultMessage: 'Access to continuously updating question library.',
          description: 'Feature of annual pricing plan',
          id: 'nId6NF',
        }),
        intl.formatMessage({
          defaultMessage:
            'Exclusive lifetime Discord channel access. Get real-time support from the team and the community.',
          description: 'Feature of annual pricing plan',
          id: 'fy/E4B',
        }),
      ],
      numberOfMonths: 12,
      plan: annualPlan,
    },
  ];

  return (
    <div className="bg-white pb-24">
      <div className="bg-slate-900 pt-24">
        <div className="mx-auto px-4 sm:max-w-3xl sm:px-12 md:max-w-4xl lg:max-w-5xl">
          <Container className="text-center">
            <div
              className={clsx(
                'max-w-3xl pb-8 transition-opacity duration-[1500ms] ease-in-out lg:max-w-none',
                titleIsInView ? 'opacity-100' : 'opacity-0',
              )}>
              <MarketingSectionTitleLabel className="sr-only">
                <FormattedMessage
                  defaultMessage="Pricing"
                  description="Section label on Pricing section of Homepage or Pricing page"
                  id="MKfy+9"
                />
              </MarketingSectionTitleLabel>
              <Heading className="text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl md:text-4xl lg:text-5xl">
                <FormattedMessage
                  defaultMessage="Pay once, get full access <span>forever</span>."
                  description="Title on Pricing section of Homepage or Pricing page"
                  id="9jbYus"
                  values={{
                    span: (chunks) => (
                      <span className="from-brand-400 my-2 inline-block  bg-gradient-to-l to-pink-500 bg-clip-text text-transparent">
                        {chunks}
                      </span>
                    ),
                  }}
                />
              </Heading>
              <div ref={titleMarkerRef} />
              <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-400 md:text-xl lg:mt-10">
                <FormattedMessage
                  defaultMessage="For a limited time, we are offering lifetime access at {symbol}{unitCostLocalizedInCurrency}. Meanwhile, the reward for acing your interviews could be <strong>hundreds of thousands</strong> in total compensation."
                  description="Subtitle of Pricing section on Homepage or Pricing page"
                  id="2sIcqn"
                  values={{
                    strong: (chunks) => (
                      <strong className="font-medium text-white">
                        {chunks}
                      </strong>
                    ),
                    symbol: lifetimePlan.symbol,
                    unitCostLocalizedInCurrency:
                      lifetimePlan.unitCostLocalizedInCurrency,
                  }}
                />
              </p>
              {isProhibitedCountry(countryCode) && (
                <div className="mt-8">
                  <Alert variant="danger">
                    <FormattedMessage
                      defaultMessage="Our services are unavailable at your location."
                      description="Message explaining that the website does not transact with the user's location."
                      id="LNBK2M"
                    />
                  </Alert>
                </div>
              )}
            </div>
          </Container>
        </div>
        <Section>
          <div
            ref={pricingCardMarkerRef}
            className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-slate-900" />
              <Container className="relative" variant="narrow">
                <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-md lg:flex lg:max-w-none">
                  <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                    <Heading
                      className="flex items-center gap-x-2 text-2xl font-bold text-slate-900 sm:text-3xl sm:tracking-tight"
                      id="tier-lifetime">
                      <FormattedMessage
                        defaultMessage="Lifetime Membership"
                        description="Title of LifeTime Access Pricing Plan found on Homepage or Pricing page"
                        id="w1iJ0L"
                      />
                      <Badge
                        label={intl.formatMessage({
                          defaultMessage: 'While Offer Lasts',
                          description:
                            'Label to indicate lifetime plan is a limited time offering',
                          id: 'HUP0Fq',
                        })}
                        variant="special"
                      />
                    </Heading>
                    <Section>
                      <p className="mt-6 text-base text-slate-500">
                        <FormattedMessage
                          defaultMessage="Pay once, get access to the interview platform forever, including updates."
                          description="Subtitle of LifeTime Access Pricing Plan found on Homepage or Pricing page"
                          id="hhbPlp"
                        />
                      </p>
                      <div className="mt-8">
                        <div className="flex items-center">
                          <h4 className="text-brand-600 flex-shrink-0 bg-white pr-4 text-base font-semibold">
                            <FormattedMessage
                              defaultMessage="What's Included"
                              description="Section label for features included in a pricing plan"
                              id="IhJAk8"
                            />
                          </h4>
                          <div className="flex-1 border-t-2 border-slate-200" />
                        </div>
                        <ul
                          className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
                          role="list">
                          {[
                            intl.formatMessage({
                              defaultMessage:
                                'Unlock all premium content including official solutions, companies, and study plans.',
                              description:
                                'Lifetime membership feature of unlocking premium content.',
                              id: 'tmvC1S',
                            }),
                            intl.formatMessage({
                              defaultMessage:
                                'Access updates to the interview platform for life.',
                              description:
                                'Lifetime membership feature of accessing updates to interview platforms',
                              id: '1AGOZJ',
                            }),
                            <FormattedMessage
                              key="tkN0s+"
                              defaultMessage="Exclusive lifetime <strong>Discord channel access</strong>."
                              description="Lifetime membership feature of Discord channel access."
                              id="Kv46h1"
                              values={{
                                strong: (chunks) => (
                                  <strong className="font-medium">
                                    {chunks}
                                  </strong>
                                ),
                              }}
                            />,
                            intl.formatMessage({
                              defaultMessage:
                                'Real-time support from the team and the growing community.',
                              description:
                                'Lifetime membership feature of real-time support.',
                              id: 'F74ozi',
                            }),
                          ].map((feature, idx) => (
                            <li
                              // eslint-disable-next-line react/no-array-index-key
                              key={idx}
                              className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-emerald-400"
                                />
                              </div>
                              <p className="ml-3 text-sm text-slate-700">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Section>
                  </div>
                  <Section>
                    <div className="bg-slate-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                      <p className="text-lg font-medium leading-6 text-slate-900">
                        <FormattedMessage
                          defaultMessage="Pay once, own it forever"
                          description="Text above price of LifeTime Access Pricing Plan found on Homepage or Pricing page"
                          id="zaEg+y"
                        />
                      </p>
                      <div className="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight text-slate-900">
                        <span
                          className={clsx(
                            'inline-flex items-center px-3 text-4xl tracking-tight text-slate-900',
                            lifetimePlan.unitCostLocalizedInCurrency < 1000 &&
                              'sm:text-6xl',
                          )}>
                          <span className="mr-2 text-4xl font-medium tracking-tight">
                            {lifetimePlan.symbol}
                          </span>
                          <span className="font-bold">
                            {lifetimePlan.unitCostLocalizedInCurrency}
                          </span>
                        </span>
                        {lifetimePlan.symbol === '$' && (
                          <span className="ml-3 text-xl font-medium tracking-normal text-slate-500">
                            {lifetimePlan.currency.toLocaleUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="mt-4 text-sm font-medium text-slate-500">
                        <FormattedMessage
                          defaultMessage="U.P. {currencySymbol}{price} <span>({discountPercentage}% off)</span>"
                          description="Usual price of the item and the discount off"
                          id="ul1/lo"
                          values={{
                            currencySymbol: lifetimePlan.symbol,
                            discountPercentage: lifetimePlan.discount,
                            price:
                              lifetimePlan.unitCostBeforeDiscountInCurrency,
                            span: (chunks) => (
                              <span className="text-brand-500">{chunks}</span>
                            ),
                          }}
                        />
                      </p>
                      <div className="mt-6">
                        <PricingButtonSection
                          aria-describedby="tier-lifetime"
                          countryCode={countryCode}
                          plan={lifetimePlan}
                        />
                      </div>
                    </div>
                  </Section>
                </div>
              </Container>
            </div>
          </div>
          <div className="bg-white">
            <div className="relative">
              <Container className="relative" variant="narrow">
                <Heading className="sr-only">
                  <FormattedMessage
                    defaultMessage="Pricing Plans"
                    description="Screen reader text referring to the Pricing Plan cards"
                    id="iElBQT"
                  />
                </Heading>
                <Section>
                  <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:grid-cols-3 xl:mx-0 xl:max-w-none">
                    {planList.map(
                      ({
                        description,
                        numberOfMonths,
                        plan,
                        includedFeatures,
                      }) => {
                        const id = `tier-${plan.planType}`;
                        const newLocal = 'flex space-x-3';

                        return (
                          <div
                            key={plan.planType}
                            className="flex flex-col divide-y divide-slate-200 rounded-lg border border-slate-200 shadow-sm">
                            <div className="grow p-6 md:grow-0">
                              <Heading
                                className="text-lg font-medium leading-6 text-slate-900"
                                id={id}>
                                {pricingPlanLabels[plan.planType]}
                              </Heading>
                              <Section>
                                <p className="mt-4 text-sm text-slate-500 md:min-h-[40px]">
                                  {description}
                                </p>
                                <p className="mt-8">
                                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                                    {plan.symbol}
                                    {priceRoundToNearestNiceNumber(
                                      plan.unitCostLocalizedInCurrency /
                                        numberOfMonths,
                                    )}
                                  </span>{' '}
                                  <span className="text-base font-medium text-slate-500">
                                    <FormattedMessage
                                      defaultMessage="/month"
                                      description="Per month"
                                      id="aE1FCD"
                                    />
                                  </span>
                                </p>
                                <p className="pt-4 text-xs text-slate-500 md:min-h-[32px]">
                                  {(() => {
                                    switch (plan.planType) {
                                      case 'monthly':
                                        return (
                                          <FormattedMessage
                                            defaultMessage="{currencySymbol}{price} billed per month."
                                            description="Description of billing frequency for monthly plan"
                                            id="aBlEic"
                                            values={{
                                              currencySymbol: plan.symbol,
                                              price:
                                                plan.unitCostLocalizedInCurrency,
                                            }}
                                          />
                                        );
                                      case 'quarterly':
                                        return (
                                          <FormattedMessage
                                            defaultMessage="{currencySymbol}{price} billed every 3 months."
                                            description="Description of billing frequency for quarterly plan"
                                            id="kmEY/r"
                                            values={{
                                              currencySymbol: plan.symbol,
                                              price:
                                                plan.unitCostLocalizedInCurrency,
                                            }}
                                          />
                                        );
                                      case 'annual':
                                        return (
                                          <FormattedMessage
                                            defaultMessage="{currencySymbol}{price} billed yearly."
                                            description="Description of billing frequency for annual plan"
                                            id="Pohz4K"
                                            values={{
                                              currencySymbol: plan.symbol,
                                              price:
                                                plan.unitCostLocalizedInCurrency,
                                            }}
                                          />
                                        );
                                    }
                                  })()}{' '}
                                  {plan.planType === 'monthly' ? (
                                    <FormattedMessage
                                      defaultMessage="Cancel anytime."
                                      description="Cancel the subscription anytime."
                                      id="GHQ8sO"
                                    />
                                  ) : (
                                    <span className="text-brand-500">
                                      <FormattedMessage
                                        defaultMessage="(Save {discountPercentage}% vs monthly)"
                                        description="Save more compared to monthly plan."
                                        id="Dynazi"
                                        values={{
                                          discountPercentage: plan.discount,
                                        }}
                                      />
                                    </span>
                                  )}
                                </p>
                                <div className="mt-6">
                                  <PricingButtonSection
                                    aria-describedby={id}
                                    countryCode={countryCode}
                                    plan={plan}
                                  />
                                </div>
                              </Section>
                            </div>
                            <Section>
                              <div className="px-6 pt-6 pb-8">
                                <Heading className="text-sm font-medium text-slate-900">
                                  <FormattedMessage
                                    defaultMessage="What's Included"
                                    description="Section label for features included in a pricing plan"
                                    id="IhJAk8"
                                  />
                                </Heading>
                                <Section>
                                  <ul className="mt-6 space-y-4" role="list">
                                    {includedFeatures.map((feature, idx) => (
                                      // eslint-disable-next-line react/no-array-index-key
                                      <li key={idx} className={newLocal}>
                                        <CheckIcon
                                          aria-hidden="true"
                                          className="h-5 w-5 flex-shrink-0 text-emerald-500"
                                        />
                                        <span className="text-sm text-slate-500">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </Section>
                              </div>
                            </Section>
                          </div>
                        );
                      },
                    )}
                  </div>
                  <div className="mt-8">
                    <Text color="secondary" display="block" variant="body2">
                      *{' '}
                      <FormattedMessage
                        defaultMessage="Tip: Many users have reimbursed GreatFrontEnd Premium as part of their company's flexible benefits or learning and training budget."
                        description="Tip at the bottom of the Pricing section to let users they can reimburse their purchase of GreatFrontEnd with their company's learning budgets"
                        id="Xka4d3"
                      />
                    </Text>
                    <Text color="secondary" display="block" variant="body2">
                      *{' '}
                      <FormattedMessage
                        defaultMessage="Prices will be increased as more content is being added to the website."
                        description="Tip at the bottom of the Pricing section to let users know that we would increase prices gradually as the content becomes more complete"
                        id="VJ8xZy"
                      />
                    </Text>
                    {lifetimePlan.symbol === '$' && (
                      <Text color="secondary" display="block" variant="body2">
                        *{' '}
                        <FormattedMessage
                          defaultMessage="Prices shown are in {currency}."
                          description="Tip at the bottom of the Pricing section to clarify the currency of prices on the cards"
                          id="jxXMtj"
                          values={{
                            currency: lifetimePlan.currency.toLocaleUpperCase(),
                          }}
                        />
                      </Text>
                    )}
                  </div>
                </Section>
              </Container>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
