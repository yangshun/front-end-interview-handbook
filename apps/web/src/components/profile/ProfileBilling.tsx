'use client';

import axios from 'axios';
import { useI18nRouter } from 'next-i18nostic';

import type { UserProfilePlan } from '~/components/global/UserProfileProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { CreditCardIcon } from '@heroicons/react/24/outline';

function PlanLabel({
  plan,
}: Readonly<{
  plan?: UserProfilePlan | null;
}>): JSX.Element {
  if (plan == null) {
    return <Text>N/A</Text>;
  }

  const contactUs = (
    <>
      <Anchor href="mailto:contact@greatfrontend.com">Contact us</Anchor> if you
      would like to upgrade your plan.
    </>
  );

  switch (plan) {
    case 'year': {
      return (
        <Text>
          You are on the <Text weight="bold">Annual</Text> plan. {contactUs}
        </Text>
      );
    }
    case 'month': {
      return (
        <Text>
          You are on the <Text weight="bold">Monthly</Text> plan. {contactUs}
        </Text>
      );
    }
    case 'quarter': {
      return (
        <Text>
          You are on the <Text weight="bold">Quarterly</Text> plan. {contactUs}
        </Text>
      );
    }
    case 'lifetime': {
      return (
        <Text>
          You are on the <Text weight="bold">Lifetime</Text> plan.
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
            label="Manage Subscription"
            variant="tertiary"
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
  return (
    <div className="py-12 text-center">
      <CreditCardIcon className="mx-auto h-12 w-12 text-slate-400" />
      <Heading className="mt-2 text-sm font-medium text-slate-900">
        Not Subscribed
      </Heading>
      <Section>
        <Text
          className="mt-1"
          color="secondary"
          display="block"
          variant="body2">
          Get premium to unlock{' '}
          <Text variant="body2" weight="bold">
            full access to all questions and solutions
          </Text>
          !
        </Text>
        <div className="mt-6">
          <Button
            href="/pricing"
            label="View subscription plans"
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
      <Heading className="sr-only">Billing</Heading>
      <Section>
        {userProfile == null || !userProfile?.plan ? (
          <NoBillingPlan />
        ) : (
          <>
            <Text display="block">
              <PlanLabel plan={userProfile?.plan} />
            </Text>
            <ManageSubscriptionButton plan={userProfile?.plan} />
            <Text display="block" variant="body2">
              Please contact us at{' '}
              <Anchor href="mailto:contact@greatfrontend.com">
                contact@greatfrontend.com
              </Anchor>{' '}
              should you require a purchase invoice.
            </Text>
            {process.env.NODE_ENV === 'development' && (
              <Text display="block" variant="body2">
                Stripe Customer ID: <code>{userProfile?.stripeCustomerID}</code>
              </Text>
            )}
          </>
        )}
      </Section>
    </div>
  );
}
