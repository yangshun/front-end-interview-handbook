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
    case null: {
      return (
        <div className="flex flex-col gap-4">
          <div>
            <FormattedMessage
              defaultMessage="You are not subscribed. <link>View subscription plans</link> for GreatFrontEnd Interviews."
              description="Text describing user's subscription plan."
              id="FlysR+"
              values={{
                link: (chunks) => (
                  <Anchor href="/interviews/pricing">{chunks}</Anchor>
                ),
              }}
            />
          </div>
          <Alert
            bodySize="body3"
            icon={RiBriefcaseLine}
            title="GreatFrontEnd Interviews Premium"
            variant="primary">
            <FormattedMessage
              defaultMessage="Purchase premium to get access to all {questionCount}+ interview questions, official solutions, study plans, and company tags."
              description="Text describing user's subscription plan."
              id="LL5UA7"
              values={{
                link: (chunks) => (
                  <Anchor href="/interviews/pricing">{chunks}</Anchor>
                ),
                questionCount: QuestionCountTotal,
              }}
            />
          </Alert>
        </div>
      );
    }
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

  return null;
}

function ProjectsPlanLabel({
  viewerProjectsProfile,
}: Readonly<{
  viewerProjectsProfile?: ProjectsViewerProjectsProfile | null;
}>): JSX.Element | null {
  const subtitle = useProjectsChallengePaywallSubtitle(
    'SUBSCRIBE',
    viewerProjectsProfile,
  );

  const plan = viewerProjectsProfile?.plan;

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
    case null: {
      return (
        <div className="flex flex-col gap-4" data-theme="projects">
          <div>
            <FormattedMessage
              defaultMessage="You are not subscribed. <link>View subscription plans</link> for GreatFrontEnd Projects."
              description="Text describing user's subscription plan."
              id="AcrAV0"
              values={{
                link: (chunks) => (
                  <Anchor href="/projects/pricing">{chunks}</Anchor>
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
            title="GreatFrontEnd Projects Premium"
            variant="primary">
            {subtitle}
          </Alert>
        </div>
      );
    }
    case 'ANNUAL': {
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
    case 'MONTH': {
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
  }

  return null;
}

function ManageSubscriptionSection(): JSX.Element | null {
  const { userProfile } = useUserProfileWithProjectsProfile();
  const intl = useIntl();
  const billingPortalMutation =
    trpc.purchases.billingPortalSessionUrl.useMutation();

  const plan = userProfile?.plan;

  if (plan == null && userProfile?.projectsProfile?.plan == null) {
    return null;
  }

  async function navigateToStripePortal() {
    const billingPortalUrl = await billingPortalMutation.mutateAsync({
      returnUrl: window.location.href,
    });

    window.location.href = billingPortalUrl;
  }

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        'p-4',
        ['border', themeBorderColor],
        'rounded-lg',
      )}>
      <div className={clsx('flex flex-col gap-1')}>
        <Text className="block" size="body1" weight="bold">
          <FormattedMessage
            defaultMessage="Manage subscription"
            description="Manage billing subscription"
            id="jMTHcm"
          />
        </Text>
        <Text className="block" color="secondary" size="body3">
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
          {(userProfile?.plan === 'month' ||
            userProfile?.plan === 'quarter') && (
            <Alert
              bodySize="body3"
              title="Upgrade to lifetime plan"
              variant="success">
              <FormattedMessage
                defaultMessage="Existing subscribers can upgrade to the lifetime plan at a discount, send an email to <link>contact@greatfrontend</link> to find out more."
                description="Call to action text to upgrade plan."
                id="D5644P"
                values={{
                  link: (chunks) => (
                    <Anchor href="mailto:contact@greatfrontend.com">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            </Alert>
          )}
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
            <ManageSubscriptionSection />
          </>
        )}
      </Section>
    </div>
  );
}
