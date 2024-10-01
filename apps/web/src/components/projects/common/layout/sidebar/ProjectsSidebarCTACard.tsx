import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiInformationLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
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
import {
  annualPlanFeatures,
  monthlyPlanFeatures,
} from '../../../purchase/ProjectsPricingFeaturesConfig';

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
              defaultMessage="Even when you are not actively subscribed, unspent premium credits will roll over to the next cycle. For annual users, we will roll over credits for projects that remain locked at the end of your subscription cycle. However, credits can only be spent when you are an active premium member."
              description="Description of premium feature"
              id="xleg5b"
            />
          </p>
        </div>
      }
      side="right">
      {children}
    </Tooltip>
  );
}

function FreePlanCard({ credits: unlocks }: Readonly<{ credits: number }>) {
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
            defaultMessage="Access to over {freeChallengeCount} free challenges. {unlocks, plural, =0 {No access to <tooltip>premium credits</tooltip>} one {<tooltip>1 premium credit</tooltip> unspent} other {<tooltip># premium credits</tooltip> unspent}}"
            description="Subtitle of Free Plan CTA card in Projects sidebar"
            id="EYI2aK"
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
  creditsAwardedDuringRenewal,
  timestamp,
}: Readonly<{
  creditsAwardedDuringRenewal: number | 'unlimited';
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
        creditsAwardedDuringRenewal === 'unlimited' ? (
          <FormattedMessage
            defaultMessage="Your subscription renews on <bold>{date}</bold>"
            description="Information about subscription"
            id="CUkv2F"
            values={{
              bold: (chunks) => (
                <Text
                  className="whitespace-nowrap"
                  color="inherit"
                  weight="bold">
                  {chunks}
                </Text>
              ),
              date,
            }}
          />
        ) : (
          <FormattedMessage
            defaultMessage="{creditCount} new premium credits will be added when your subscription renews on <bold>{date}</bold>"
            description="Information about subscription"
            id="7SOBHl"
            values={{
              bold: (chunks) => (
                <Text
                  className="whitespace-nowrap"
                  color="inherit"
                  weight="bold">
                  {chunks}
                </Text>
              ),
              creditCount: creditsAwardedDuringRenewal,
              date,
            }}
          />
        )
      }>
      <RiInformationLine
        className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
      />
    </Tooltip>
  );
}

function MonthlyPlanCard({
  credits,
  creditsAtStartOfCycle,
}: Readonly<{
  credits: number;
  creditsAtStartOfCycle: number;
}>) {
  const intl = useIntl();
  const { data: activeSubscription } =
    trpc.purchases.activeSubscription.useQuery({
      domain: 'PROJECTS',
    });

  const creditsPerInterval = monthlyPlanFeatures.credits;

  return (
    <div className="flex flex-col items-stretch gap-2 p-3">
      <div className="flex items-center justify-between">
        <Text size="body3" weight="bold">
          {intl.formatMessage({
            defaultMessage: 'Monthly plan',
            description: 'Subscription plan type',
            id: 'QruCxn',
          })}
        </Text>
        {activeSubscription &&
          !activeSubscription.cancelAtPeriodEnd &&
          activeSubscription.currentPeriodEnd && (
            <RenewalTooltip
              creditsAwardedDuringRenewal={creditsPerInterval}
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
            totalCredits: Math.max(
              creditsAtStartOfCycle,
              credits,
              creditsPerInterval,
            ),
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
        total={Math.max(creditsAtStartOfCycle, credits, creditsPerInterval)}
        value={credits}
      />
    </div>
  );
}

function AnnualPlanCard() {
  const intl = useIntl();
  const { data: activeSubscription } =
    trpc.purchases.activeSubscription.useQuery({
      domain: 'PROJECTS',
    });

  return (
    <div className="flex flex-col items-stretch gap-2 p-3">
      <div className="flex items-center justify-between">
        <Text size="body3" weight="bold">
          {intl.formatMessage({
            defaultMessage: 'Annual plan',
            description: 'Subscription plan type',
            id: '9nK/kc',
          })}
        </Text>
        {activeSubscription &&
          !activeSubscription.cancelAtPeriodEnd &&
          activeSubscription.currentPeriodEnd && (
            <RenewalTooltip
              creditsAwardedDuringRenewal={annualPlanFeatures.credits}
              timestamp={activeSubscription.currentPeriodEnd}
            />
          )}
      </div>
      <Text className="block" color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="Full access to tracks & skills. Unlimited <tooltip>premium credits</tooltip>"
          description="Subtitle of premium plan CTA card"
          id="vWzLH8"
          values={{
            tooltip: (chunks) => (
              <UnlockCreditsTooltip>
                <Text className="underline" color="inherit" weight="medium">
                  {chunks}
                </Text>
              </UnlockCreditsTooltip>
            ),
          }}
        />
      </Text>
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
      {userProfile.projectsProfile?.plan === 'MONTH' ? (
        <MonthlyPlanCard
          credits={userProfile.projectsProfile.credits}
          creditsAtStartOfCycle={
            userProfile.projectsProfile.creditsAtStartOfCycle
          }
        />
      ) : userProfile.projectsProfile?.plan === 'ANNUAL' ? (
        <AnnualPlanCard />
      ) : (
        <FreePlanCard credits={userProfile.projectsProfile?.credits ?? 0} />
      )}
    </Card>
  );
}
