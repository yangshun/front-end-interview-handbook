import clsx from 'clsx';
import { useRef } from 'react';
import { useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiQuestionFill,
} from 'react-icons/ri';
import { RiExternalLinkFill } from 'react-icons/ri';
import url from 'url';

import gtag from '~/lib/gtag';
import { isProhibitedCountry } from '~/lib/stripeUtils';
import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { FormattedMessage, useIntl } from '~/components/intl';
import PurchasePriceAnnualComparison from '~/components/purchase/comparison/PurchasePriceAnnualComparison';
import PurchaseActivePlanLabel from '~/components/purchase/PurchaseActivePlanLabel';
import {
  purchaseFailureLogging,
  purchaseInitiateLogging,
  purchaseInitiateLoggingNonSignedIn,
} from '~/components/purchase/PurchaseLogging';
import PurchasePriceLabel from '~/components/purchase/PurchasePriceLabel';
import { priceRoundToNearestNiceNumber } from '~/components/purchase/PurchasePricingUtils';
import type { Props as AnchorProps } from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeDivideColor,
  themeGlassyBorder,
  themeTextDangerColor,
  themeTextSubtleColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import {
  annualPlanFeatures,
  freePlanFeatures,
  monthlyPlanFeatures,
} from './ProjectsPricingFeaturesConfig';
import type {
  ProjectsPricingPlanPaymentConfigLocalized,
  ProjectsPricingPlanPaymentConfigLocalizedRecord,
  ProjectsSubscriptionPlanIncludingFree,
} from './ProjectsPricingPlans';
import ProjectsPurchaseCancelLogging from './ProjectsPurchaseCancelLogging';
import type { ProjectsSubscriptionPlanFeature } from './useProjectsPricingPlanFeatures';
import useProjectsPricingPlanFeatures from './useProjectsPricingPlanFeatures';
import useProjectsPricingPlansList from './useProjectsPricingPlansList';
import useUserProfileWithProjectsProfile from '../common/useUserProfileWithProjectsProfile';

import type { ProjectsSubscriptionPlan } from '@prisma/client';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

function PricingButton({
  href,
  icon,
  isDisabled,
  isLoading,
  label,
  tooltip,
  variant,
  onClick,
}: Readonly<{
  href?: AnchorProps['href'];
  icon?: React.ComponentProps<typeof Button>['icon'];
  isDisabled?: React.ComponentProps<typeof Button>['isDisabled'];
  isLoading?: React.ComponentProps<typeof Button>['isLoading'];
  label: React.ComponentProps<typeof Button>['label'];
  onClick?: React.ComponentProps<typeof Button>['onClick'];
  tooltip?: React.ComponentProps<typeof Button>['tooltip'];
  variant: React.ComponentProps<typeof Button>['variant'];
}>) {
  return (
    <Button
      display="block"
      href={href}
      icon={icon}
      isDisabled={isLoading || isDisabled}
      isLoading={isLoading}
      label={label}
      size="md"
      target="_self"
      tooltip={tooltip}
      type="button"
      variant={variant}
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
  paymentConfig?: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlanIncludingFree;
}>) {
  const intl = useIntl();
  const { signInUpHref, signInUpLabel } = useAuthSignInUp();

  return (
    <PricingButton
      href={signInUpHref({
        query: {
          source: 'buy_now',
        },
      })}
      isDisabled={isDisabled}
      label={
        planType === 'FREE'
          ? signInUpLabel
          : intl.formatMessage({
              defaultMessage: 'Unlock premium',
              description: 'Purchase button label',
              id: 'W4Akuo',
            })
      }
      variant="secondary"
      onClick={() => {
        gtag.event({
          action: `checkout.sign_up`,
          category: 'ecommerce',
          label: 'Unlock premium (not logged in)',
        });
        if (paymentConfig != null) {
          purchaseInitiateLoggingNonSignedIn({
            plan: planType,
            product: 'projects',
            purchasePrice: paymentConfig,
          });
        }
      }}
    />
  );
}

