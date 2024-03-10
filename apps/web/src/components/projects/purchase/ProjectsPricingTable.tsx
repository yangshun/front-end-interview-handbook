import clsx from 'clsx';
import { useRef } from 'react';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiQuestionFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import url from 'url';

import { fbqGFE } from '~/lib/fbq';
import gtag from '~/lib/gtag';
import { isProhibitedCountry } from '~/lib/stripeUtils';
import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import PurchasePriceAnnualComparison from '~/components/purchase/comparison/PurchasePriceAnnualComparison';
import PurchasePriceMonthlyComparison from '~/components/purchase/comparison/PurchasePriceMonthlyComparison';
import PurchasePriceLabel from '~/components/purchase/PurchasePriceLabel';
import { priceRoundToNearestNiceNumber } from '~/components/purchase/PurchasePricingUtils';
import type { Props as AnchorProps } from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeDivideColor,
  themeTextDangerColor,
  themeTextSubtleColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';
import { getErrorMessage } from '~/utils/getErrorMessage';

import {
  annualPlanFeatures,
  freePlanFeatures,
  monthlyPlanFeatures,
} from './ProjectsPricingFeaturesConfig';
import type { ProjectsPricingPlanPaymentConfigLocalized } from './ProjectsPricingPlans';
import type { ProjectsSubscriptionPlanFeature } from './useProjectsPricingPlanFeatures';
import useProjectsPricingPlanFeatures from './useProjectsPricingPlanFeatures';
import type { ProjectsPricingPlanItem } from './useProjectsPricingPlansList';
import useProfileWithProjectsProfile from '../common/useProfileWithProjectsProfile';

import type { ProjectsSubscriptionPlan } from '@prisma/client';
import { useSessionContext } from '@supabase/auth-helpers-react';

function PricingButton({
  href,
  icon,
  isDisabled,
  isLoading,
  label,
  onClick,
}: Readonly<{
  href?: AnchorProps['href'];
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}>) {
  return (
    <Button
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
  isDisabled,
  paymentConfig,
  planType,
}: Readonly<{
  isDisabled: boolean;
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlan;
}>) {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <PricingButton
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
          message: `${planType} plan for ${paymentConfig.currency.toLocaleUpperCase()} ${
            paymentConfig.unitCostCurrency.withPPP.after
          } but not signed in`,
          title: 'Checkout initiate (non-signed in)',
        });
        logEvent('checkout.attempt.not_logged_in', {
          currency: paymentConfig.currency.toLocaleUpperCase(),
          plan: planType,
          value: paymentConfig.unitCostCurrency.withPPP.after,
        });
      }}
    />
  );
}

