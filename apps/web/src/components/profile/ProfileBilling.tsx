'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiBankCardLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { InterviewsProfileSubscriptionPlan } from '~/components/global/UserProfileProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

function PlanLabel({
  plan,
}: Readonly<{
  plan?: InterviewsProfileSubscriptionPlan | null;
}>): JSX.Element {
  if (plan == null) {
    return <Text size="body1">N/A</Text>;
  }

  const autoRenewal = (
    <FormattedMessage
      defaultMessage="Subscriptions are automatically renewed and you will be charged again then. You may cancel your subscription anytime via the Stripe billing portal."
      description="Call to action text to uppgrade plan."
      id="b/4l5Z"
      values={{
        link: (chunks) => (
          <Anchor href="mailto:contact@greatfrontend.com">{chunks}</Anchor>
        ),
      }}
    />
  );

  const renderBold = (chunks: Array<ReactNode>) => (
    <Text size="inherit" weight="bold">
      {chunks}
    </Text>
  );

  switch (plan) {
    case 'year': {
      return (
        <FormattedMessage
          defaultMessage="You are on the <bold>Annual</bold> plan."
          description="Text describing user's subscription plan."
          id="kvhZfI"
          values={{
            bold: renderBold,
          }}
        />
      );
    }
    case 'month': {
      return (
        <>
          <FormattedMessage
            defaultMessage="You are on the <bold>Monthly</bold> plan."
            description="Text describing user's subscription plan."
            id="i7VsUe"
            values={{
              bold: renderBold,
            }}
          />{' '}
          {autoRenewal}
        </>
      );
    }
    case 'quarter': {
      return (
        <>
          <FormattedMessage
            defaultMessage="You are on the <bold>Quarterly</bold> plan."
            description="Text describing user's subscription plan."
            id="ykwubP"
            values={{
              bold: renderBold,
            }}
          />{' '}
          {autoRenewal}
        </>
      );
    }
    case 'lifetime': {
      return (
        <FormattedMessage
          defaultMessage="You are on the <bold>Lifetime</bold> plan."
          description="Text describing user's subscription plan."
          id="PQRmTe"
          values={{
            bold: (chunks) => (
              <Text size="inherit" weight="bold">
                {chunks}
              </Text>
            ),
          }}
        />
      );
    }
  }
}

function ManageSubscriptionSection({
  plan,
}: Readonly<{
  plan?: InterviewsProfileSubscriptionPlan | null;
}>): JSX.Element | null {
  const intl = useIntl();
  const billingPortalGenerate = trpc.purchases.billingPortal.useMutation();

  if (plan == null) {
    return null;
  }

  async function navigateToStripePortal() {
    const billingPortalUrl = await billingPortalGenerate.mutateAsync();

    window.location.href = billingPortalUrl;
  }

  switch (plan) {
    case 'year':
    case 'month':
    case 'quarter': {
      return (
        <div
          className={clsx(
            'flex flex-col gap-4',
            'p-4',
            ['border', themeBorderColor],
            'rounded-lg',
          )}>
          <div className={clsx('flex flex-col gap-1')}>
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Manage subscription"
                description="Manage billing subscription"
                id="jMTHcm"
              />
            </Heading>
            <Text color="secondary" display="block" size="body2">
              <FormattedMessage
                defaultMessage="Manage your subscription status and payment methods on the Stripe billing portal."
                description="Call to action text to uppgrade plan."
                id="Ftjz7y"
                values={{
                  link: (chunks) => (
                    <Anchor href="mailto:contact@greatfrontend.com">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            </Text>
          </div>
          <div>
            <Button
              isDisabled={billingPortalGenerate.isLoading}
              isLoading={billingPortalGenerate.isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Manage subscription on Stripe',
                description: 'Label for button to manage subscription',
                id: 'Fg3V0y',
              })}
              variant="secondary"
              onClick={navigateToStripePortal}
            />
          </div>
        </div>
      );
    }

    case 'lifetime': {
      return null;
    }
  }
}

function NoBillingPlan() {
  const intl = useIntl();

  return (
    <div className="py-12 text-center">
      <RiBankCardLine className="size-12 mx-auto text-neutral-400" />
      <Heading className="mt-2 text-sm font-medium" level="custom">
        <FormattedMessage
          defaultMessage="Not Subscribed"
          description="Text describing user's subscription status."
          id="SUjf8L"
        />
      </Heading>
      <Section>
        <Text className="mt-1" color="secondary" display="block" size="body2">
          <FormattedMessage
            defaultMessage="Get premium to unlock <bold>full access to all questions and solutions</bold>!"
            description="Call to action text for premium upgrade."
            id="jbJq96"
            values={{
              bold: (chunks) => (
                <Text size="body2" weight="bold">
                  {chunks}
                </Text>
              ),
            }}
          />
        </Text>
        <div className="mt-6">
          <Button
            href="/pricing"
            label={intl.formatMessage({
              defaultMessage: 'View subscription plans',
              description: 'Label for button to view subscription plans',
              id: 'jEYebN',
            })}
            variant="primary"
          />
        </div>
      </Section>
    </div>
  );
}

export default function ProfileBilling() {
  const { userProfile } = useUserProfile();

  return (
    <div className="flex flex-col gap-y-6 lg:max-w-md">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Billing"
          description="Screenreader text for subscription billing."
          id="0Nq65E"
        />
      </Heading>
      <Section>
        {userProfile == null || !userProfile?.plan ? (
          <NoBillingPlan />
        ) : (
          <>
            <div
              className={clsx('flex flex-col gap-4', 'p-4', 'rounded-lg', [
                'border',
                themeBorderColor,
              ])}>
              <div className="flex flex-col gap-1">
                <Heading level="heading6">
                  <FormattedMessage
                    defaultMessage="Current plan"
                    description="Current customer subscription plan"
                    id="n03lT2"
                  />
                </Heading>
                <Text color="secondary" display="block" size="body2">
                  <PlanLabel plan={userProfile?.plan} />
                </Text>
              </div>
              {(userProfile?.plan === 'month' ||
                userProfile?.plan === 'quarter') && (
                <Alert title="Upgrade to lifetime plan" variant="success">
                  <Text color="inherit" display="block" size="body2">
                    <FormattedMessage
                      defaultMessage="Existing subscribers can upgrade to the lifetime plan at a discount, send an email to <link>contact@greatfrontend</link>."
                      description="Call to action text to upgrade plan."
                      id="APztnK"
                      values={{
                        link: (chunks) => (
                          <Anchor href="mailto:contact@greatfrontend.com">
                            {chunks}
                          </Anchor>
                        ),
                      }}
                    />
                  </Text>
                </Alert>
              )}
            </div>
            <ManageSubscriptionSection plan={userProfile?.plan} />
            {process.env.NODE_ENV === 'development' && (
              <div
                className={clsx(
                  'flex flex-col gap-1',
                  'p-4',
                  'border',
                  'rounded-lg',
                  themeBorderColor,
                )}>
                <Heading level="heading6">
                  <FormattedMessage
                    defaultMessage="[DEV-ONLY] Stripe Customer ID"
                    description="Label for Stripe customer ID."
                    id="aP9GUx"
                  />
                </Heading>
                <Text color="secondary" display="block" size="body2">
                  <code>{userProfile?.stripeCustomerID}</code>
                </Text>
              </div>
            )}
          </>
        )}
      </Section>
    </div>
  );
}
