import clsx from 'clsx';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useId } from 'react';
import { useState } from 'react';
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import url from 'url';

import fbq from '~/lib/fbq';
import gtag from '~/lib/gtag';
import { isProhibitedCountry } from '~/lib/stripeUtils';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  InterviewsPricingPlanPaymentConfigLocalized,
  InterviewsPricingPlanPaymentConfigLocalizedRecord,
  InterviewsPricingPlanType,
} from '~/components/interviews/purchase/InterviewsPricingPlans';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import PurpleGlowBackground from '~/components/marketing/PurpleGlowBackground';
import { SocialDiscountAlert } from '~/components/promotions/social/SocialDiscountAlert';
import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import PurchasePPPDiscountAlert from '~/components/purchase/PurchasePPPDiscountAlert';
import PurchasePriceAnnualComparison from '~/components/purchase/PurchasePriceAnnualComparison';
import PurchasePriceLabel from '~/components/purchase/PurchasePriceLabel';
import PurchasePriceMonthlyComparison from '~/components/purchase/PurchasePriceMonthlyComparison';
import PurchasePriceQuarterlyComparison from '~/components/purchase/PurchasePriceQuarterlyComparison';
import PurchaseProhibitedCountryAlert from '~/components/purchase/PurchaseProhibitedCountryAlert';
import type { Props as AnchorProps } from '~/components/ui/Anchor';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeDivideColor,
  themeRadialGlowBackground,
  themeTextBrandColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import PurchaseBlockCard from '../../purchase/PurchaseBlockCard';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '../../purchase/PurchasePricingConfig';
import { priceRoundToNearestNiceNumber } from '../../purchase/PurchasePricingUtils';

