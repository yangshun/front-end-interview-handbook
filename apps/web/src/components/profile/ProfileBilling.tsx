'use client';

import clsx from 'clsx';
import { RiBankCardLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { UserProfilePlan } from '~/components/global/UserProfileProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import { useI18nRouter } from '~/next-i18nostic/src';

function PlanLabel({
  plan,
}: Readonly<{
  plan?: UserProfilePlan | null;
}>): JSX.Element {
  if (plan == null) {
    return <Text>N/A</Text>;
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

  switch (plan) {
    case 'year': {
      return (
        <FormattedMessage
          defaultMessage="You are on the <bold>Annual</bold> plan."
          description="Text describing user's subscription plan."
          id="kvhZfI"
          values={{
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
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
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
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
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
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
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    }
  }
}

function ManageSubscriptionSection({
  plan,
}: Readonly<{
  plan?: UserProfilePlan | null;
}>): JSX.Element | null {
  const router = useI18nRouter();
  const intl = useIntl();

  if (plan == null) {
    return null;
  }

  async function navigateToStripePortal() {
    const res = await fetch('/api/payments/portal');
    const data = await res.json();

    router.push(data.payload.url);
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
            'border',
            'rounded-lg',
            themeBorderColor,
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
      <RiBankCardLine className="mx-auto h-12 w-12 text-neutral-400" />
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
    <div className="flex flex-col gap-y-6">
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
              className={clsx(
                'p-4',
                'rounded-lg',
                'flex flex-col gap-4',
                'border',
                themeBorderColor,
              )}>
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
                <Alert
                  title="Upgrade to lifetime plan at a discount"
                  variant="success">
                  <Text color="inherit" display="block" size="body2">
                    <FormattedMessage
                      defaultMessage="We offer a discounted rate for upgrading to the lifetime plan, simply <link>contact us</link>."
                      description="Call to action text to upgrade plan."
                      id="4C8Ad0"
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