function PricingButtonNonPremium({
  planType,
  paymentConfig,
}: Readonly<{
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlan;
}>) {
  const intl = useIntl();
  const { isLoading } = useProfileWithProjectsProfile();
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

  async function processSubscription(planTypeParam: ProjectsSubscriptionPlan) {
    if (isCheckoutSessionLoading) {
      return;
    }

    setIsCheckoutSessionLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(
        url.format({
          pathname: '/api/payments/purchase/checkout',
          query: {
            plan_type: planTypeParam,
            product_domain: 'projects',
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

      gtag.event({
        action: 'checkout.failure',
        category: 'ecommerce',
        label: planTypeParam,
      });
      logMessage({
        level: 'error',
        message: getErrorMessage(error),
        title: 'Checkout attempt error',
      });
      logEvent('checkout.fail', {
        currency: paymentConfig.currency.toLocaleUpperCase(),
        plan: planTypeParam,
        value: paymentConfig.unitCostCurrency.withPPP.after,
      });
    } finally {
      setIsCheckoutSessionLoading(false);
    }
  }

  const showUserThereIsAsyncRequest = hasClicked && isCheckoutSessionLoading;

  return (
    <div className="flex flex-col gap-4">
      <PricingButton
        href={checkoutSessionHref ?? undefined}
        icon={RiArrowRightLine}
        isDisabled={showUserThereIsAsyncRequest || isLoading}
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
          fbqGFE('track', 'InitiateCheckout', {
            content_category: planType,
            currency: paymentConfig.currency.toLocaleUpperCase(),
            value: paymentConfig.unitCostCurrency.withPPP.after,
          });
          logMessage({
            level: 'info',
            message: `${planType} plan for ${paymentConfig.currency.toLocaleUpperCase()} ${
              paymentConfig.unitCostCurrency.withPPP.after
            }`,
            title: 'Checkout Initiate',
          });
          logEvent('checkout.attempt', {
            currency: paymentConfig.currency.toLocaleUpperCase(),
            plan: planType,
            value: paymentConfig.unitCostCurrency.withPPP.after,
          });

          if (checkoutSessionHref != null) {
            return;
          }

          return processSubscription(planType);
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
  countryCode,
  paymentConfig,
  planType,
}: Readonly<{
  countryCode: string;
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlan;
}>) {
  const intl = useIntl();
  const { isLoading: isUserLoading } = useSessionContext();
  const { profile, isLoading: isUserProfileLoading } =
    useProfileWithProjectsProfile();
  const billingPortalMutation = trpc.purchases.billingPortal.useMutation();

  const isPending = isUserLoading || isUserProfileLoading;

  if (isProhibitedCountry(countryCode)) {
    return null;
  }

  if (profile?.projectsProfile) {
    if (!profile?.projectsProfile.premium) {
      // User is logged in but not a premium user.
      return (
        <PricingButtonNonPremium
          paymentConfig={paymentConfig}
          planType={planType}
        />
      );
    }

    // User is already subscribed, link to billing page.
    return (
      <PricingButton
        icon={RiArrowRightLine}
        isDisabled={billingPortalMutation.isLoading}
        isLoading={billingPortalMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Manage subscription',
          description: 'Manage user membership subscription button label',
          id: 'sjLtW1',
        })}
        onClick={async () => {
          const billingPortalUrl = await billingPortalMutation.mutateAsync();

          window.location.href = billingPortalUrl;
        }}
      />
    );
  }

  // User is not logged in, they have to create an account first.
  return (
    <PricingButtonNonLoggedIn
      isDisabled={isPending}
      paymentConfig={paymentConfig}
      planType={planType}
    />
  );
}

function PricingPlanComparisonDiscount({
  planType,
  paymentConfig,
}: Readonly<{
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlan;
}>) {
  switch (planType) {
    case 'MONTH':
      return <PurchasePriceMonthlyComparison price={paymentConfig} />;
    case 'ANNUAL':
      return (
        <PurchasePriceAnnualComparison
          discount={paymentConfig.discount}
          price={paymentConfig}
        />
      );
  }
}

function FeatureItem({
  feature,
}: Readonly<{ feature: ProjectsSubscriptionPlanFeature }>) {
  const { title, description } = feature;

  return (
    <div className="flex gap-3 py-3">
      <RiCheckboxCircleFill
        aria-hidden={true}
        className={clsx('size-6 shrink-0', themeTextSuccessColor)}
      />
      <Text color="secondary" display="block" size="body1">
        {title}
      </Text>
      {description && (
        <Tooltip label={description}>
          <RiQuestionFill
            className={clsx('size-5 shrink-0', themeTextSubtleColor)}
          />
        </Tooltip>
      )}
    </div>
  );
}

type Props = Readonly<{
  countryCode: string;
  planList: ReadonlyArray<ProjectsPricingPlanItem>;
  showPPPMessage: boolean;
}>;

function ProjectsPricingPriceCell({
  className,
  countryCode,
  showPPPMessage,
  paymentConfig,
  planType,
  numberOfMonths,
}: Readonly<{
  className: string;
  countryCode: string;
  numberOfMonths?: number;
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlan;
  showPPPMessage: boolean;
}>) {
  return (
    <div className={className}>
      <div>
        {showPPPMessage && (
          <Text
            className="inline-flex items-baseline line-through"
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
        )}{' '}
        <Text
          className="inline-flex items-baseline gap-x-2"
          color="subtitle"
          size="body1"
          weight="medium">
          <span>
            <PurchasePriceLabel
              amount={priceRoundToNearestNiceNumber(
                paymentConfig.unitCostCurrency.withPPP.after /
                  (numberOfMonths ?? 1),
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
      <Text className="mt-2" display="block" size="body3">
        <PricingPlanComparisonDiscount
          paymentConfig={paymentConfig}
          planType={planType}
        />
      </Text>
      <div className="mt-5">
        <PricingButtonSection
          countryCode={countryCode}
          paymentConfig={paymentConfig}
          planType={planType}
        />
      </div>
      <Text
        className="mt-2 whitespace-nowrap text-center"
        color="secondary"
        display="block"
        size="body3">
        <FormattedMessage
          defaultMessage="14-day money back guarantee"
          description="Pricing plan policy"
          id="bq/h99"
        />
      </Text>
    </div>
  );
}

export default function ProjectsPricingTable({
  countryCode,
  planList,
  showPPPMessage,
}: Props) {
  const features = useProjectsPricingPlanFeatures({
    ANNUAL: annualPlanFeatures,
    FREE: freePlanFeatures,
    MONTH: monthlyPlanFeatures,
  });

  const tableClassName = clsx(
    'rounded-3xl',
    ['border', themeBorderColor],
    'bg-white/20 dark:bg-neutral-800/20',
  );

  return (
    <div>
      {/* Lg and above */}
      <div
        className={clsx(
          'hidden flex-col lg:flex',
          'px-4 py-6',
          tableClassName,
        )}>
        <table className="w-full border-separate border-spacing-x-4">
          <caption className="sr-only">Pricing plan comparison</caption>
          <colgroup>
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2} />
              {planList.map((plan) => (
                <th key={plan.name} className="px-6 xl:px-8" scope="col">
                  <Text color="subtitle" size="body1" weight="medium">
                    {plan.name}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2} scope="row">
                <span className="sr-only">Price</span>
              </th>
              {planList.map(({ name, paymentConfig, numberOfMonths, type }) => (
                <td key={name} className="px-6 py-5 align-top xl:px-8">
                  {paymentConfig != null && type !== 'FREE' && (
                    <ProjectsPricingPriceCell
                      className="text-center"
                      countryCode={countryCode}
                      numberOfMonths={numberOfMonths}
                      paymentConfig={paymentConfig}
                      planType={type}
                      showPPPMessage={showPPPMessage}
                    />
                  )}
                </td>
              ))}
            </tr>
            {(
              [
                'freeChallenges',
                'breakpoints',
                'apps',
                'skillRoadmap',
                'componentTracks',
                'unlocks',
              ] as const
            ).map((featureKey, index) => (
              <tr key={featureKey}>
                <th
                  className={clsx(
                    'py-3 text-left',
                    index > 0 && ['border-t', themeBorderColor],
                  )}
                  colSpan={2}
                  scope="row">
                  <span className="flex items-center gap-3">
                    <Text
                      className="max-w-72"
                      color="secondary"
                      display="block"
                      size="body2"
                      weight="normal">
                      {features[featureKey].title}
                    </Text>
                    {features[featureKey].description && (
                      <Tooltip label={features[featureKey].description}>
                        <RiQuestionFill
                          className={clsx(
                            'size-5 shrink-0',
                            themeTextSubtleColor,
                          )}
                        />
                      </Tooltip>
                    )}
                  </span>
                </th>
                {planList.map(({ type, name, features: planFeatures }) => (
                  <td
                    key={name}
                    className={clsx(
                      'px-3 py-2',
                      index > 0 && ['border-t', themeBorderColor],
                    )}>
                    <span className="flex items-center gap-2">
                      {planFeatures[featureKey] ? (
                        <RiCheckboxCircleFill
                          aria-hidden={true}
                          className={clsx(
                            'size-6 shrink-0',
                            themeTextSuccessColor,
                          )}
                        />
                      ) : (
                        <RiCloseCircleFill
                          aria-hidden={true}
                          className={clsx(
                            'size-6 shrink-0',
                            themeTextDangerColor,
                          )}
                        />
                      )}
                      <Text className="whitespace-nowrap" size="body3">
                        {features[featureKey].plan?.[type]}
                      </Text>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Below lg */}
      <div
        className={clsx(
          'mx-auto flex flex-col lg:hidden',
          'max-w-lg',
          tableClassName,
          ['divide-y', themeDivideColor],
        )}>
        {planList.map(
          ({
            features: planFeatures,
            name,
            paymentConfig,
            numberOfMonths,
            type,
          }) => {
            return (
              <div key={name} className={clsx('px-8 py-6')}>
                <Text color="subtitle" size="body1" weight="medium">
                  {name}
                </Text>
                {paymentConfig != null && type !== 'FREE' && (
                  <ProjectsPricingPriceCell
                    className="mt-8"
                    countryCode={countryCode}
                    numberOfMonths={numberOfMonths}
                    paymentConfig={paymentConfig}
                    planType={type}
                    showPPPMessage={showPPPMessage}
                  />
                )}
                <div className={clsx('mt-6', [themeDivideColor, 'divide-y'])}>
                  {planFeatures.freeChallenges && (
                    <FeatureItem feature={features.freeChallenges} />
                  )}
                  {planFeatures.breakpoints && (
                    <FeatureItem feature={features.breakpoints} />
                  )}
                  {planFeatures.apps && <FeatureItem feature={features.apps} />}
                  {planFeatures.skillRoadmap && (
                    <FeatureItem feature={features.skillRoadmap} />
                  )}
                  {planFeatures.componentTracks && (
                    <FeatureItem feature={features.componentTracks} />
                  )}
                  {planFeatures.unlocks && (
                    <FeatureItem feature={features.unlocks} />
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