import { useSessionContext } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

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
  paymentConfig,
}: Readonly<{
  'aria-describedby': string;
  isDisabled: boolean;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
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
            paymentConfig.planType
          } plan for ${paymentConfig.currency.toLocaleUpperCase()} ${
            paymentConfig.unitCostCurrency.withPPP.after
          } but not signed in`,
          title: 'Checkout initiate (non-signed in)',
        });
        logEvent('checkout.attempt.not_logged_in', {
          currency: paymentConfig.currency.toLocaleUpperCase(),
          plan: paymentConfig.planType,
          value: paymentConfig.unitCostCurrency.withPPP.after,
        });
      }}
    />
  );
}

function PricingButtonNonPremium({
  'aria-describedby': ariaDescribedBy,
  paymentConfig,
}: Readonly<{
  'aria-describedby': string;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
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
        currency: paymentConfig.currency.toLocaleUpperCase(),
        plan: planType,
        value: paymentConfig.unitCostCurrency.withPPP.after,
      });
    } finally {
      setIsCheckoutSessionLoading(false);
    }
  }

  useEffect(() => {
    if (
      userProfile != null &&
      !userProfile.isPremium &&
      paymentConfig.planType === 'lifetime' &&
      checkoutSessionHref == null
    ) {
      // Eagerly generate the checkout page URL for lifetime plan
      // in the background because it takes a while.
      processSubscription(paymentConfig.planType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, checkoutSessionHref, paymentConfig.planType]);

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
              currency: paymentConfig.currency.toLocaleUpperCase(),
            },
            value: paymentConfig.unitCostCurrency.withPPP.after,
          });
          fbq.track('InitiateCheckout', {
            content_category: paymentConfig.planType,
            currency: paymentConfig.currency.toLocaleUpperCase(),
            value: paymentConfig.unitCostCurrency.withPPP.after,
          });
          logMessage({
            level: 'info',
            message: `${
              paymentConfig.planType
            } plan for ${paymentConfig.currency.toLocaleUpperCase()} ${
              paymentConfig.unitCostCurrency.withPPP.after
            }`,
            title: 'Checkout Initiate',
          });
          logEvent('checkout.attempt', {
            currency: paymentConfig.currency.toLocaleUpperCase(),
            plan: paymentConfig.planType,
            value: paymentConfig.unitCostCurrency.withPPP.after,
          });

          if (checkoutSessionHref != null) {
            return;
          }

          return processSubscription(paymentConfig.planType);
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
  paymentConfig,
}: Readonly<{
  'aria-describedby': string;
  countryCode: string;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
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
          paymentConfig={paymentConfig}
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
      paymentConfig={paymentConfig}
    />
  );
}

function PricingPlanComparisonDiscount({
  paymentConfig,
  showPPPMessage,
}: Readonly<{
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
  showPPPMessage: boolean;
}>) {
  switch (paymentConfig.planType) {
    case 'monthly':
      return <PurchasePriceMonthlyComparison price={paymentConfig} />;
    case 'quarterly':
      return (
        <PurchasePriceQuarterlyComparison
          discount={paymentConfig.discount}
          price={paymentConfig}
        />
      );
    case 'annual':
      return (
        <PurchasePriceAnnualComparison
          discount={paymentConfig.discount}
          price={paymentConfig}
        />
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
            discountPercentage: paymentConfig.discount,
            price: (
              <PurchasePriceLabel
                amount={paymentConfig.unitCostCurrency.withPPP.before}
                currency={paymentConfig.currency.toUpperCase()}
                symbol={paymentConfig.symbol}
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

type InterviewsPricingPlanItem = Readonly<{
  description: string;
  includedFeatures: ReadonlyArray<React.ReactNode>;
  name: string;
  numberOfMonths?: number;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
}>;

export default function InterviewsPricingSection({
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

  const monthlyPlanDetails: InterviewsPricingPlanItem = {
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
    paymentConfig: monthlyPlan,
  };

  const quarterlyPlanDetails: InterviewsPricingPlanItem = {
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
    paymentConfig: quarterlyPlan,
  };

  const annualPlanDetails: InterviewsPricingPlanItem = {
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
    paymentConfig: annualPlan,
  };

  const lifetimePlanDetails: InterviewsPricingPlanItem = {
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
    paymentConfig: lifetimePlan,
  };

  const planList = [
    monthlyPlanDetails,
    quarterlyPlanDetails,
    annualPlanDetails,
  ];

  const featuredPlan = lifetimePlanDetails;
  const showPPPMessage =
    featuredPlan.paymentConfig.conversionFactor <
    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE;

  const promoMessage = (
    <FormattedMessage
      defaultMessage="Enjoy {discountPercentage}% off all plans by <follow>following us on social media</follow>. Check out other <promotion>promotions</promotion>!"
      description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
      id="47LloU"
      values={{
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
        follow: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/rewards/social"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.rewards.click`,
                category: 'engagement',
                label: 'following us on social media',
              });
              logEvent('click', {
                element: 'Promo banner rewards',
                label: 'following us on social media',
              });
            }}>
            {chunks}
          </Anchor>
        ),
        promotion: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/promotions"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.promotions.click`,
                category: 'engagement',
                label: 'promotions',
              });
              logEvent('click', {
                element: 'Promo banner',
                label: 'Promotions',
              });
            }}>
            {chunks}
          </Anchor>
        ),
      }}
    />
  );

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
        </div>
        <Section>
          <div>
            {/* Banners */}
            <div className="flex flex-col gap-y-5">
              <PurchaseProhibitedCountryAlert countryCode={countryCode} />
              <SocialDiscountAlert />
              {showPPPMessage && (
                <PurchasePPPDiscountAlert
                  countryName={countryName}
                  discount={Math.ceil(
                    100 - featuredPlan.paymentConfig.conversionFactor * 100,
                  )}
                />
              )}
            </div>
            {/* Lifetime plan callout */}
            <div className="mt-12">
              <PurchaseBlockCard
                features={featuredPlan.includedFeatures}
                glow={true}
                rightSectionContents={
                  <>
                    <div className="flex flex-col">
                      {showPPPMessage && (
                        <Text
                          className={clsx(
                            'inline-flex flex-wrap items-end text-lg line-through',
                            featuredPlan.paymentConfig.unitCostCurrency.withPPP
                              .after < 1000 && 'sm:text-lg',
                          )}
                          color="subtle"
                          display="inline-flex"
                          size="inherit"
                          weight="medium">
                          <PurchasePriceLabel
                            amount={priceRoundToNearestNiceNumber(
                              featuredPlan.paymentConfig.unitCostCurrency.base
                                .after / (featuredPlan.numberOfMonths ?? 1),
                            )}
                            currency={featuredPlan.paymentConfig.currency.toUpperCase()}
                            symbol={featuredPlan.paymentConfig.symbol}
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
                        className={clsx('inline-flex items-end gap-x-2', [
                          'text-xl',
                          featuredPlan.paymentConfig.unitCostCurrency.withPPP
                            .after < 1000 && 'sm:text-xl',
                        ])}
                        color="subtitle"
                        display="inline-flex"
                        size="inherit"
                        weight="medium">
                        <span>
                          <PurchasePriceLabel
                            amount={priceRoundToNearestNiceNumber(
                              featuredPlan.paymentConfig.unitCostCurrency
                                .withPPP.after /
                                (featuredPlan.numberOfMonths ?? 1),
                            )}
                            currency={featuredPlan.paymentConfig.currency.toUpperCase()}
                            symbol={featuredPlan.paymentConfig.symbol}>
                            {(parts) => (
                              <>
                                {parts[0].value}
                                <Text
                                  className="text-5xl font-bold tracking-tight"
                                  color="default"
                                  size="inherit"
                                  weight="inherit">
                                  <>
                                    {parts
                                      .slice(1)
                                      .map((part) => part.value)
                                      .join('')}
                                  </>
                                </Text>
                              </>
                            )}
                          </PurchasePriceLabel>
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
                        paymentConfig={featuredPlan.paymentConfig}
                        showPPPMessage={showPPPMessage}
                      />
                    </Text>
                    <div className="mt-6">
                      <PricingButtonSection
                        aria-describedby={featuredPlanId}
                        countryCode={countryCode}
                        paymentConfig={featuredPlan.paymentConfig}
                      />
                    </div>
                    {featuredPlan.paymentConfig.allowPromoCode && (
                      <Text
                        className="mt-3"
                        color="subtitle"
                        display="block"
                        size="body3">
                        {promoMessage}
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
            </div>
            {/* Pricing table */}
            <div className="relative mt-10 sm:mt-20">
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
                <div
                  className={clsx(
                    'grid grid-cols-1 md:grid-cols-3',
                    'mx-auto max-w-lg md:max-w-none',
                    'dark:bg-neutral-800/20',
                    'rounded-3xl',
                    ['divide-y md:divide-x md:divide-y-0', themeDivideColor],
                    ['border', themeBorderColor],
                  )}>
                  {planList.map(
                    ({
                      description,
                      numberOfMonths,
                      paymentConfig,
                      includedFeatures,
                      name,
                    }) => {
                      const id = `tier-${paymentConfig.planType}`;

                      return (
                        <div
                          key={paymentConfig.planType}
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
                              {paymentConfig.planType === 'lifetime' && (
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
                                className="md:min-h-10 mt-1"
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
                                    <PurchasePriceLabel
                                      amount={priceRoundToNearestNiceNumber(
                                        paymentConfig.unitCostCurrency.base
                                          .after / (numberOfMonths ?? 1),
                                      )}
                                      currency={paymentConfig.currency.toUpperCase()}
                                      symbol={paymentConfig.symbol}
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
                                    <PurchasePriceLabel
                                      amount={priceRoundToNearestNiceNumber(
                                        paymentConfig.unitCostCurrency.withPPP
                                          .after / (numberOfMonths ?? 1),
                                      )}
                                      currency={paymentConfig.currency.toUpperCase()}
                                      symbol={paymentConfig.symbol}>
                                      {(parts) => (
                                        <>
                                          {parts[0].value}
                                          <Text
                                            className="text-3xl font-bold tracking-tight"
                                            color="default"
                                            size="inherit"
                                            weight="inherit">
                                            <>
                                              {parts
                                                .slice(1)
                                                .map((part) => part.value)
                                                .join('')}
                                            </>
                                          </Text>
                                        </>
                                      )}
                                    </PurchasePriceLabel>
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
                                  'md:min-h-8 pt-1',
                                  paymentConfig.conversionFactor <
                                    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE &&
                                    paymentConfig.planType === 'lifetime' &&
                                    'invisible',
                                )}
                                display="block"
                                size="body3">
                                <PricingPlanComparisonDiscount
                                  paymentConfig={paymentConfig}
                                  showPPPMessage={showPPPMessage}
                                />
                              </Text>
                              <div className="mt-8">
                                <PricingButtonSection
                                  aria-describedby={id}
                                  countryCode={countryCode}
                                  paymentConfig={paymentConfig}
                                />
                              </div>
                              <Text
                                className={clsx(
                                  'mt-3',
                                  !paymentConfig.allowPromoCode && 'invisible',
                                )}
                                color="subtitle"
                                display="block"
                                size="body3">
                                {promoMessage}
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
                                  ['border-y', themeBorderColor],
                                  ['divide-y', themeDivideColor],
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
                                        'size-5 shrink-0',
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
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
