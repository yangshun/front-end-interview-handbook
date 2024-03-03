import clsx from 'clsx';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, FormattedNumberParts, useIntl } from 'react-intl';
import url from 'url';

import fbq from '~/lib/fbq';
import gtag from '~/lib/gtag';
import { isProhibitedCountry } from '~/lib/stripeUtils';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import type {
  InterviewsPricingPlanDetailsLocalized,
  InterviewsPricingPlansLocalized,
  InterviewsPricingPlanType,
} from '~/data/interviews/InterviewsPricingPlans';

import MarketingSectionHeader from '~/components/common/marketing/MarketingSectionHeader';
import PurpleGlowBackground from '~/components/common/marketing/PurpleGlowBackground';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '~/components/interviews/pricing/pricingConfig';
import PurchasePPPDiscountAlert from '~/components/payments/PurchasePPPDiscountAlert';
import PurchaseProhibitedCountryAlert from '~/components/payments/PurchaseProhibitedCountryAlert';
import type { Props as AnchorProps } from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeRadialGlowBackground,
  themeTextBrandColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import { ProjectsPricingConfig } from './ProjectsPricingConfig';
import ProjectsPricingTable from './ProjectsPricingTable';

import { useSessionContext } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: InterviewsPricingPlansLocalized;
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
  href?: AnchorProps['href'];
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
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
  plan: InterviewsPricingPlanDetailsLocalized;
}>) {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <PricingButton
      aria-describedby={ariaDescribedBy}
      href={signInUpHref({
        query: {
          source: 'buy_now',
        },
      })}
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
  plan: InterviewsPricingPlanDetailsLocalized;
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

  async function processSubscription(planType: InterviewsPricingPlanType) {
    if (isCheckoutSessionLoading) {
      return;
    }

    setIsCheckoutSessionLoading(true);
    setError(null);
    try {
      const res = await fetch(
        url.format({
          pathname: '/api/payments/purchase/checkout',
          query: {
            plan_type: planType,
          },
        }),
      );
      const { payload } = await res.json();

      if (hasClickedRef.current) {
        window.location.href = payload.url;

        return;
      }

      setCheckoutSessionHref(payload.url);
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
  plan: InterviewsPricingPlanDetailsLocalized;
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
  plan: InterviewsPricingPlanDetailsLocalized;
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
  plan: InterviewsPricingPlanDetailsLocalized;
}>;

export default function ProjectsPricingSection({
  countryCode,
  countryName,
  plans,
}: Props) {
  const intl = useIntl();

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
        'isolate',
        'py-12 lg:mx-8 lg:py-24',
        'lg:rounded-t-3xl xl:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <div className="mx-auto max-w-5xl text-center">
          <MarketingSectionHeader
            heading={
              <FormattedMessage
                defaultMessage="Choose your pricing plan"
                description="Title of Pricing section"
                id="hqzG5o"
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
        </div>
        <Section>
          <div>
            {/* Banners */}
            <div className="flex flex-col gap-y-5">
              <PurchaseProhibitedCountryAlert countryCode={countryCode} />
              {showPPPMessage && (
                <PurchasePPPDiscountAlert
                  countryName={countryName}
                  discount={Math.ceil(
                    100 - featuredPlan.plan.conversionFactor * 100,
                  )}
                />
              )}
            </div>
            {/* Pricing table */}
            <div className="relative mt-8">
              <div aria-hidden="true" className="absolute right-0 top-0 -z-10">
                <PurpleGlowBackground />
              </div>
              <Heading className="sr-only" level="custom">
                <FormattedMessage
                  defaultMessage="Pricing Plans"
                  description="Screen reader text referring to the Pricing Plan cards"
                  id="iElBQT"
                />
              </Heading>
              <Section>
                <ProjectsPricingTable plans={ProjectsPricingConfig} />
              </Section>
              {/* Footnotes */}
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
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
