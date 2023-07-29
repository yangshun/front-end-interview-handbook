'use client';

import axios from 'axios';
import { RiBankCardLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { UserProfilePlan } from '~/components/global/UserProfileProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

function PlanLabel({
  plan,
}: Readonly<{
  plan?: UserProfilePlan | null;
}>): JSX.Element {
  if (plan == null) {
    return <Text>N/A</Text>;
  }

  const contactUs = (
    <FormattedMessage
      defaultMessage="<link>Contact us</link> if you would like to upgrade your plan."
      description="Call to action text to uppgrade plan."
      id="Jlr/Yy"
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
        <Text>
          <FormattedMessage
            defaultMessage="You are on the <bold>Annual</bold> plan. "
            description="Text describing user's subscription plan."
            id="VCvG/R"
            values={{
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            }}
          />
        </Text>
      );
    }
    case 'month': {
      return (
        <Text>
          <FormattedMessage
            defaultMessage="You are on the <bold>Monthly</bold> plan. "
            description="Text describing user's subscription plan."
            id="v+Q+mM"
            values={{
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            }}
          />
          {contactUs}
        </Text>
      );
    }
    case 'quarter': {
      return (
        <Text>
          <FormattedMessage
            defaultMessage="You are on the <bold>Quarterly</bold> plan. "
            description="Text describing user's subscription plan."
            id="Ol7K0w"
            values={{
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            }}
          />
          {contactUs}
        </Text>
      );
    }
    case 'lifetime': {
      return (
        <Text>
          <FormattedMessage
            defaultMessage="You are on the <bold>Lifetime</bold> plan. "
            description="Text describing user's subscription plan."
            id="o2xbIW"
            values={{
              bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            }}
          />
        </Text>
      );
    }
  }
}

function ManageSubscriptionButton({
  plan,
}: Readonly<{
  plan?: UserProfilePlan | null;
}>): JSX.Element | null {
  const router = useI18nRouter();
  const intl = useIntl();

  if (plan == null) {
    return null;
  }

  async function loadPortal() {
    const { data } = await axios.get('/api/payments/portal');

    router.push(data.payload.url);
  }

  switch (plan) {
    case 'year':
    case 'month':
    case 'quarter': {
      return (
        <div>
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Manage Subscription',
              description: 'Label for button to manage subscription',
              id: 'Q1WOVj',
            })}
            variant="secondary"
            onClick={loadPortal}
          />
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
    <div className="space-y-4">
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
            <Text display="block">
              <PlanLabel plan={userProfile?.plan} />
            </Text>
            <ManageSubscriptionButton plan={userProfile?.plan} />
            <Text display="block" size="body2">
              <FormattedMessage
                defaultMessage="Please contact us at <link>contact@greatfrontend.com</link> should you require a purchase invoice."
                description="Text describing contact method for purchase invoice."
                id="F2QRYu"
                values={{
                  link: (chunks) => (
                    <Anchor href="mailto:contact@greatfrontend.com">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            </Text>
            {process.env.NODE_ENV === 'development' && (
              <Text display="block" size="body2">
                <FormattedMessage
                  defaultMessage="Stripe Customer ID: "
                  description="Label for Stripe customer ID."
                  id="bfMxFC"
                />
                <code>{userProfile?.stripeCustomerID}</code>
              </Text>
            )}
          </>
        )}
      </Section>
    </div>
  );
}
