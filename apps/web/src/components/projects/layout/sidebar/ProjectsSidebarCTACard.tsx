import clsx from 'clsx';
import { RiArrowRightLine, RiInformationLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeGradientPinkPurple,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

function AnonymousVersion() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-stretch gap-3 p-3">
      <div className="flex flex-col gap-2">
        <Text className="text-center" size="body3" weight="bold">
          {intl.formatMessage({
            defaultMessage: "Let's start",
            description: 'Projects sidebar card CTA title',
            id: 'g2dFxo',
          })}
        </Text>
        <Text
          className="text-center"
          color="secondary"
          display="block"
          size="body3">
          {intl.formatMessage({
            defaultMessage: 'Learning by building has never been easier',
            description: 'Card title for projects',
            id: 'lUWoS/',
          })}
        </Text>
      </div>
      <Button
        href="/projects/challenges"
        icon={RiArrowRightLine}
        label={intl.formatMessage({
          defaultMessage: 'Start a project',
          description: 'Start a new practice project',
          id: 'XJJ/hU',
        })}
        size="xs"
        variant="secondary"
      />
    </div>
  );
}

function FreePlanVersion({ unlocks }: Readonly<{ unlocks: number }>) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-stretch gap-3 p-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="body3" weight="bold">
            {intl.formatMessage({
              defaultMessage: 'Free plan',
              description: 'Projects sidebar card CTA title',
              id: '1sJ8d7',
            })}
          </Text>
          {/* TODO(projects): update tooltip */}
          <Tooltip
            label={
              <FormattedMessage
                defaultMessage="Free Plan CTA card tooltip"
                description="Tooltip label for Free Plan CTA card in Projects sidebar"
                id="WX+cIg"
              />
            }>
            <RiInformationLine
              className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
            />
          </Tooltip>
        </div>
        <Text color="secondary" display="block" size="body3">
          {intl.formatMessage(
            {
              defaultMessage:
                'Access to {freeChallengeCount}+ free challenges. {unlocks, plural, =0 {No access to project unlocks} one {1 project unlock unused} other {# project unlocks unused}}',
              description: 'Subtitle of Free Plan CTA card in Projects sidebar',
              id: 'sM0hUe',
            },
            {
              freeChallengeCount: 50,
              unlocks,
            },
          )}
        </Text>
      </div>
      <Button
        href="/projects/pricing"
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
        size="xs"
        variant="primary"
      />
    </div>
  );
}

function PremiumVersion({
  plan,
  credits,
}: Readonly<{
  credits: number;
  plan: ProjectsSubscriptionPlan;
}>) {
  const intl = useIntl();
  const planConfigs: Record<
    ProjectsSubscriptionPlan,
    Readonly<{ creditsPerInterval: number; label: string }>
  > = {
    ANNUAL: {
      // TODO(projects|purchase): centralize source
      creditsPerInterval: 80,

      label: intl.formatMessage({
        defaultMessage: 'Annual plan',
        description: 'Subscription plan type',
        id: '9nK/kc',
      }),
    },
    MONTH: {
      // TODO(projects|purchase): centralize source
      creditsPerInterval: 5,

      label: intl.formatMessage({
        defaultMessage: 'Monthly plan',
        description: 'Subscription plan type',
        id: 'QruCxn',
      }),
    },
  };
  const planConfig = planConfigs[plan];
  const totalCredits = Math.max(credits, planConfig.creditsPerInterval);

  return (
    <div className="flex flex-col items-stretch gap-3 p-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="body3" weight="bold">
            {planConfig.label}
          </Text>
          {/* TODO(projects): update tooltip */}
          <Tooltip
            label={
              <FormattedMessage
                defaultMessage="Free Plan CTA card tooltip"
                description="Tooltip label for Free Plan CTA card in Projects sidebar"
                id="WX+cIg"
              />
            }>
            <RiInformationLine
              className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
            />
          </Tooltip>
        </div>
        <Text color="secondary" display="block" size="body3">
          {intl.formatMessage({
            defaultMessage: 'Full access to tracks & skills',
            description: 'Subtitle of premium plan CTA card',
            id: 'F09XFi',
          })}
        </Text>
        <Text color="secondary" display="block" size="body3">
          <FormattedMessage
            defaultMessage="<bold>{credits}</bold>/{totalCredits} project unlocks left"
            description="Number of unlock credits left"
            id="B/+rVc"
            values={{
              bold: (chunks) => <Text size="body2">{chunks}</Text>,
              credits,
              totalCredits,
            }}
          />
        </Text>
        <ProgressBar
          key={themeGradientPinkPurple.startColor}
          label={intl.formatMessage({
            defaultMessage: 'Credits remaining',
            description: 'Number of unlock credits remaining',
            id: 'PSuOJh',
          })}
          progressClass={themeGradientPinkPurple.className}
          total={totalCredits}
          value={credits}
        />
      </div>
      {/* TODO(projects|purchase): change to canBeUpgraded field */}
      {plan !== 'ANNUAL' && (
        <Button
          href="/projects/pricing"
          label={intl.formatMessage({
            defaultMessage: 'Upgrade access',
            description: 'Button label to upgrade plan',
            id: 'hTwS/w',
          })}
          size="xs"
          variant="primary"
        />
      )}
    </div>
  );
}

export function ProjectsSidebarCTACard() {
  const { profile } = useProfileWithProjectsProfile();

  return (
    <Card disableSpotlight={true} padding={false} pattern={true}>
      {profile == null ? (
        <AnonymousVersion />
      ) : profile.projectsProfile?.premium &&
        profile.projectsProfile.plan != null ? (
        <PremiumVersion
          credits={profile.projectsProfile.credits}
          plan={profile.projectsProfile.plan}
        />
      ) : (
        <FreePlanVersion unlocks={profile.projectsProfile?.credits ?? 0} />
      )}
    </Card>
  );
}
