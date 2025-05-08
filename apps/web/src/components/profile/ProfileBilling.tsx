'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiBriefcaseLine, RiRocketLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { InterviewsProfileSubscriptionPlan } from '~/components/global/UserProfileProvider';
import { FormattedMessage, useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import { QuestionCountTotal } from '../interviews/questions/listings/stats/QuestionCount';
import { useProjectsChallengePaywallSubtitle } from '../projects/challenges/premium/ProjectsPremiumPaywallStrings';
import useUserProfileWithProjectsProfile from '../projects/common/useUserProfileWithProjectsProfile';
import type { ProjectsViewerProjectsProfile } from '../projects/types';

function InterviewsPlanLabel({
  plan,
}: Readonly<{
  plan?: InterviewsProfileSubscriptionPlan | null;
}>): JSX.Element | null {
  const intl = useIntl();
  const autoRenewal = (
    <>
      <FormattedMessage
        defaultMessage="Subscriptions are automatically renewed by default. You may cancel your subscription anytime via the Stripe billing portal."
        description="Information about subscription renewal"
        id="g5zyFF"
        values={{
          link: (chunks) => (
            <Anchor href="mailto:contact@greatfrontend.com">{chunks}</Anchor>
          ),
        }}
      />
      <div className="mt-4">
        <ManageSubscriptionButton />
      </div>
    </>
  );

  function renderBold(chunks: Array<ReactNode>) {
    return (
      <Text size="inherit" weight="bold">
        {chunks}
      </Text>
    );
  }

  switch (plan) {
    case null: {
      return (
        <div className="flex flex-col gap-4">
          <div>
            <FormattedMessage
              defaultMessage="You are not subscribed. <link>View subscription plans</link> for <interviews>GreatFrontEnd Interviews</interviews>."
              description="User's subscription plan"
              id="jIgy3E"
              values={{
                interviews: (chunks) => <Anchor href="/">{chunks}</Anchor>,
                link: (chunks) => (
                  <Anchor href="/interviews/pricing">{chunks}</Anchor>
                ),
              }}
            />
          </div>
          <Alert
            bodySize="body3"
            icon={RiBriefcaseLine}
            title={intl.formatMessage({
              defaultMessage: 'GreatFrontEnd Interviews Premium',
              description: 'GreatFrontEnd Interviews premium',
              id: 'joVUiA',
            })}
            variant="primary">
            <FormattedMessage
              defaultMessage="Get access to all {questionCount}+ interview questions, official solutions, study plans, and company guides."
              description="GreatFrontEnd Interviews premium description"
              id="e/lC4t"
              values={{
                questionCount: QuestionCountTotal,
              }}
            />
          </Alert>
        </div>
      );
    }
    case 'year': {
      return (
        <>
          <FormattedMessage
            defaultMessage="You are on the <bold>Annual</bold> plan."
            description="User's subscription plan"
            id="/slker"
            values={{
              bold: renderBold,
            }}
          />{' '}
          {autoRenewal}
        </>
      );
    }
    case 'month': {
      return (
        <>
          <FormattedMessage
            defaultMessage="You are on the <bold>Monthly</bold> plan."
            description="User's subscription plan"
            id="JrD5Rd"
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
            description="User's subscription plan"
            id="J114XD"
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
          description="User's subscription plan"
          id="xZPifi"
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

  return null;
}

function ProjectsPlanLabel({
  viewerProjectsProfile,
}: Readonly<{
  viewerProjectsProfile?: ProjectsViewerProjectsProfile | null;
}>): JSX.Element | null {
  const intl = useIntl();
  const subtitle = useProjectsChallengePaywallSubtitle(
    'SUBSCRIBE',
    viewerProjectsProfile,
  );

  const plan = viewerProjectsProfile?.plan;

  const autoRenewal = (
    <>
      <FormattedMessage
        defaultMessage="Subscriptions are automatically renewed by default. You may cancel your subscription anytime via the Stripe billing portal."
        description="Information about subscription renewal"
        id="g5zyFF"
        values={{
          link: (chunks) => (
            <Anchor href="mailto:contact@greatfrontend.com">{chunks}</Anchor>
          ),
        }}
      />
      <div className="mt-4">
        <ManageSubscriptionButton />
      </div>
    </>
  );

  const renderBold = (chunks: Array<ReactNode>) => (
    <Text size="inherit" weight="bold">
      {chunks}
    </Text>
  );

  switch (plan) {
    case null: {
      return (
        <div className="flex flex-col gap-4" data-theme="projects">
          <div>
            <FormattedMessage
              defaultMessage="You are not subscribed. <link>View subscription plans</link> for <projects>GreatFrontEnd Projects</projects>."
              description="User's subscription plan"
              id="YsLLTo"
              values={{
                link: (chunks) => (
                  <Anchor href="/projects/pricing">{chunks}</Anchor>
                ),
                projects: (chunks) => (
                  <Anchor href="/projects">{chunks}</Anchor>
                ),
              }}
            />
          </div>
          <Alert
            bodySize="body3"
            icon={({ className, ...props }) => (
              <RiRocketLine
                className={clsx('-translate-y-0.5 rotate-45', className)}
                {...props}
              />
            )}
            title={intl.formatMessage({
              defaultMessage: 'GreatFrontEnd Projects Premium',
              description: 'GreatFrontEnd Projects premium',
              id: '7lvAEP',
            })}
            variant="primary">
            {subtitle}
          </Alert>
        </div>
      );
    }
    case 'ANNUAL': {
      return (
        <>
          <FormattedMessage
            defaultMessage="You are on the <bold>Annual</bold> plan."
            description="User's subscription plan"
            id="/slker"
            values={{
              bold: renderBold,
            }}
          />{' '}
          {autoRenewal}
        </>
      );
    }
    case 'MONTH': {
      return (
        <>
          <FormattedMessage
            defaultMessage="You are on the <bold>Monthly</bold> plan."
            description="User's subscription plan"
            id="JrD5Rd"
            values={{
              bold: renderBold,
            }}
          />{' '}
          {autoRenewal}
        </>
      );
    }
  }

  return null;
}

function ManageSubscriptionButton(): JSX.Element | null {
  const intl = useIntl();
  const billingPortalMutation =
    trpc.purchases.billingPortalSessionUrl.useMutation();

  async function navigateToStripePortal() {
    const billingPortalUrl = await billingPortalMutation.mutateAsync({
      returnUrl: window.location.href,
    });

    window.location.href = billingPortalUrl;
  }

  return (
    <div>
      <Button
        isDisabled={billingPortalMutation.isLoading}
        isLoading={billingPortalMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Manage subscription on Stripe',
          description: 'Label for button to manage subscription',
          id: 'Fg3V0y',
        })}
        variant="secondary"
        onClick={navigateToStripePortal}
      />
    </div>
  );
}

function InterviewsSubscriptionSection() {
  const { userProfile } = useUserProfileWithProjectsProfile();

  return (
    <div
      className={clsx('flex flex-col', 'p-4', 'rounded-lg', [
        'border',
        themeBorderColor,
      ])}>
      <div className="flex flex-col gap-2">
        <Text className="block" size="body1" weight="bold">
          <FormattedMessage
            defaultMessage="GreatFrontEnd Interviews"
            description="GreatFrontEnd product vertical"
            id="0AnwRY"
          />
        </Text>
        <div className="flex flex-col gap-2">
          <Text className="block" color="secondary" size="body3">
            <InterviewsPlanLabel
              plan={
                userProfile?.plan as InterviewsProfileSubscriptionPlan | null
              }
            />
          </Text>
        </div>
      </div>
    </div>
  );
}

function ProjectsSubscriptionSection() {
  const { userProfile } = useUserProfileWithProjectsProfile();

  if (userProfile?.projectsProfile == null) {
    return null;
  }

  return (
    <div
      className={clsx('flex flex-col', 'p-4', 'rounded-lg', [
        'border',
        themeBorderColor,
      ])}>
      <div className="flex flex-col gap-2">
        <Text className="block" size="body1" weight="bold">
          <FormattedMessage
            defaultMessage="GreatFrontEnd Projects"
            description="GreatFrontEnd product vertical"
            id="asLCAB"
          />
        </Text>
        <Text className="block" color="secondary" size="body3">
          <ProjectsPlanLabel
            viewerProjectsProfile={userProfile?.projectsProfile}
          />
        </Text>
      </div>
    </div>
  );
}

export default function ProfileBilling() {
  const { isLoading } = useUserProfileWithProjectsProfile();

  return (
    <div className="flex flex-col gap-y-6 lg:max-w-lg">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Billing"
          description="Screenreader text for subscription billing."
          id="0Nq65E"
        />
      </Heading>
      <Section>
        {isLoading ? (
          <div className="py-10">
            <Spinner display="block" />
          </div>
        ) : (
          <>
            <InterviewsSubscriptionSection />
            <ProjectsSubscriptionSection />
          </>
        )}
      </Section>
    </div>
  );
}
