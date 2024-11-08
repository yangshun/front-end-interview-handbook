import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useId } from 'react';
import { useState } from 'react';
import {
  RiCheckLine,
  RiDiscountPercentFill,
  RiInformationLine,
} from 'react-icons/ri';
import url from 'url';
import { useSessionStorage } from 'usehooks-ts';

import { isProhibitedCountry } from '~/lib/stripeUtils';
import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { MAX_PPP_ELIGIBLE_FOR_FAANG_TECH_LEADS_PROMO } from '~/data/PromotionConfig';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsRibbonBadge from '~/components/interviews/common/InterviewsRibbonBadge';
import type {
  InterviewsPricingPlanPaymentConfigLocalized,
  InterviewsPricingPlanPaymentConfigLocalizedRecord,
  InterviewsPricingPlanType,
} from '~/components/interviews/purchase/InterviewsPricingPlans';
import { FormattedMessage, useIntl } from '~/components/intl';
import { SocialDiscountAlert } from '~/components/promotions/social/SocialDiscountAlert';
import PurchasePriceAnnualComparison from '~/components/purchase/comparison/PurchasePriceAnnualComparison';
import PurchasePriceMonthlyComparison from '~/components/purchase/comparison/PurchasePriceMonthlyComparison';
import PurchasePriceQuarterlyComparison from '~/components/purchase/comparison/PurchasePriceQuarterlyComparison';
import {
  purchaseFailureLogging,
  purchaseInitiateLogging,
  purchaseInitiateLoggingNonSignedIn,
} from '~/components/purchase/PurchaseLogging';
import PurchasePriceLabel from '~/components/purchase/PurchasePriceLabel';
import PurchaseProhibitedCountryAlert from '~/components/purchase/PurchaseProhibitedCountryAlert';
import type { Props as AnchorProps } from '~/components/ui/Anchor';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading, { headingCVA } from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundSuccessColor,
  themeBorderColor,
  themeGlassyBorder,
  themeTextBrandColor,
  themeTextSubtleColor,
  themeTextSuccessColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import InterviewsPaymentFailureDialog from './InterviewsPaymentFailureDialog';
import PurchaseBlockCard from '../../purchase/PurchaseBlockCard';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '../../purchase/PurchasePricingConfig';
import { priceRoundToNearestNiceNumber } from '../../purchase/PurchasePricingUtils';

import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: InterviewsPricingPlanPaymentConfigLocalizedRecord;
  titleEl?: React.ReactNode;
  useCurrentPageAsCancelUrl?: boolean;
  view?: 'default' | 'dialog';
}>;

function PricingButton({
  'aria-describedby': ariaDescribedBy,
  href,
  isDisabled,
  isLoading,
  variant,
  label,
  onClick,
}: Readonly<{
  'aria-describedby': string;
  href?: AnchorProps['href'];
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  variant: ComponentProps<typeof Button>['variant'];
}>) {
  return (
    <Button
      aria-describedby={ariaDescribedBy}
      display="block"
      href={href}
      isDisabled={isLoading || isDisabled}
      isLoading={isLoading}
      label={label}
      size="md"
      target="_self"
      type="button"
      variant={variant}
      onClick={onClick}
    />
  );
}

function PricingButtonNonLoggedIn({
  'aria-describedby': ariaDescribedBy,
  isDisabled,
  paymentConfig,
  variant,
}: Readonly<{
  'aria-describedby': string;
  isDisabled: boolean;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
  variant: ComponentProps<typeof Button>['variant'];
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
      isDisabled={isDisabled}
      label={intl.formatMessage({
        defaultMessage: 'Buy now',
        description: 'Purchase button label',
        id: '9gs1LO',
      })}
      variant={variant}
      onClick={() => {
        purchaseInitiateLoggingNonSignedIn({
          plan: paymentConfig.planType,
          product: 'interviews',
          purchasePrice: paymentConfig,
        });
      }}
    />
  );
}

