import axios from 'axios';
import clsx from 'clsx';
import type { SVGProps } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useId } from 'react';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiCheckLine,
  RiExchangeDollarLine,
} from 'react-icons/ri';
import { FormattedMessage, FormattedNumberParts, useIntl } from 'react-intl';

import fbq from '~/lib/fbq';
import gtag from '~/lib/gtag';
import { isProhibitedCountry } from '~/lib/stripeUtils';

import type {
  PricingPlanDetailsLocalized,
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';
import {
  PERPETUAL_PROMO_CODE,
  PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
} from '~/data/PromotionConfig';

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
  themeTextBrandColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import MarketingSectionHeader from '../MarketingSectionHeader';
import PricingBlockCard from '../../pricing/PricingBlockCard';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '../../pricing/pricingConfig';
import { priceRoundToNearestNiceNumber } from '../../pricing/pricingUtils';

import { loadStripe } from '@stripe/stripe-js';
import { useSessionContext } from '@supabase/auth-helpers-react';

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
  countryName: string;
  plans: PricingPlansLocalized;
}>;

function PriceLabel({
  amount,
  symbol,
  currency,
  children,
}: Readonly<{
  amount: number;
  children?: (val: Array<Intl.NumberFormatPart>) => React.ReactElement | null;
  currency: string;
  symbol: string;
}>) {
  return (
    <FormattedNumberParts
      currency={currency.toUpperCase()}
      currencyDisplay={symbol !== '$' ? 'narrowSymbol' : undefined}
      maximumFractionDigits={0}
      style="currency"
      value={amount}>
      {(parts) =>
        children == null ? (
          <>{parts.map((part) => part.value).join('')}</>
        ) : (
          children(parts)
        )
      }
    </FormattedNumberParts>
  );
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
      target="_self"
      type="button"
      variant="primary"
      onClick={onClick}
    />
  );
}

function PricingButtonNonLoggedIn({
  'aria-describedby': ariaDescribedBy,
  isDisabled,
  plan,
}: Readonly<{
  'aria-describedby': string;
  isDisabled: boolean;
  plan: PricingPlanDetailsLocalized;
}>) {
  const intl = useIntl();

  return (
    <PricingButton
      aria-describedby={ariaDescribedBy}
      href={`/sign-up?next=${encodeURIComponent('/pricing')}&source=buy_now`}
      icon={RiArrowRightLine}
      isDisabled={isDisabled}
      label={intl.formatMessage({
        defaultMessage: 'Buy now',
        description: 'Purchase button label',
        id: '9gs1LO',
      })}
      onClick={() => {
        gtag.event({
          action: `checkout.sign_up`,
          category: 'ecommerce',
          label: 'Buy Now (not logged in)',
        });
        logMessage({
          level: 'info',
          message: `${
            plan.planType
          } plan for ${plan.currency.toLocaleUpperCase()} ${
            plan.unitCostCurrency.withPPP.after
          } but not signed in`,
          title: 'Checkout initiate (non-signed in)',
        });
        logEvent('checkout.attempt.not_logged_in', {
          currency: plan.currency.toLocaleUpperCase(),
          plan: plan.planType,
          value: plan.unitCostCurrency.withPPP.after,
        });
      }}
    />
  );
}

