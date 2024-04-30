import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiInformationLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeGradientGreenYellow,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import useUserProfileWithProjectsProfile from '../../useUserProfileWithProjectsProfile';
import ProjectsPremiumPricingTableDialog from '../../../challenges/premium/ProjectsPremiumPricingTableDialog';
import { projectsPaidPlanFeatures } from '../../../purchase/ProjectsPricingFeaturesConfig';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

function UnlockCreditsTooltip({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Tooltip
      asChild={true}
      label={
        <div className="flex flex-col gap-y-2">
          <p>
            <FormattedMessage
              defaultMessage="While most projects on our platform are free, we offer premium features on each project like Figma files and official guides / solutions. Upon purchasing premium, you will be given a number of premium credits. A premium credit gives you access to all premium features in a project."
              description="Description of premium feature"
              id="O2hH3T"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="Even when you are not actively subscribed, unspent premium credits will roll over to the next month. However, they can only be used when you are an active premium member."
              description="Description of premium feature"
              id="D4BYZm"
            />
          </p>
        </div>
      }
      side="right">
      {children}
    </Tooltip>
  );
}

function FreePlanVersion({ credits: unlocks }: Readonly<{ credits: number }>) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-stretch gap-4 p-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="body3" weight="bold">
            {intl.formatMessage({
              defaultMessage: 'Free plan',
              description: 'Projects sidebar card CTA title',
              id: '1sJ8d7',
            })}
          </Text>
        </div>
        <Text className="block" color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="Access to over {freeChallengeCount} free challenges. {unlocks, plural, =0 {No access to <tooltip>premium credits</tooltip>} one {<tooltip>1 premium credit</tooltip> unused} other {<tooltip># premium credits</tooltip> unused}}"
            description="Subtitle of Free Plan CTA card in Projects sidebar"
            id="7htD3m"
            values={{
              // TODO(projects): Make this number dynamic.
              freeChallengeCount: 30,
              tooltip: (chunks) => (
                <UnlockCreditsTooltip>
                  <Text className="underline" weight="medium">
                    {chunks}
                  </Text>
                </UnlockCreditsTooltip>
              ),
              unlocks,
            }}
          />
        </Text>
      </div>
      <ProjectsPremiumPricingTableDialog
        trigger={
          <Button
            label={
              unlocks > 0
                ? intl.formatMessage({
                    defaultMessage: 'Resubscribe',
                    description: 'Button CTA to encourage upgrading',
                    id: 'Q0gWLB',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Get full access',
                    description: 'Button CTA to encourage upgrading',
                    id: 'GPFB6p',
                  })
            }
            size="sm"
            variant="primary"
          />
        }
      />
    </div>
  );
}

function RenewalTooltip({
  credits,
  timestamp,
}: Readonly<{
  credits: number;
  timestamp: number;
}>) {
  const date = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(timestamp * 1000));

  return (
    <Tooltip
      label={
        <FormattedMessage
          defaultMessage="{creditCount} new premium credits will be added when your subscription renews on <bold>{date}</bold>"
          description="Information about subscription"
          id="7SOBHl"
          values={{
            bold: (chunks) => (
              <Text className="whitespace-nowrap" color="inherit" weight="bold">
                {chunks}
              </Text>
            ),
            creditCount: credits,
            date,
          }}
        />
      }>
      <RiInformationLine
        className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
      />
    </Tooltip>
  );
}

function PremiumVersion({
  credits,
  creditsAtStartOfCycle,
  plan,
}: Readonly<{
  credits: number;
  creditsAtStartOfCycle: number;
  plan: ProjectsSubscriptionPlan;
}>) {
  const intl = useIntl();
  const { data: activeSubscription } =
    trpc.purchases.activeSubscription.useQuery({
      domain: 'PROJECTS',
    });

  const planConfigs: Record<
    ProjectsSubscriptionPlan,
    Readonly<{ creditsPerInterval: number; label: string }>
  > = {
    ANNUAL: {
      creditsPerInterval: projectsPaidPlanFeatures.ANNUAL.credits!,
      label: intl.formatMessage({
        defaultMessage: 'Annual plan',
        description: 'Subscription plan type',
        id: '9nK/kc',
      }),
    },
    MONTH: {
      creditsPerInterval: projectsPaidPlanFeatures.MONTH.credits!,
      label: intl.formatMessage({
        defaultMessage: 'Monthly plan',
        description: 'Subscription plan type',
        id: 'QruCxn',
      }),
    },
  };
  const planConfig = planConfigs[plan];
  const totalCredits = Math.max(
    creditsAtStartOfCycle,
    credits,
    planConfig.creditsPerInterval,
  );

  return (
    <div className="flex flex-col items-stretch gap-2 p-3">
      <div className="flex items-center justify-between">
        <Text size="body3" weight="bold">
          {planConfig.label}
        </Text>
        {activeSubscription &&
          !activeSubscription.cancelAtPeriodEnd &&
          activeSubscription.currentPeriodEnd && (
            <RenewalTooltip
              credits={planConfig.creditsPerInterval}
              timestamp={activeSubscription.currentPeriodEnd}
            />
          )}
      </div>
      <Text className="block" color="secondary" size="body3">
        {intl.formatMessage({
          defaultMessage: 'Full access to tracks & skills',
          description: 'Subtitle of premium plan CTA card',
          id: 'F09XFi',
        })}
      </Text>
      <Text className="block" color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="<bold>{credits}</bold>/{totalCredits} <tooltip>premium credits</tooltip> left"
          description="Number of premium credits left"
          id="HTxeQV"
          values={{
            bold: (chunks) => <Text size="body2">{chunks}</Text>,
            credits,
            tooltip: (chunks) => (
              <UnlockCreditsTooltip>
                <Text className="underline" color="inherit" weight="medium">
                  {chunks}
                </Text>
              </UnlockCreditsTooltip>
            ),
            totalCredits,
          }}
        />
      </Text>
      <ProgressBar
        label={intl.formatMessage({
          defaultMessage: 'Premium credits remaining',
          description: 'Number of premium credits left',
          id: 'DOTuWP',
        })}
        progressClass={themeGradientGreenYellow.className}
        total={totalCredits}
        value={credits}
      />
    </div>
  );
}

export function ProjectsSidebarCTACard() {
  const { userProfile } = useUserProfileWithProjectsProfile();

  if (userProfile == null) {
    return null;
  }

  return (
    <Card disableSpotlight={true} padding={false} pattern={false}>
      {userProfile.projectsProfile?.premium &&
      userProfile.projectsProfile.plan != null ? (
        <PremiumVersion
          credits={userProfile.projectsProfile.credits}
          creditsAtStartOfCycle={
            userProfile.projectsProfile.creditsAtStartOfCycle
          }
          plan={userProfile.projectsProfile.plan}
        />
      ) : (
        <FreePlanVersion credits={userProfile.projectsProfile?.credits ?? 0} />
      )}
    </Card>
  );
}