function PricingButtonNonPremium({
  'aria-describedby': ariaDescribedBy,
  paymentConfig,
  useCurrentPageAsCancelUrl,
  variant,
}: Readonly<{
  'aria-describedby': string;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
  useCurrentPageAsCancelUrl: boolean;
  variant: ComponentProps<typeof Button>['variant'];
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function processSubscription(planType: InterviewsPricingPlanType) {
    if (isCheckoutSessionLoading) {
      return;
    }

    setIsCheckoutSessionLoading(true);
    setErrorMessage(null);
    try {
      const cancelURL = new URL(
        window.location.pathname,
        window.location.origin,
      );
      const res = await fetch(
        url.format({
          pathname: '/api/payments/purchase/checkout',
          query: {
            cancel_url: useCurrentPageAsCancelUrl ? cancelURL.href : undefined,
            plan_type: planType,
            product_domain: 'interviews',
          },
        }),
      );
      const { payload } = await res.json();

      if (hasClickedRef.current) {
        window.location.href = payload.url;

        return;
      }

      setCheckoutSessionHref(payload.url);
    } catch (error: unknown) {
      if (hasClickedRef.current) {
        setErrorMessage(
          intl.formatMessage({
            defaultMessage:
              'An error has occurred. Please try again later and contact support if the error persists.',
            description:
              'Error message shown to user when they are trying to checkout but it fails',
            id: 'Hj6BTz',
          }),
        );
      }

      purchaseFailureLogging({
        error,
        plan: planType,
        product: 'interviews',
        purchasePrice: paymentConfig,
      });
    } finally {
      setIsCheckoutSessionLoading(false);
    }
  }

  useEffect(() => {
    if (
      userProfile != null &&
      !userProfile.isInterviewsPremium &&
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
        isDisabled={showUserThereIsAsyncRequest || isUserProfileLoading}
        isLoading={showUserThereIsAsyncRequest}
        label={intl.formatMessage({
          defaultMessage: 'Buy now',
          description: 'Purchase button label',
          id: '9gs1LO',
        })}
        variant={variant}
        onClick={() => {
          setHasClicked(true);
          hasClickedRef.current = true;

          purchaseInitiateLogging({
            plan: paymentConfig.planType,
            product: 'interviews',
            purchasePrice: paymentConfig,
          });

          if (checkoutSessionHref != null) {
            return;
          }

          return processSubscription(paymentConfig.planType);
        }}
      />
      {errorMessage && (
        <Text className="text-center" color="error" size="body3">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

function PricingButtonSection({
  'aria-describedby': ariaDescribedBy,
  countryCode,
  paymentConfig,
  useCurrentPageAsCancelUrl,
  variant,
}: Readonly<{
  'aria-describedby': string;
  countryCode: string;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
  useCurrentPageAsCancelUrl: boolean;
  variant: ComponentProps<typeof Button>['variant'];
}>) {
  const intl = useIntl();
  const { isLoading: isUserLoading } = useSessionContext();
  const { userProfile, isUserProfileLoading } = useUserProfile();

  const isPending = isUserLoading || isUserProfileLoading;

  if (isProhibitedCountry(countryCode)) {
    return null;
  }

  if (userProfile) {
    if (!userProfile.isInterviewsPremium) {
      // User is logged in but not a premium user.
      return (
        <PricingButtonNonPremium
          aria-describedby={ariaDescribedBy}
          paymentConfig={paymentConfig}
          useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
          variant={variant}
        />
      );
    }

    // User is already subscribed, link to billing page.
    return (
      <PricingButton
        aria-describedby={ariaDescribedBy}
        href="/profile/billing"
        isDisabled={isPending}
        label={intl.formatMessage({
          defaultMessage: 'Manage subscription',
          description: 'Manage user membership subscription button label',
          id: 'sjLtW1',
        })}
        variant={variant}
      />
    );
  }

  // User is not logged in, they have to create an account first.
  return (
    <PricingButtonNonLoggedIn
      aria-describedby={ariaDescribedBy}
      isDisabled={isPending}
      paymentConfig={paymentConfig}
      variant={variant}
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
      return <PurchasePriceQuarterlyComparison price={paymentConfig} />;
    case 'annual':
      return <PurchasePriceAnnualComparison price={paymentConfig} />;
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

function FTLPromoSection() {
  return (
    <div>
      <Text className="block" color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="Included for free"
          description="Bonus freebie for purchasing"
          id="GEjP1P"
        />
      </Text>
      <div className="mt-2 flex items-center gap-3">
        <Text
          className={clsx(
            'bg-rose-500 font-extrabold text-white',
            'px-2 py-1.5',
            'rounded',
          )}
          color="light"
          size="body2">
          FTL
        </Text>
        <Anchor
          className={clsx(
            textVariants({
              className: 'grow',
              color: 'secondary',
              size: 'body3',
            }),
            'hover:underline',
          )}
          href="https://faangtechleads.com"
          variant="unstyled">
          FAANG Tech Leads Software Engineer Resume References and Handbook
          Package
        </Anchor>
        <Text className="whitespace-nowrap" size="body0" weight="bold">
          28 USD
        </Text>
      </div>
    </div>
  );
}

type InterviewsPricingPlanItem = Readonly<{
  description?: React.ReactNode;
  ftlPromo?: boolean;
  includedFeatures: ReadonlyArray<React.ReactNode>;
  name: string;
  numberOfMonths?: number;
  paymentConfig: InterviewsPricingPlanPaymentConfigLocalized;
}>;

export default function InterviewsPricingTableSection({
  countryCode,
  countryName,
  plans,
  titleEl,
  view = 'default',
  useCurrentPageAsCancelUrl = false,
}: Props) {
  const intl = useIntl();
  const featuredPlanId = useId();
  const user = useUser();
  const { data: lastPaymentError } = trpc.purchases.lastPaymentError.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const [showPaymentFailureDialog, setShowPaymentFailureDialog] =
    useState(false);
  const [hasDismissedFailureDialog, setHasDismissedFailureDialog] =
    useSessionStorage('gfe:payment-failure', false);

  useEffect(() => {
    if (lastPaymentError != null && !hasDismissedFailureDialog) {
      setShowPaymentFailureDialog(true);
    }
  }, [lastPaymentError, hasDismissedFailureDialog]);

  const isDialogView = view === 'dialog';

  const {
    monthly: monthlyPlan,
    quarterly: quarterlyPlan,
    lifetime: lifetimePlan,
    annual: annualPlan,
  } = plans;

  const featureAllAccess = (
    <span>
      {intl.formatMessage({
        defaultMessage: 'Unlock all premium interviews content',
        description: 'Feature of pricing plan',
        id: 'TWF/3l',
      })}
      <Tooltip
        label={
          <ul className="flex flex-col gap-y-1.5">
            {[
              {
                key: 'unlock-all',
                label: (
                  <FormattedMessage
                    defaultMessage="Unlock all premium interviews content"
                    description="Tooltip label for unlock all premium interviews content"
                    id="EtxfAG"
                  />
                ),
              },
              {
                key: 'official-solutions',
                label: (
                  <FormattedMessage
                    defaultMessage="Official solutions for all questions, authored by former FAANG interviewers"
                    description="Tooltip label for unlock all premium interviews content"
                    id="vVS7kl"
                  />
                ),
              },
              {
                key: 'system-design',
                label: (
                  <FormattedMessage
                    defaultMessage="Comprehensive front end system design guides"
                    description="Tooltip label for unlock all premium interviews content"
                    id="HsLNW4"
                  />
                ),
              },
              {
                key: 'company-specific',
                label: (
                  <FormattedMessage
                    defaultMessage="Company-specific guides for targeted interview preparation"
                    description="Tooltip label for unlock all premium interviews content"
                    id="3J1qTY"
                  />
                ),
              },
              {
                key: 'study-plans',
                label: (
                  <FormattedMessage
                    defaultMessage="Specialized study plans for different interview objectives"
                    description="Tooltip label for unlock all premium interviews content"
                    id="fDOayR"
                  />
                ),
              },
            ].map(({ label, key }) => (
              <li key={key} className="flex items-center gap-2">
                <RiCheckLine
                  aria-hidden="true"
                  className={clsx('size-3.5 shrink-0', themeTextSuccessColor)}
                />
                <Text color="inherit" size="inherit" weight="medium">
                  {label}
                </Text>
              </li>
            ))}
          </ul>
        }
        triggerClassName="ml-2 inline align-middle">
        <RiInformationLine
          aria-hidden={true}
          className={clsx('size-4 shrink-0', themeTextSubtleColor)}
        />
      </Tooltip>
    </span>
  );
  const featureContinuousUpdates = intl.formatMessage({
    defaultMessage: 'Access to updates while subscription is active',
    description: 'Feature of monthly pricing plan',
    id: '14LihX',
  });
  const featureDiscordAccess = intl.formatMessage({
    defaultMessage:
      'Exclusive private Discord channel with real-time support from the team',
    description: 'Feature of annual pricing plan',
    id: 'ANnHJ7',
  });

  const monthlyPlanDetails: InterviewsPricingPlanItem = {
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
    ftlPromo: true,
    includedFeatures: [
      featureAllAccess,
      featureContinuousUpdates,
      featureDiscordAccess,
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
        'Pay once, get full access to the interviews platform forever',
      description:
        'Subtitle of LifeTime Access Pricing Plan found on Homepage or Pricing page',
      id: '4P9bN0',
    }),
    ftlPromo: true,
    includedFeatures: [featureAllAccess, featureDiscordAccess],
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
    featuredPlan.paymentConfig.conversionFactor <=
    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE;
  const showFTLBundle =
    featuredPlan.paymentConfig.conversionFactor <=
    MAX_PPP_ELIGIBLE_FOR_FAANG_TECH_LEADS_PROMO;

  return (
    <div
      className={clsx(
        'flex flex-col',
        titleEl ? 'gap-y-12 lg:gap-y-16' : 'gap-y-8',
      )}>
      <div className="flex flex-col gap-y-8">
        {/* Banners */}
        <div className="flex flex-col gap-y-5">
          <PurchaseProhibitedCountryAlert countryCode={countryCode} />
          <div className="flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
            {showPPPMessage && (
              <Tooltip
                asChild={true}
                label={
                  <FormattedMessage
                    defaultMessage="We've automatically applied a {discountPercentage}% discount on all prices to account for purchasing power in {countryName}"
                    description="Tooltip for purchasing power parity"
                    id="RNRY70"
                    values={{
                      countryName,
                      discountPercentage: Math.ceil(
                        100 - featuredPlan.paymentConfig.conversionFactor * 100,
                      ),
                    }}
                  />
                }>
                <div
                  className={clsx(
                    'flex items-center gap-2',
                    'rounded-full',
                    'px-2 py-[5px]',
                    textVariants({ size: 'body3', weight: 'medium' }),
                    themeGlassyBorder,
                  )}>
                  <div
                    className={clsx(
                      'flex items-center justify-center',
                      'size-5',
                      'rounded-full',
                      themeBackgroundSuccessColor,
                    )}>
                    <RiDiscountPercentFill
                      aria-hidden={true}
                      className="size-3 text-white"
                    />
                  </div>
                  <FormattedMessage
                    defaultMessage="Purchasing power parity for {countryName} - {discountPercentage}% discount applied!"
                    description="Purchasing power parity message"
                    id="8Gd7BO"
                    values={{
                      countryName,
                      discountPercentage: Math.ceil(
                        100 - featuredPlan.paymentConfig.conversionFactor * 100,
                      ),
                    }}
                  />
                </div>
              </Tooltip>
            )}
            <SocialDiscountAlert />
          </div>
        </div>
        {titleEl}
      </div>
      <div className="flex flex-col gap-y-8">
        {/* Lifetime plan callout */}
        <PurchaseBlockCard
          className={isDialogView ? '!max-w-none' : undefined}
          features={featuredPlan.includedFeatures}
          footer={
            showFTLBundle ? (
              <>
                <Divider className="mb-4" />
                <FTLPromoSection />
              </>
            ) : undefined
          }
          leftSectionContents={
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
                    size="inherit">
                    <PurchasePriceLabel
                      amount={priceRoundToNearestNiceNumber(
                        featuredPlan.paymentConfig.unitCostCurrency.base.after /
                          (featuredPlan.numberOfMonths ?? 1),
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
                  className={clsx('inline-flex items-end gap-x-2')}
                  color="secondary"
                  size="inherit">
                  <span>
                    <PurchasePriceLabel
                      amount={priceRoundToNearestNiceNumber(
                        featuredPlan.paymentConfig.unitCostCurrency.withPPP
                          .after / (featuredPlan.numberOfMonths ?? 1),
                      )}
                      currency={featuredPlan.paymentConfig.currency.toUpperCase()}
                      symbol={featuredPlan.paymentConfig.symbol}>
                      {(parts) => (
                        <Text
                          className={headingCVA({
                            level: 'heading2',
                            weight: 'medium',
                          })}
                          color="default"
                          size="inherit"
                          weight="inherit">
                          {parts[0].value}
                          {parts
                            .slice(1)
                            .map((part) => part.value)
                            .join('')}
                        </Text>
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
              {!(
                featuredPlan.paymentConfig.planType === 'lifetime' &&
                showPPPMessage
              ) && (
                <Text
                  className="mt-2 block"
                  color="secondary"
                  size="body2"
                  weight="medium">
                  <PricingPlanComparisonDiscount
                    paymentConfig={featuredPlan.paymentConfig}
                    showPPPMessage={showPPPMessage}
                  />
                </Text>
              )}
              <div className="mt-6">
                <PricingButtonSection
                  aria-describedby={featuredPlanId}
                  countryCode={countryCode}
                  paymentConfig={featuredPlan.paymentConfig}
                  useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
                  variant="primary"
                />
              </div>
            </>
          }
          subtitle={featuredPlan.description}
          title={
            <div className="flex items-center justify-between gap-x-4">
              <span id={featuredPlanId}>{featuredPlan.name}</span>
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'While offer lasts',
                  description: 'Label to indicate offer is a limited time deal',
                  id: 'N5Cp1r',
                })}
                variant="neutral-active"
              />
            </div>
          }
        />
        {/* Pricing table */}
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
              'grid grid-cols-1 gap-8 md:gap-4 lg:gap-8',
              isDialogView ? 'xl:grid-cols-3' : 'md:grid-cols-3',
              !isDialogView && 'mx-auto max-w-lg md:max-w-none',
            )}>
            {planList.map(
              ({
                numberOfMonths,
                paymentConfig,
                includedFeatures,
                name,
                ftlPromo,
              }) => {
                const id = `tier-${paymentConfig.planType}`;
                const recommendedPlan = paymentConfig.planType === 'annual';

                return (
                  <div
                    key={paymentConfig.planType}
                    className={clsx(
                      'relative isolate',
                      'shadow-sm',
                      'rounded-xl',
                      themeBackgroundColor,
                      ['border', themeBorderColor],
                    )}>
                    <div
                      className={clsx(
                        '!absolute inset-0 overflow-hidden',
                        recommendedPlan && [
                          themeWhiteGlowCardBackground,
                          'before:-top-[120px] before:left-1/2 before:h-[240px] before:w-[240px] before:-translate-x-1/2',
                        ],
                      )}
                    />
                    <div
                      className={clsx(
                        'relative z-[1]',
                        'flex flex-col gap-y-6 rounded-[inherit] p-6',
                      )}>
                      <div className="grow md:grow-0">
                        <div className="flex flex-wrap gap-x-3">
                          <Heading
                            className={clsx(
                              textVariants({
                                size: 'body2',
                                weight: 'medium',
                              }),
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
                          <div className="mt-6">
                            {showPPPMessage && (
                              <Text
                                className={clsx(
                                  'flex items-baseline line-through',
                                )}
                                color="subtle"
                                size="body1">
                                <PurchasePriceLabel
                                  amount={priceRoundToNearestNiceNumber(
                                    paymentConfig.unitCostCurrency.base.after /
                                      (numberOfMonths ?? 1),
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
                              className="flex flex-wrap items-baseline gap-x-2"
                              color="subtitle"
                              size="body1"
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
                                    <Text
                                      className={headingCVA({
                                        level: 'heading2',
                                        weight: 'medium',
                                      })}
                                      color="default"
                                      size="inherit"
                                      weight="inherit">
                                      <>
                                        {parts[0].value}
                                        {parts
                                          .slice(1)
                                          .map((part) => part.value)
                                          .join('')}
                                      </>
                                    </Text>
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
                              'md:min-h-9 mt-3 block',
                              paymentConfig.conversionFactor <
                                MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE &&
                                paymentConfig.planType === 'lifetime' &&
                                'invisible',
                            )}
                            color="secondary"
                            size="body3">
                            <PricingPlanComparisonDiscount
                              paymentConfig={paymentConfig}
                              showPPPMessage={showPPPMessage}
                            />
                          </Text>
                          <div className="mt-6">
                            <PricingButtonSection
                              aria-describedby={id}
                              countryCode={countryCode}
                              paymentConfig={paymentConfig}
                              useCurrentPageAsCancelUrl={
                                useCurrentPageAsCancelUrl
                              }
                              variant="secondary"
                            />
                          </div>
                        </Section>
                      </div>
                      <Divider />
                      <Section>
                        <Heading className="sr-only" level="custom">
                          <FormattedMessage
                            defaultMessage="What's Included"
                            description="Section label for features included in a pricing plan"
                            id="IhJAk8"
                          />
                        </Heading>
                        <Section>
                          <ul className="flex flex-col gap-4" role="list">
                            {includedFeatures.map((feature, idx) => (
                              <li
                                // eslint-disable-next-line react/no-array-index-key
                                key={idx}
                                className="flex gap-x-3">
                                <RiCheckLine
                                  aria-hidden="true"
                                  className={clsx(
                                    'size-5 shrink-0',
                                    themeTextSuccessColor,
                                  )}
                                />
                                <Text color="secondary" size="body3">
                                  {feature}
                                </Text>
                              </li>
                            ))}
                          </ul>
                        </Section>
                        {ftlPromo && showFTLBundle && (
                          <>
                            <Divider />
                            <FTLPromoSection />
                          </>
                        )}
                      </Section>
                    </div>
                    {recommendedPlan && (
                      <InterviewsRibbonBadge
                        className="top-4"
                        label={intl.formatMessage({
                          defaultMessage: 'RECOMMENDED',
                          description:
                            'Label to recommended badge for pricing plan',
                          id: '23RvBU',
                        })}
                        variant="primary"
                      />
                    )}
                  </div>
                );
              },
            )}
          </div>
        </Section>
        {/* Footnotes */}
        <div>
          <Text className="block" color="secondary" size="body3">
            *{' '}
            <FormattedMessage
              defaultMessage="Tip: Many users have reimbursed GreatFrontEnd Interviews Premium as part of their company's flexible benefits or learning and training budget."
              description="Tip at the bottom of the Pricing section to let users they can reimburse their purchase of GreatFrontEnd with their company's learning budgets"
              id="FixyP6"
            />
          </Text>
          <Text className="block" color="secondary" size="body3">
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
          <Text className="block" color="secondary" size="body3">
            *{' '}
            <FormattedMessage
              defaultMessage="Lifetime plan is a limited time offering and will be removed in future."
              description="Tip at the bottom of the Pricing section"
              id="bAEOVz"
            />
          </Text>
          {lifetimePlan.symbol === '$' && (
            <Text className="block" color="secondary" size="body3">
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
      <InterviewsPaymentFailureDialog
        isShown={showPaymentFailureDialog}
        lastPaymentError={lastPaymentError}
        onClose={() => {
          setShowPaymentFailureDialog(false);
          setHasDismissedFailureDialog(true);
        }}
      />
    </div>
  );
}
