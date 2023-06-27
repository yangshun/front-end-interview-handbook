import axios from 'axios';
import clsx from 'clsx';
import { useInView } from 'framer-motion';
import type { SVGProps } from 'react';
import { useRef, useState } from 'react';
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri';
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
import {
  themeDivideColor,
  themeLineColor,
  themeRadialGlowBackground,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import MarketingSectionHeader from './MarketingSectionHeader';
import PricingBlockCard from '../pricing/PricingBlockCard';
import { priceRoundToNearestNiceNumber } from '../pricing/pricingUtils';

import { loadStripe } from '@stripe/stripe-js';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

function PurpleGradientBackground() {
  return (
    <svg
      fill="none"
      height="699"
      style={{ marginTop: -200 }}
      viewBox="0 0 733 699"
      width="733"
      xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_401_78170)">
        <path
          clipRule="evenodd"
          d="M136 563L597 194L313 136L136 563Z"
          fill="url(#paint0_linear_401_78170)"
          fillOpacity="0.5"
          fillRule="evenodd"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="698.828"
          id="filter0_f_401_78170"
          width="732.828"
          x="0.085907"
          y="0.085907">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_78170"
            stdDeviation="67.957"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_401_78170"
          x1="29.4216"
          x2="151.568"
          y1="436.014"
          y2="65.2011">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
  icon,
  isDisabled,
  isLoading,
  label,
  onClick,
}: Readonly<{
  'aria-describedby': string;
  href?: string;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
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
      icon={icon}
      isDisabled={isLoading || isDisabled}
      isLoading={isLoading}
      label={label}
      size="lg"
      type="button"
      variant="primary"
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
      logEvent('checkout.fail', {
        currency: plan.currency.toLocaleUpperCase(),
        plan: planType,
        value: plan.unitCostLocalizedInCurrency,
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
            <div className="text-center">
              <PricingButton
                aria-describedby={ariaDescribedBy}
                href={`/sign-up?next=${encodeURIComponent(
                  '/pricing',
                )}&source=buy_now`}
                icon={RiArrowRightLine}
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
                  logEvent('checkout.attempt.not_logged_in', {
                    currency: plan.currency.toLocaleUpperCase(),
                    plan: plan.planType,
                    value: plan.unitCostLocalizedInCurrency,
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
                icon={RiArrowRightLine}
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
                  logEvent('checkout.attempt', {
                    currency: plan.currency.toLocaleUpperCase(),
                    plan: plan.planType,
                    value: plan.unitCostLocalizedInCurrency,
                  });

                  return processSubscription(plan.planType);
                }}
              />
              <Text className="text-center" color="error" size="body3">
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
              icon={RiArrowRightLine}
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
    <div
      className={clsx(
        'lg:rounded-t-[48px] pb-24 lg:mx-8',
        themeRadialGlowBackground,
      )}>
      <div className="pt-24">
        <div className="mx-auto px-4 sm:max-w-3xl sm:px-12 md:max-w-4xl lg:max-w-5xl">
          <Container className="text-center">
            <div
              className={clsx(
                'flex max-w-4xl flex-col pb-8 transition-opacity duration-[1500ms] ease-in-out lg:max-w-none',
                titleIsInView ? 'opacity-100' : 'opacity-0',
              )}>
              <div ref={titleMarkerRef} />
              <MarketingSectionHeader
                description={
                  <FormattedMessage
                    defaultMessage="For a limited time, we are offering lifetime access at {symbol}{unitCostLocalizedInCurrency}. Meanwhile, the reward for acing your interviews could be <strong>hundreds of thousands</strong> in total compensation."
                    description="Subtitle of Pricing section on Homepage or Pricing page"
                    id="2sIcqn"
                    values={{
                      strong: (chunks) => (
                        <strong className="font-semibold">{chunks}</strong>
                      ),
                      symbol: lifetimePlan.symbol,
                      unitCostLocalizedInCurrency:
                        lifetimePlan.unitCostLocalizedInCurrency,
                    }}
                  />
                }
                heading={
                  <FormattedMessage
                    defaultMessage="Pay once, get full access forever"
                    description="Title on Pricing section of Homepage or Pricing page"
                    id="tIrfY2"
                  />
                }
                title={
                  <FormattedMessage
                    defaultMessage="Pricing plans"
                    description="Section label on Pricing section of Homepage or Pricing page"
                    id="ZWMfa0"
                  />
                }
              />
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
            className={clsx('mt-8 pb-16 sm:mt-12 sm:pb-20')}>
            <div className="relative">
              <Container>
                <PricingBlockCard
                  features={[
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
                          <strong className="font-medium">{chunks}</strong>
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
                  ]}
                  glow={true}
                  rightSectionContents={
                    <>
                      <Text color="label" display="block" size="body2">
                        <FormattedMessage
                          defaultMessage="Pay once, own it forever"
                          description="Text above price of LifeTime Access Pricing Plan found on Homepage or Pricing page"
                          id="zaEg+y"
                        />
                      </Text>
                      <Text
                        className={clsx(
                          'mt-2 inline-flex items-end text-xl',
                          lifetimePlan.unitCostLocalizedInCurrency < 1000 &&
                            'sm:text-xl',
                        )}
                        color="label"
                        display="inline-flex"
                        size="custom"
                        weight="medium">
                        {lifetimePlan.symbol}
                        <Text
                          className="text-5xl font-bold"
                          size="custom"
                          weight="custom">
                          {lifetimePlan.unitCostLocalizedInCurrency}
                        </Text>
                        {lifetimePlan.symbol === '$' && (
                          <span>
                            {lifetimePlan.currency.toLocaleUpperCase()}
                          </span>
                        )}
                      </Text>
                      <Text
                        className="mt-4"
                        color="secondary"
                        display="block"
                        size="body2"
                        weight="medium">
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
                              <span className="text-brand">{chunks}</span>
                            ),
                          }}
                        />
                      </Text>
                      <div className="mt-6">
                        <PricingButtonSection
                          aria-describedby="tier-lifetime"
                          countryCode={countryCode}
                          plan={lifetimePlan}
                        />
                      </div>
                    </>
                  }
                  subtitle={
                    <FormattedMessage
                      defaultMessage="Pay once, get access to the interview platform forever, including updates."
                      description="Subtitle of LifeTime Access Pricing Plan found on Homepage or Pricing page"
                      id="hhbPlp"
                    />
                  }
                  title={
                    <div className="flex items-center gap-x-2">
                      <FormattedMessage
                        defaultMessage="Lifetime Membership"
                        description="Title of LifeTime Access Pricing Plan found on Homepage or Pricing page"
                        id="w1iJ0L"
                      />
                      <Badge
                        label={intl.formatMessage({
                          defaultMessage: 'While Offer Lasts',
                          description:
                            'Label to indicate offer is a limited time deal',
                          id: 'vNa4Wc',
                        })}
                        variant="special"
                      />
                    </div>
                  }
                />
              </Container>
            </div>
          </div>
          <div>
            <div className="relative">
              <Container className="relative">
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 -z-10">
                  <PurpleGradientBackground />
                </div>
                <Heading className="sr-only" level="custom">
                  <FormattedMessage
                    defaultMessage="Pricing Plans"
                    description="Screen reader text referring to the Pricing Plan cards"
                    id="iElBQT"
                  />
                </Heading>
                <Section>
                  <div
                    className={clsx(
                      'dark:bg-neutral-800/20 grid grid-cols-1 rounded-3xl md:grid-cols-3',
                      ['divide-y md:divide-x md:divide-y-0', themeDivideColor],
                      ['border', themeLineColor],
                    )}>
                    {planList.map(
                      ({
                        description,
                        numberOfMonths,
                        plan,
                        includedFeatures,
                      }) => {
                        const id = `tier-${plan.planType}`;

                        return (
                          <div
                            key={plan.planType}
                            className="flex flex-col gap-y-8 px-8 py-6 shadow-sm md:gap-y-16">
                            <div className="grow md:grow-0">
                              <Heading
                                className="font-medium text-neutral-700 dark:text-neutral-300"
                                id={id}
                                level="custom">
                                {pricingPlanLabels[plan.planType]}
                              </Heading>
                              <Section>
                                <Text
                                  className="md:min-h-[40px] mt-1"
                                  color="secondary"
                                  display="block"
                                  size="body2">
                                  {description}
                                </Text>
                                <div className="mt-8">
                                  <Text
                                    className="text-3xl font-bold tracking-tight"
                                    size="custom"
                                    weight="custom">
                                    <Text weight="medium">{plan.symbol}</Text>
                                    {priceRoundToNearestNiceNumber(
                                      plan.unitCostLocalizedInCurrency /
                                        numberOfMonths,
                                    )}
                                  </Text>
                                  <Text weight="bold">
                                    <FormattedMessage
                                      defaultMessage="/month"
                                      description="Per month"
                                      id="aE1FCD"
                                    />
                                  </Text>
                                </div>
                                <Text
                                  className="md:min-h-[32px] pt-1"
                                  display="block"
                                  size="body3">
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
                                    <span className="text-brand">
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
                                </Text>
                                <div className="mt-8">
                                  <PricingButtonSection
                                    aria-describedby={id}
                                    countryCode={countryCode}
                                    plan={plan}
                                  />
                                </div>
                              </Section>
                            </div>
                            <Section>
                              <Heading className="sr-only" level="custom">
                                <FormattedMessage
                                  defaultMessage="What's Included"
                                  description="Section label for features included in a pricing plan"
                                  id="IhJAk8"
                                />
                              </Heading>
                              <Section>
                                <ul
                                  className={clsx(
                                    'divide-y border-y',
                                    themeLineColor,
                                    themeDivideColor,
                                  )}
                                  role="list">
                                  {includedFeatures.map((feature, idx) => (
                                    <li
                                      // eslint-disable-next-line react/no-array-index-key
                                      key={idx}
                                      className="flex gap-x-3 py-3">
                                      <RiCheckLine
                                        aria-hidden="true"
                                        className="text-brand h-5 w-5 flex-shrink-0"
                                      />
                                      <Text color="secondary" size="body3">
                                        {feature}
                                      </Text>
                                    </li>
                                  ))}
                                </ul>
                              </Section>
                            </Section>
                          </div>
                        );
                      },
                    )}
                  </div>
                  <div className="mt-5 px-8">
                    <Text color="secondary" display="block" size="body2">
                      *{' '}
                      <FormattedMessage
                        defaultMessage="Tip: Many users have reimbursed GreatFrontEnd Premium as part of their company's flexible benefits or learning and training budget."
                        description="Tip at the bottom of the Pricing section to let users they can reimburse their purchase of GreatFrontEnd with their company's learning budgets"
                        id="Xka4d3"
                      />
                    </Text>
                    <Text color="secondary" display="block" size="body2">
                      *{' '}
                      <FormattedMessage
                        defaultMessage="Prices will be increased as more content is being added to the website."
                        description="Tip at the bottom of the Pricing section to let users know that we would increase prices gradually as the content becomes more complete"
                        id="VJ8xZy"
                      />
                    </Text>
                    {lifetimePlan.symbol === '$' && (
                      <Text color="secondary" display="block" size="body2">
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