function PricingButtonNonPremium({
  planType,
  paymentConfig,
  useCurrentPageAsCancelUrl,
}: Readonly<{
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlan;
  useCurrentPageAsCancelUrl: boolean;
}>) {
  const intl = useIntl();
  const { isLoading } = useUserProfileWithProjectsProfile();
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
      const cancelURL = new URL(
        window.location.pathname,
        window.location.origin,
      );

      const res = await fetch(
        url.format({
          pathname: '/api/payments/purchase/checkout',
          query: {
            cancel_url: useCurrentPageAsCancelUrl ? cancelURL.href : undefined,
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

      purchaseFailureLogging({
        error,
        plan: planType,
        product: 'projects',
        purchasePrice: paymentConfig,
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
        isDisabled={showUserThereIsAsyncRequest || isLoading}
        isLoading={showUserThereIsAsyncRequest}
        label={intl.formatMessage({
          defaultMessage: 'Unlock premium',
          description: 'Purchase button label',
          id: 'W4Akuo',
        })}
        variant="primary"
        onClick={() => {
          setHasClicked(true);
          hasClickedRef.current = true;

          purchaseInitiateLogging({
            plan: planType,
            product: 'projects',
            purchasePrice: paymentConfig,
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
  useCurrentPageAsCancelUrl,
}: Readonly<{
  countryCode: string;
  paymentConfig?: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlanIncludingFree;
  useCurrentPageAsCancelUrl: boolean;
}>) {
  const intl = useIntl();
  const user = useUser();
  const { isLoading: isUserLoading } = useSessionContext();
  const { userProfile, isLoading: isUserProfileLoading } =
    useUserProfileWithProjectsProfile();
  const billingPortalMutation =
    trpc.purchases.billingPortalSessionUrl.useMutation();

  const isPending = isUserLoading || isUserProfileLoading;

  if (isProhibitedCountry(countryCode)) {
    return null;
  }

  if (user == null) {
    // User is not logged in, they have to create an account first.
    return (
      <PricingButtonNonLoggedIn
        isDisabled={isPending}
        paymentConfig={paymentConfig}
        planType={planType}
      />
    );
  }

  if (
    userProfile?.projectsProfile == null ||
    !userProfile?.projectsProfile?.premium
  ) {
    if (paymentConfig == null) {
      return null;
    }

    if (planType == null || planType === 'FREE') {
      return null;
    }

    // User is logged in but not a premium user.
    return (
      <PricingButtonNonPremium
        paymentConfig={paymentConfig}
        planType={planType}
        useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
      />
    );
  }

  if (userProfile.projectsProfile.plan === planType) {
    // User is already subscribed, link to billing page.
    return (
      <PricingButton
        icon={RiExternalLinkFill}
        isDisabled={billingPortalMutation.isLoading}
        isLoading={billingPortalMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Manage on Stripe',
          description: 'Manage user membership subscription button label',
          id: 'NBSMFm',
        })}
        tooltip={intl.formatMessage({
          defaultMessage:
            'Manage your subscription and renewal status on Stripe billing portal',
          description: 'Manage user membership subscription button label',
          id: 'S2VtP2',
        })}
        variant="secondary"
        onClick={async () => {
          const billingPortalUrl = await billingPortalMutation.mutateAsync({
            returnUrl: window.location.href,
          });

          window.location.href = billingPortalUrl;
        }}
      />
    );
  }

  return null;
}

function PricingPlanComparisonDiscount({
  planType,
  paymentConfig,
}: Readonly<{
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlanIncludingFree;
}>) {
  switch (planType) {
    case 'FREE':
      return null;
    case 'MONTH':
      return null;
    case 'ANNUAL':
      return <PurchasePriceAnnualComparison price={paymentConfig} />;
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
      <div className="flex flex-1 items-center justify-between gap-3">
        <Text className="block" color="secondary" size="body2">
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
    </div>
  );
}

function ProjectsPricingPriceCell({
  amountAfterPPP,
  amountBeforePPP,
  className,
  countryCode,
  currency,
  symbol,
  showPPPMessage,
  paymentConfig,
  planType,
  numberOfMonths,
  useCurrentPageAsCancelUrl,
}: Readonly<{
  amountAfterPPP: number;
  amountBeforePPP: number;
  className: string;
  countryCode: string;
  currency: string;
  numberOfMonths?: number;
  paymentConfig: ProjectsPricingPlanPaymentConfigLocalized;
  planType: ProjectsSubscriptionPlanIncludingFree;
  showPPPMessage: boolean;
  symbol: string;
  useCurrentPageAsCancelUrl: boolean;
}>) {
  const { userProfile } = useUserProfileWithProjectsProfile();

  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-2 xl:flex-col xl:items-center">
        <div className="xl:text-center">
          {showPPPMessage && (
            <Text
              className={clsx(
                'block w-full line-through',
                amountBeforePPP === 0 && 'opacity-0',
              )}
              color="subtle"
              size="body1">
              <PurchasePriceLabel
                amount={amountBeforePPP}
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
            className="flex items-baseline justify-center gap-x-2"
            color="subtitle"
            size="body1"
            weight="medium">
            <span>
              <PurchasePriceLabel
                amount={amountAfterPPP}
                currency={currency}
                symbol={symbol}>
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
            {amountAfterPPP === 0 || numberOfMonths != null ? (
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
        {(userProfile?.projectsProfile != null &&
          userProfile?.projectsProfile?.plan == null &&
          planType === 'FREE') ||
        userProfile?.projectsProfile?.plan === planType ? (
          <Text
            className={clsx(
              'flex items-center justify-center',
              'md:min-h-8 pb-2 md:pb-0',
            )}
            size="body3">
            <PurchaseActivePlanLabel />
          </Text>
        ) : (
          <Text
            className={clsx(
              'flex items-center justify-center',
              'xl:min-h-8 pb-1 xl:pb-0',
            )}
            size="body3">
            <PricingPlanComparisonDiscount
              paymentConfig={paymentConfig}
              planType={planType}
            />
          </Text>
        )}
      </div>
      <div className="mt-5 w-full">
        <PricingButtonSection
          countryCode={countryCode}
          paymentConfig={paymentConfig}
          planType={planType}
          useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
        />
      </div>
      {!userProfile?.projectsProfile?.premium && planType !== 'FREE' && (
        <Text
          className="mt-2 block whitespace-nowrap text-center"
          color="secondary"
          size="body3">
          <FormattedMessage
            defaultMessage="14-day money back guarantee"
            description="Pricing plan policy"
            id="bq/h99"
          />
        </Text>
      )}
    </div>
  );
}

type Props = Readonly<{
  background?: boolean;
  countryCode: string;
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
  showPPPMessage: boolean;
  useCurrentPageAsCancelUrl: boolean;
}>;

export default function ProjectsPricingTable({
  background = false,
  countryCode,
  plansPaymentConfig,
  showPPPMessage,
  useCurrentPageAsCancelUrl,
}: Props) {
  const intl = useIntl();
  const planList = useProjectsPricingPlansList(plansPaymentConfig);
  const features = useProjectsPricingPlanFeatures({
    ANNUAL: annualPlanFeatures,
    FREE: freePlanFeatures,
    MONTH: monthlyPlanFeatures,
  });

  const tableClassName = clsx(
    'rounded-3xl',
    themeGlassyBorder,
    background ? 'dark:bg-neutral-900' : 'bg-white/20 dark:bg-neutral-900/20',
  );

  return (
    <div>
      <ProjectsPurchaseCancelLogging plansPaymentConfig={plansPaymentConfig} />
      {/* Xl and above */}
      <div
        className={clsx(
          'hidden flex-col xl:flex',
          'px-4 py-6',
          tableClassName,
        )}>
        <table className="w-full table-fixed border-separate border-spacing-x-4">
          <caption className="sr-only">
            {intl.formatMessage({
              defaultMessage: 'Pricing plan comparison',
              description: 'Pricing plan comparison table caption',
              id: 'V8gZjU',
            })}
          </caption>
          <colgroup>
            <col className="w-1/4 2xl:w-2/5" />
            <col className="w-1/4 2xl:w-1/5" />
            <col className="w-1/4 2xl:w-1/5" />
            <col className="w-1/4 2xl:w-1/5" />
          </colgroup>
          <thead>
            <tr>
              <th />
              {planList.map((plan) => (
                <th key={plan.name} className="px-6 xl:px-8" scope="col">
                  <Text size="body1" weight="medium">
                    {plan.name}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <span className="sr-only">
                  {intl.formatMessage({
                    defaultMessage: 'Price',
                    description: 'Pricing page price',
                    id: 'CYr24j',
                  })}
                </span>
              </th>
              {planList.map(({ name, paymentConfig, numberOfMonths, type }) => (
                <td key={name} className="px-4 py-5 align-top">
                  {type === 'FREE' ? (
                    <ProjectsPricingPriceCell
                      amountAfterPPP={0}
                      amountBeforePPP={0}
                      className="text-center"
                      countryCode={countryCode}
                      currency={plansPaymentConfig.MONTH.currency.toUpperCase()}
                      numberOfMonths={numberOfMonths}
                      paymentConfig={plansPaymentConfig.MONTH}
                      planType={type}
                      showPPPMessage={showPPPMessage}
                      symbol={plansPaymentConfig.MONTH.symbol}
                      useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
                    />
                  ) : paymentConfig != null ? (
                    <ProjectsPricingPriceCell
                      amountAfterPPP={priceRoundToNearestNiceNumber(
                        paymentConfig.unitCostCurrency.withPPP.after /
                          (numberOfMonths ?? 1),
                      )}
                      amountBeforePPP={priceRoundToNearestNiceNumber(
                        paymentConfig.unitCostCurrency.base.after /
                          (numberOfMonths ?? 1),
                      )}
                      className="text-center"
                      countryCode={countryCode}
                      currency={paymentConfig.currency.toUpperCase()}
                      numberOfMonths={numberOfMonths}
                      paymentConfig={paymentConfig}
                      planType={type}
                      showPPPMessage={showPPPMessage}
                      symbol={paymentConfig.symbol}
                      useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
                    />
                  ) : null}
                </td>
              ))}
            </tr>
            {(
              [
                'freeChallenges',
                'breakpoints',
                'apps',
                'credits',
                'skillRoadmap',
                'componentTracks',
              ] as const
            ).map((featureKey, index) => (
              <tr key={featureKey}>
                <th
                  className={clsx(
                    'py-3 text-left',
                    index > 0 && ['border-t', themeBorderColor],
                  )}
                  scope="row">
                  <span className="max-w-80 flex items-center justify-between gap-3">
                    <Text
                      className="max-w-72 block"
                      color="secondary"
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
      {/* Below xl */}
      <div
        className={clsx(
          'mx-auto flex flex-col xl:hidden',
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
            type: planType,
          }) => {
            return (
              <div key={name} className={clsx('px-8 py-6')}>
                <div className="flex items-center justify-between gap-2">
                  <Text size="body1" weight="bold">
                    {name}
                  </Text>
                </div>
                {planType === 'FREE' ? (
                  <ProjectsPricingPriceCell
                    amountAfterPPP={0}
                    amountBeforePPP={0}
                    className="mt-8"
                    countryCode={countryCode}
                    currency={plansPaymentConfig.MONTH.currency.toUpperCase()}
                    numberOfMonths={numberOfMonths}
                    paymentConfig={plansPaymentConfig.MONTH}
                    planType={planType}
                    showPPPMessage={showPPPMessage}
                    symbol={plansPaymentConfig.MONTH.symbol}
                    useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
                  />
                ) : paymentConfig != null ? (
                  <ProjectsPricingPriceCell
                    amountAfterPPP={priceRoundToNearestNiceNumber(
                      paymentConfig.unitCostCurrency.withPPP.after /
                        (numberOfMonths ?? 1),
                    )}
                    amountBeforePPP={priceRoundToNearestNiceNumber(
                      paymentConfig.unitCostCurrency.base.after /
                        (numberOfMonths ?? 1),
                    )}
                    className="mt-8"
                    countryCode={countryCode}
                    currency={paymentConfig.currency.toUpperCase()}
                    numberOfMonths={numberOfMonths}
                    paymentConfig={paymentConfig}
                    planType={planType}
                    showPPPMessage={showPPPMessage}
                    symbol={paymentConfig.symbol}
                    useCurrentPageAsCancelUrl={useCurrentPageAsCancelUrl}
                  />
                ) : null}
                <div className={clsx('mt-6', [themeDivideColor, 'divide-y'])}>
                  {planFeatures.freeChallenges && (
                    <FeatureItem feature={features.freeChallenges} />
                  )}
                  {planFeatures.breakpoints && (
                    <FeatureItem feature={features.breakpoints} />
                  )}
                  {planFeatures.apps && <FeatureItem feature={features.apps} />}
                  {planFeatures.credits && (
                    <FeatureItem feature={features.credits} />
                  )}
                  {planFeatures.skillRoadmap && (
                    <FeatureItem feature={features.skillRoadmap} />
                  )}
                  {planFeatures.componentTracks && (
                    <FeatureItem feature={features.componentTracks} />
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