function PricingButtonNonPremium({
  'aria-describedby': ariaDescribedBy,
  plan,
}: Readonly<{
  'aria-describedby': string;
  plan: PricingPlanDetailsLocalized;
}>) {
  const intl = useIntl();
  const { userProfile, isUserProfileLoading } = useUserProfile();
  const [checkoutSessionHref, setCheckoutSessionHref] = useState<string | null>(
    null,
  );
  const [hasClicked, setHasClicked] = useState(false);
  // HACK: Also add a ref so that the processSubscription callback can
  // access the latest value.
  const hasClickedRef = useRef(false);

  const [isCheckoutSessionLoading, setIsCheckoutSessionLoading] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  async function processSubscription(planType: PricingPlanType) {
    if (isCheckoutSessionLoading) {
      return;
    }

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

      if (hasClickedRef.current) {
        await stripe?.redirectToCheckout({ sessionId: data.payload.id });

        return;
      }

      setCheckoutSessionHref(data.payload.url);
    } catch (err: any) {
      if (hasClickedRef.current) {
        setError(
          intl.formatMessage({
            defaultMessage:
              'An error has occurred. Please try again later and contact support if the error persists.',
            description:
              'Error message shown to user when they are trying to checkout but it fails',
            id: 'Hj6BTz',
          }),
        );
      }

      gtag.event({
        action: 'checkout.failure',
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
        value: plan.unitCostCurrency.withPPP.after,
      });
    } finally {
      setIsCheckoutSessionLoading(false);
    }
  }

  useEffect(() => {
    if (
      userProfile != null &&
      !userProfile.isPremium &&
      plan.planType === 'lifetime' &&
      checkoutSessionHref == null
    ) {
      // Eagerly generate the checkout page URL for lifetime plan
      // in the background because it takes a while.
      processSubscription(plan.planType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, checkoutSessionHref, plan.planType]);

  const showUserThereIsAsyncRequest = hasClicked && isCheckoutSessionLoading;

  return (
    <div className="flex flex-col gap-4">
      <PricingButton
        aria-describedby={ariaDescribedBy}
        href={checkoutSessionHref ?? undefined}
        icon={RiArrowRightLine}
        isDisabled={showUserThereIsAsyncRequest || isUserProfileLoading}
        isLoading={showUserThereIsAsyncRequest}
        label={intl.formatMessage({
          defaultMessage: 'Buy now',
          description: 'Purchase button label',
          id: '9gs1LO',
        })}
        onClick={() => {
          setHasClicked(true);
          hasClickedRef.current = true;
          gtag.event({
            action: 'checkout.attempt',
            category: 'ecommerce',
            label: 'Buy Now',
          });
          gtag.event({
            action: 'begin_checkout',
            category: 'ecommerce',
            extra: {
              currency: plan.currency.toLocaleUpperCase(),
            },
            value: plan.unitCostCurrency.withPPP.after,
          });
          fbq.track('InitiateCheckout', {
            content_category: plan.planType,
            currency: plan.currency.toLocaleUpperCase(),
            value: plan.unitCostCurrency.withPPP.after,
          });
          logMessage({
            level: 'info',
            message: `${
              plan.planType
            } plan for ${plan.currency.toLocaleUpperCase()} ${
              plan.unitCostCurrency.withPPP.after
            }`,
            title: 'Checkout Initiate',
          });
          logEvent('checkout.attempt', {
            currency: plan.currency.toLocaleUpperCase(),
            plan: plan.planType,
            value: plan.unitCostCurrency.withPPP.after,
          });

          if (checkoutSessionHref != null) {
            return;
          }

          return processSubscription(plan.planType);
        }}
      />
      {error && (
        <Text className="text-center" color="error" size="body3">
          {error}
        </Text>
      )}
    </div>
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
  const { userProfile, isUserProfileLoading } = useUserProfile();

  const isPending = isUserLoading || isUserProfileLoading;

  if (isProhibitedCountry(countryCode)) {
    return null;
  }

  if (userProfile) {
    if (!userProfile.isPremium) {
      // User is logged in but not a premium user.
      return (
        <PricingButtonNonPremium
          aria-describedby={ariaDescribedBy}
          plan={plan}
        />
      );
    }

    // User is already subscribed, link to billing page.
    return (
      <PricingButton
        aria-describedby={ariaDescribedBy}
        href="/profile/billing"
        icon={RiArrowRightLine}
        isDisabled={isPending}
        label={intl.formatMessage({
          defaultMessage: 'Manage subscription',
          description: 'Manage user membership subscription button label',
          id: 'sjLtW1',
        })}
      />
    );
  }

  // User is not logged in, they have to create an account first.
  return (
    <PricingButtonNonLoggedIn
      aria-describedby={ariaDescribedBy}
      isDisabled={isPending}
      plan={plan}
    />
  );
}

function PricingPlanComparisonDiscount({
  plan,
  showPPPMessage,
}: Readonly<{
  plan: PricingPlanDetailsLocalized;
  showPPPMessage: boolean;
}>) {
  switch (plan.planType) {
    case 'monthly':
      return (
        <span>
          <FormattedMessage
            defaultMessage="{price} billed per month."
            description="Description of billing frequency for monthly plan"
            id="pDo/V5"
            values={{
              price: (
                <PriceLabel
                  amount={plan.unitCostCurrency.withPPP.after}
                  currency={plan.currency.toUpperCase()}
                  symbol={plan.symbol}
                />
              ),
            }}
          />{' '}
          <FormattedMessage
            defaultMessage="Cancel anytime."
            description="Cancel the subscription anytime."
            id="GHQ8sO"
          />
        </span>
      );
    case 'quarterly':
      return (
        <span>
          <FormattedMessage
            defaultMessage="{price} billed every 3 months"
            description="Description of billing frequency for quarterly plan"
            id="2XR9B5"
            values={{
              price: (
                <PriceLabel
                  amount={plan.unitCostCurrency.withPPP.after}
                  currency={plan.currency.toUpperCase()}
                  symbol={plan.symbol}
                />
              ),
            }}
          />{' '}
          <span className={themeTextBrandColor}>
            <FormattedMessage
              defaultMessage="(Save {discountPercentage}% vs monthly)"
              description="Save more compared to monthly plan."
              id="Dynazi"
              values={{
                discountPercentage: plan.discount,
              }}
            />
          </span>
        </span>
      );
    case 'annual':
      return (
        <span>
          <FormattedMessage
            defaultMessage="{price} billed yearly"
            description="Description of billing frequency for annual plan"
            id="7uB2Jj"
            values={{
              price: (
                <PriceLabel
                  amount={plan.unitCostCurrency.withPPP.after}
                  currency={plan.currency.toUpperCase()}
                  symbol={plan.symbol}
                />
              ),
            }}
          />{' '}
          <span className={themeTextBrandColor}>
            <FormattedMessage
              defaultMessage="(Save {discountPercentage}% vs monthly)"
              description="Save more compared to monthly plan."
              id="Dynazi"
              values={{
                discountPercentage: plan.discount,
              }}
            />
          </span>
        </span>
      );
    case 'lifetime': {
      if (showPPPMessage) {
        // Showing PPP strikethrough is enough, will be confusing to show both strikethrough and U.P.
        return null;
      }

      return (
        <FormattedMessage
          defaultMessage="U.P. {price} <span>({discountPercentage}% off)</span>"
          description="Usual price of the item and the discount off"
          id="FQQRsa"
          values={{
            discountPercentage: plan.discount,
            price: (
              <PriceLabel
                amount={plan.unitCostCurrency.withPPP.before}
                currency={plan.currency.toUpperCase()}
                symbol={plan.symbol}
              />
            ),
            span: (chunks) => (
              <span className={themeTextBrandColor}>{chunks}</span>
            ),
          }}
        />
      );
    }
  }
}

type PricingPlanDetails = Readonly<{
  description: string;
  includedFeatures: ReadonlyArray<React.ReactNode>;
  name: string;
  numberOfMonths?: number;
  plan: PricingPlanDetailsLocalized;
}>;

export default function MarketingPricingSection({
  countryCode,
  countryName,
  plans,
}: Props) {
  const intl = useIntl();
  const featuredPlanId = useId();

  const {
    monthly: monthlyPlan,
    quarterly: quarterlyPlan,
    lifetime: lifetimePlan,
    annual: annualPlan,
  } = plans;

  const featureAllAccess = intl.formatMessage({
    defaultMessage:
      'Unlock all premium content including official solutions, company tags, and study plans.',
    description: 'Feature of quarterly pricing plan',
    id: 'LSKN5A',
  });
  const featureContinuousUpdates = intl.formatMessage({
    defaultMessage: 'Access to continuously updating questions and content.',
    description: 'Feature of monthly pricing plan',
    id: '++gUWh',
  });
  const featureDiscordAccess = intl.formatMessage({
    defaultMessage: 'Exclusive private Discord channel access for life.',
    description: 'Feature of annual pricing plan',
    id: 'O57nUH',
  });
  const featureRealtimeSupport = intl.formatMessage({
    defaultMessage:
      'Real-time support from the team and the growing community.',
    description: 'Lifetime membership feature of real-time support.',
    id: 'F74ozi',
  });

  const monthlyPlanDetails: PricingPlanDetails = {
    description: intl.formatMessage({
      defaultMessage: 'Perfect for short term job hunts.',
      description: 'Supporting statement for a monthly pricing plan',
      id: 'GObvI2',
    }),
    includedFeatures: [featureAllAccess, featureContinuousUpdates],
    name: intl.formatMessage({
      defaultMessage: 'Monthly plan',
      description: 'Title of monthly pricing plan',
      id: 'SuWvZa',
    }),
    numberOfMonths: 1,
    plan: monthlyPlan,
  };

  const quarterlyPlanDetails: PricingPlanDetails = {
    description: intl.formatMessage({
      defaultMessage: 'Discounted rate for a typical job hunt duration.',
      description: 'Supporting statement for a quarterly pricing plan',
      id: 'h63G52',
    }),
    includedFeatures: [
      featureAllAccess,
      featureContinuousUpdates,
      featureDiscordAccess,
    ],
    name: intl.formatMessage({
      defaultMessage: 'Quarterly plan',
      description: 'Title of quarterly pricing plan',
      id: 'WIHUwS',
    }),
    numberOfMonths: 3,
    plan: quarterlyPlan,
  };

  const annualPlanDetails: PricingPlanDetails = {
    description: intl.formatMessage({
      defaultMessage:
        'Best value for money with real-time support from the team and community.',
      description: 'Supporting statement for an annual pricing plan',
      id: 'BPQrNY',
    }),
    includedFeatures: [
      featureAllAccess,
      featureContinuousUpdates,
      featureDiscordAccess,
      featureRealtimeSupport,
    ],
    name: intl.formatMessage({
      defaultMessage: 'Annual plan',
      description: 'Title of annual pricing plan',
      id: '6SEbWz',
    }),
    numberOfMonths: 12,
    plan: annualPlan,
  };

  const lifetimePlanDetails: PricingPlanDetails = {
    description: intl.formatMessage({
      defaultMessage:
        'Pay once, get full access to the interview platform forever, including updates.',
      description:
        'Subtitle of LifeTime Access Pricing Plan found on Homepage or Pricing page',
      id: '8yJWMC',
    }),
    includedFeatures: [
      featureAllAccess,
      intl.formatMessage({
        defaultMessage: 'Access updates to the interview platform for life.',
        description:
          'Lifetime membership feature of accessing updates to interview platforms',
        id: '1AGOZJ',
      }),
      featureDiscordAccess,
      featureRealtimeSupport,
    ],
    name: intl.formatMessage({
      defaultMessage: 'Lifetime plan',
      description:
        'Title of LifeTime Access Pricing Plan found on Homepage or Pricing page',
      id: 'riPEvL',
    }),
    plan: lifetimePlan,
  };

  const planList = [
    monthlyPlanDetails,
    quarterlyPlanDetails,
    annualPlanDetails,
  ];

  const featuredPlan = lifetimePlanDetails;
  const showPPPMessage =
    featuredPlan.plan.conversionFactor <
    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE;

  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl pb-24 lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <div className="pt-24">
        <div className="mx-auto px-4 sm:max-w-3xl sm:px-12 md:max-w-4xl lg:max-w-5xl">
          <Container className="text-center">
            <div className="flex max-w-4xl flex-col pb-8 lg:max-w-none">
              <MarketingSectionHeader
                description={
                  <FormattedMessage
                    defaultMessage="For a limited time, we are offering our lifetime plans at {symbol}{unitCostLocalizedInCurrency}. Meanwhile, the reward for acing your interviews could be <strong>hundreds of thousands</strong> in total compensation."
                    description="Subtitle of Pricing section on Homepage or Pricing page"
                    id="2wms0e"
                    values={{
                      strong: (chunks) => (
                        <strong className="font-semibold">{chunks}</strong>
                      ),
                      symbol: lifetimePlan.symbol,
                      unitCostLocalizedInCurrency:
                        lifetimePlan.unitCostCurrency.withPPP.after,
                    }}
                  />
                }
                heading={
                  <FormattedMessage
                    defaultMessage="Invest in fuss-free, quality preparation"
                    description="Title of Pricing section of Homepage or Pricing page"
                    id="fjKhks"
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
          <div className="mt-4 pb-10 sm:mt-12 sm:pb-20 lg:mt-8">
            <Container className="relative flex flex-col gap-y-12">
              {showPPPMessage && (
                <Alert
                  icon={RiExchangeDollarLine}
                  title={`Purchasing power parity for ${countryName}`}
                  variant="success">
                  We noticed you're in {countryName}. We support Purchasing
                  Power Parity, so a{' '}
                  <strong>
                    {Math.ceil(100 - featuredPlan.plan.conversionFactor * 100)}%
                    discount
                  </strong>{' '}
                  has been automatically applied! 🎉
                </Alert>
              )}
              <PricingBlockCard
                features={featuredPlan.includedFeatures}
                glow={true}
                rightSectionContents={
                  <>
                    <div className="flex flex-col">
                      {showPPPMessage && (
                        <Text
                          className={clsx(
                            'inline-flex flex-wrap items-end text-lg line-through',
                            featuredPlan.plan.unitCostCurrency.withPPP.after <
                              1000 && 'sm:text-lg',
                          )}
                          color="subtle"
                          display="inline-flex"
                          size="custom"
                          weight="medium">
                          <PriceLabel
                            amount={priceRoundToNearestNiceNumber(
                              featuredPlan.plan.unitCostCurrency.base.after /
                                (featuredPlan.numberOfMonths ?? 1),
                            )}
                            currency={featuredPlan.plan.currency.toUpperCase()}
                            symbol={featuredPlan.plan.symbol}
                          />{' '}
                          {featuredPlan.numberOfMonths != null ? (
                            <FormattedMessage
                              defaultMessage="/month"
                              description="Per month"
                              id="aE1FCD"
                            />
                          ) : (
                            <FormattedMessage
                              defaultMessage="paid once"
                              description="Pay the price once"
                              id="BMBc9O"
                            />
                          )}
                        </Text>
                      )}
                      <Text
                        className={clsx(
                          'inline-flex items-end gap-x-2 text-xl',
                          featuredPlan.plan.unitCostCurrency.withPPP.after <
                            1000 && 'sm:text-xl',
                        )}
                        color="subtitle"
                        display="inline-flex"
                        size="custom"
                        weight="medium">
                        <span>
                          <PriceLabel
                            amount={priceRoundToNearestNiceNumber(
                              featuredPlan.plan.unitCostCurrency.withPPP.after /
                                (featuredPlan.numberOfMonths ?? 1),
                            )}
                            currency={featuredPlan.plan.currency.toUpperCase()}
                            symbol={featuredPlan.plan.symbol}>
                            {(parts) => (
                              <>
                                {parts[0].value}
                                <Text
                                  className="text-5xl font-bold tracking-tight"
                                  color="default"
                                  size="custom"
                                  weight="custom">
                                  <>
                                    {parts
                                      .slice(1)
                                      .map((part) => part.value)
                                      .join('')}
                                  </>
                                </Text>
                              </>
                            )}
                          </PriceLabel>
                        </span>
                        <span>
                          {featuredPlan.numberOfMonths != null ? (
                            <FormattedMessage
                              defaultMessage="/month"
                              description="Per month"
                              id="aE1FCD"
                            />
                          ) : (
                            <FormattedMessage
                              defaultMessage="paid once"
                              description="Pay the price once"
                              id="BMBc9O"
                            />
                          )}
                        </span>
                      </Text>
                    </div>
                    <Text
                      className="mt-2"
                      display="block"
                      size="body2"
                      weight="medium">
                      <PricingPlanComparisonDiscount
                        plan={featuredPlan.plan}
                        showPPPMessage={showPPPMessage}
                      />
                    </Text>
                    <div className="mt-6">
                      <PricingButtonSection
                        aria-describedby={featuredPlanId}
                        countryCode={countryCode}
                        plan={featuredPlan.plan}
                      />
                    </div>
                    {featuredPlan.plan.allowPromoCode && (
                      <Text
                        className={clsx('mt-3')}
                        color="subtitle"
                        display="block"
                        size="body3">
                        <FormattedMessage
                          defaultMessage="Enjoy extra {discountPercentage}% off with the code {promoCode}"
                          description="Subtitle of discount promotion card"
                          id="ndBo9F"
                          values={{
                            discountPercentage:
                              PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
                            promoCode: PERPETUAL_PROMO_CODE,
                          }}
                        />
                      </Text>
                    )}
                  </>
                }
                subtitle={featuredPlan.description}
                title={
                  <div className="flex items-center gap-x-4">
                    <span id={featuredPlanId}>{featuredPlan.name}</span>
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'While offer lasts',
                        description:
                          'Label to indicate offer is a limited time deal',
                        id: 'N5Cp1r',
                      })}
                      variant="special"
                    />
                  </div>
                }
              />
            </Container>
          </div>
          <Container className="relative">
            <div aria-hidden="true" className="absolute right-0 top-0 -z-10">
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
                  'mx-auto grid max-w-lg grid-cols-1 rounded-3xl dark:bg-neutral-800/20 md:max-w-none md:grid-cols-3',
                  ['divide-y md:divide-x md:divide-y-0', themeDivideColor],
                  ['border', themeLineColor],
                )}>
                {planList.map(
                  ({
                    description,
                    numberOfMonths,
                    plan,
                    includedFeatures,
                    name,
                  }) => {
                    const id = `tier-${plan.planType}`;

                    return (
                      <div
                        key={plan.planType}
                        className="flex flex-col gap-y-8 px-8 py-6 shadow-sm md:gap-y-16">
                        <div className="grow md:grow-0">
                          <div className="flex flex-wrap gap-x-3">
                            <Heading
                              className={clsx(
                                'font-medium',
                                themeTextSubtitleColor,
                              )}
                              id={id}
                              level="custom">
                              {name}
                            </Heading>
                            {plan.planType === 'lifetime' && (
                              <Badge
                                label={intl.formatMessage({
                                  defaultMessage: 'While offer lasts',
                                  description:
                                    'Label to indicate offer is a limited time deal',
                                  id: 'N5Cp1r',
                                })}
                                size="sm"
                                variant="special"
                              />
                            )}
                          </div>
                          <Section>
                            <Text
                              className="mt-1 md:min-h-[40px]"
                              color="secondary"
                              display="block"
                              size="body2">
                              {description}
                            </Text>
                            <div className="mt-8">
                              {showPPPMessage && (
                                <Text
                                  className={clsx(
                                    'items-baseline line-through',
                                  )}
                                  color="subtle"
                                  display="flex">
                                  <PriceLabel
                                    amount={priceRoundToNearestNiceNumber(
                                      plan.unitCostCurrency.base.after /
                                        (numberOfMonths ?? 1),
                                    )}
                                    currency={plan.currency.toUpperCase()}
                                    symbol={plan.symbol}
                                  />{' '}
                                  {numberOfMonths != null ? (
                                    <FormattedMessage
                                      defaultMessage="/month"
                                      description="Per month"
                                      id="aE1FCD"
                                    />
                                  ) : (
                                    <FormattedMessage
                                      defaultMessage="paid once"
                                      description="Pay the price once"
                                      id="BMBc9O"
                                    />
                                  )}
                                </Text>
                              )}
                              <Text
                                className="flex items-baseline gap-x-2"
                                color="subtitle"
                                display="flex"
                                weight="medium">
                                <span>
                                  <PriceLabel
                                    amount={priceRoundToNearestNiceNumber(
                                      plan.unitCostCurrency.withPPP.after /
                                        (numberOfMonths ?? 1),
                                    )}
                                    currency={plan.currency.toUpperCase()}
                                    symbol={plan.symbol}>
                                    {(parts) => (
                                      <>
                                        {parts[0].value}
                                        <Text
                                          className="text-3xl font-bold tracking-tight"
                                          color="default"
                                          size="custom"
                                          weight="custom">
                                          <>
                                            {parts
                                              .slice(1)
                                              .map((part) => part.value)
                                              .join('')}
                                          </>
                                        </Text>
                                      </>
                                    )}
                                  </PriceLabel>
                                </span>
                                {numberOfMonths != null ? (
                                  <FormattedMessage
                                    defaultMessage="/month"
                                    description="Per month"
                                    id="aE1FCD"
                                  />
                                ) : (
                                  <FormattedMessage
                                    defaultMessage="paid once"
                                    description="Pay the price once"
                                    id="BMBc9O"
                                  />
                                )}
                              </Text>
                            </div>
                            <Text
                              className={clsx(
                                'pt-1 md:min-h-[32px]',
                                plan.conversionFactor <
                                  MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE &&
                                  plan.planType === 'lifetime' &&
                                  'invisible',
                              )}
                              display="block"
                              size="body3">
                              <PricingPlanComparisonDiscount
                                plan={plan}
                                showPPPMessage={showPPPMessage}
                              />
                            </Text>
                            <div className="mt-8">
                              <PricingButtonSection
                                aria-describedby={id}
                                countryCode={countryCode}
                                plan={plan}
                              />
                            </div>
                            <Text
                              className={clsx(
                                'mt-3',
                                !plan.allowPromoCode && 'invisible',
                              )}
                              color="subtitle"
                              display="block"
                              size="body3">
                              <FormattedMessage
                                defaultMessage="Enjoy extra {discountPercentage}% off with the code {promoCode}"
                                description="Subtitle of discount promotion card"
                                id="ndBo9F"
                                values={{
                                  discountPercentage:
                                    PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
                                  promoCode: PERPETUAL_PROMO_CODE,
                                }}
                              />
                            </Text>
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
                                    className={clsx(
                                      'h-5 w-5 flex-shrink-0',
                                      themeTextBrandColor,
                                    )}
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
                <Text color="secondary" display="block" size="body3">
                  *{' '}
                  <FormattedMessage
                    defaultMessage="Tip: Many users have reimbursed GreatFrontEnd Premium as part of their company's flexible benefits or learning and training budget."
                    description="Tip at the bottom of the Pricing section to let users they can reimburse their purchase of GreatFrontEnd with their company's learning budgets"
                    id="Xka4d3"
                  />
                </Text>
                <Text color="secondary" display="block" size="body3">
                  *{' '}
                  <FormattedMessage
                    defaultMessage="Prices will be increased as more content is being added to the website."
                    description="Tip at the bottom of the Pricing section to let users know that we would increase prices gradually as the content becomes more complete"
                    id="VJ8xZy"
                  />{' '}
                  <FormattedMessage
                    defaultMessage="Subscribe early to lock in this earlybird price."
                    description="Tip at the bottom of the Pricing section"
                    id="PhPw02"
                  />
                </Text>
                <Text color="secondary" display="block" size="body3">
                  *{' '}
                  <FormattedMessage
                    defaultMessage="Lifetime plan is a limited time offering and will be removed in future."
                    description="Tip at the bottom of the Pricing section"
                    id="bAEOVz"
                  />
                </Text>
                {lifetimePlan.symbol === '$' && (
                  <Text color="secondary" display="block" size="body3">
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
        </Section>
      </div>
    </div>
  );
}
