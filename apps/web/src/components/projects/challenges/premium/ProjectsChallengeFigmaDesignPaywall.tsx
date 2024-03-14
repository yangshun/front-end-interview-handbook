import clsx from 'clsx';
import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import {
  RiArrowRightLine,
  RiLock2Line,
  RiLockUnlockLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeAccessControlType } from './ProjectsChallengeAccessControl';
import { useProjectsChallengePremiumPaywallSubtitle } from './ProjectsChallengePremiumPaywallStrings';
import type { ProjectsViewerProjectsProfile } from '../../types';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

type Placement = 'ASSETS_PAGE' | 'GET_STARTED_DIALOG';

function DownloadSection({
  downloadHref,
  placement,
}: Readonly<{
  downloadHref: string;
  placement: Placement;
}>) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <Button
        addonPosition="start"
        href={downloadHref}
        icon={RiLockUnlockLine}
        label={intl.formatMessage({
          defaultMessage: 'Figma design file',
          description: 'Download Figma file button label',
          id: 'RGdxr7',
        })}
        size="lg"
        variant="special"
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {intl.formatMessage({
          defaultMessage: 'Download your unlocked Figma file',
          description: 'Download a premium Figma file',
          id: 'uoPJJV',
        })}
      </Text>
    </div>
  );
}

function UnlockSection({
  credits = 0,
  plan = null,
  placement,
  slug,
}: Readonly<{
  credits?: number;
  placement: Placement;
  plan?: ProjectsSubscriptionPlan | null;
  slug: string;
}>) {
  const intl = useIntl();
  const unlockAccessMutation =
    trpc.projects.challenges.unlockAccess.useMutation();

  const subtitle = useProjectsChallengePremiumPaywallSubtitle(
    'UNLOCK',
    credits,
    plan,
  );

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <Button
        addonPosition="start"
        icon={RiLock2Line}
        isDisabled={unlockAccessMutation.isLoading}
        isLoading={unlockAccessMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Figma design file',
          description: 'Download Figma file button label',
          id: 'RGdxr7',
        })}
        size="lg"
        variant="special"
        onClick={() => {
          unlockAccessMutation.mutate({
            slug,
          });
        }}
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {subtitle}
      </Text>
      {placement === 'ASSETS_PAGE' && (
        <Button
          className="-ms-3 self-start"
          icon={RiArrowRightLine}
          isDisabled={unlockAccessMutation.isLoading}
          isLoading={unlockAccessMutation.isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Unlock project',
            description: 'Unlock premium access for a project',
            id: 'rDGIfe',
          })}
          size="sm"
          variant="tertiary"
          onClick={() => {
            unlockAccessMutation.mutate({
              slug,
            });
          }}
        />
      )}
    </div>
  );
}

function SubscribeSection({
  placement,
}: Readonly<{
  placement: Placement;
}>) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <Button
        addonPosition="start"
        href="/projects/pricing"
        icon={RiLockUnlockLine}
        isDisabled={true}
        label={intl.formatMessage({
          defaultMessage: 'Figma design file',
          description: 'Download Figma file button label',
          id: 'RGdxr7',
        })}
        size="lg"
        variant="special"
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {intl.formatMessage({
          defaultMessage:
            'Purchase premium to unlock access to this Figma design file (and other features like official guides and solutions). Build accurately and learn to work with production-level specs.',
          description: 'Unlock premium access for a project',
          id: 'VkZQZm',
        })}
      </Text>
      {placement === 'ASSETS_PAGE' && (
        <Button
          className="-ms-3 self-start"
          href="/projects/pricing"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'View plans',
            description: 'View pricing plans',
            id: 'L+jocg',
          })}
          size="sm"
          variant="tertiary"
        />
      )}
    </div>
  );
}

function ResubscribeSection({
  credits = 0,
  placement,
}: Readonly<{
  credits?: number;
  placement: Placement;
}>) {
  const intl = useIntl();
  const subtitle = useProjectsChallengePremiumPaywallSubtitle(
    'RESUBSCRIBE',
    credits,
    null,
  );

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <Button
        addonPosition="start"
        href="/projects/pricing"
        icon={RiLockUnlockLine}
        label={intl.formatMessage({
          defaultMessage: 'Figma design file',
          description: 'Download Figma file button label',
          id: 'RGdxr7',
        })}
        size="lg"
        variant="special"
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {subtitle}
      </Text>
      {placement === 'ASSETS_PAGE' && (
        <Button
          className="-ms-3 self-start"
          href="/projects/pricing"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'View plans',
            description: 'View pricing plans',
            id: 'L+jocg',
          })}
          size="sm"
          variant="tertiary"
        />
      )}
    </div>
  );
}

function InsufficientCreditsSection({
  placement,
  plan = null,
}: Readonly<{
  placement: Placement;
  plan?: ProjectsSubscriptionPlan | null;
}>) {
  const intl = useIntl();
  const subtitle = useProjectsChallengePremiumPaywallSubtitle(
    'INSUFFICIENT_CREDITS',
    0,
    plan,
  );

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <Button
        addonPosition="start"
        icon={RiLockUnlockLine}
        isDisabled={true}
        label={intl.formatMessage({
          defaultMessage: 'Figma design file',
          description: 'Download Figma file button label',
          id: 'RGdxr7',
        })}
        size="lg"
        variant="special"
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {subtitle}
      </Text>
    </div>
  );
}

type Props = Readonly<{
  challengeMetadata: ProjectsChallengeMetadata;
  placement: Placement;
  viewerFigmaAccess: ProjectsChallengeAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeFigmaDesignPaywall({
  challengeMetadata,
  placement,
  viewerFigmaAccess,
  viewerProjectsProfile,
}: Props) {
  switch (viewerFigmaAccess) {
    case 'YES':
      return (
        <DownloadSection
          downloadHref={challengeMetadata.downloadDesignFileHref}
          placement={placement}
        />
      );
    case 'UNLOCK':
      return (
        <UnlockSection
          credits={viewerProjectsProfile?.credits}
          placement={placement}
          plan={viewerProjectsProfile?.plan}
          slug={challengeMetadata.slug}
        />
      );
    case 'SUBSCRIBE':
      return <SubscribeSection placement={placement} />;
    case 'RESUBSCRIBE':
      return (
        <ResubscribeSection
          credits={viewerProjectsProfile?.credits}
          placement={placement}
        />
      );
    case 'INSUFFICIENT_CREDITS':
      return (
        <InsufficientCreditsSection
          placement={placement}
          plan={viewerProjectsProfile?.plan}
        />
      );
  }
}
