import clsx from 'clsx';
import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiLock2Line,
  RiLockUnlockLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import ProjectsChallengeUnlockAccessDialog from './ProjectsChallengeUnlockAccessDialog';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import { useProjectsChallengePaywallSubtitle } from './ProjectsPremiumPaywallStrings';
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
  const [unlockDialogShown, setUnlockDialogShown] = useState(false);

  const subtitle = useProjectsChallengePaywallSubtitle('UNLOCK', credits, plan);

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <Button
        addonPosition="start"
        icon={RiLock2Line}
        label={intl.formatMessage({
          defaultMessage: 'Figma design file',
          description: 'Download Figma file button label',
          id: 'RGdxr7',
        })}
        size="lg"
        variant="special"
        onClick={() => {
          setUnlockDialogShown(true);
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
          label={intl.formatMessage({
            defaultMessage: 'Unlock challenge',
            description: 'Unlock premium access for a project',
            id: 'LlhHTu',
          })}
          size="sm"
          variant="tertiary"
          onClick={() => {
            setUnlockDialogShown(true);
          }}
        />
      )}
      <ProjectsChallengeUnlockAccessDialog
        credits={credits}
        isShown={unlockDialogShown}
        slug={slug}
        onClose={() => {
          setUnlockDialogShown(false);
        }}
      />
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
  access,
  credits = 0,
  placement,
}: Readonly<{
  access: ProjectsPremiumAccessControlType;
  credits?: number;
  placement: Placement;
}>) {
  const intl = useIntl();
  const subtitle = useProjectsChallengePaywallSubtitle(access, credits, null);

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
  const subtitle = useProjectsChallengePaywallSubtitle(
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
  viewerFigmaAccess: ProjectsPremiumAccessControlType;
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
    case 'RESUBSCRIBE_TO_ACCESS':
    case 'RESUBSCRIBE_TO_UNLOCK':
      return (
        <ResubscribeSection
          access={viewerFigmaAccess}
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
