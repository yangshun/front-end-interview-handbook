import clsx from 'clsx';
import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiLock2Line,
  RiLockUnlockLine,
} from 'react-icons/ri';
import { RxFigmaLogo } from 'react-icons/rx';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsChallengeUnlockAccessDialog from './ProjectsChallengeUnlockAccessDialog';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import { useProjectsChallengePaywallSubtitle } from './ProjectsPremiumPaywallStrings';
import ProjectsPremiumPricingTableDialog from './ProjectsPremiumPricingTableDialog';
import { FIGMA_TO_CODE_PLUGIN_URL } from '../ProjectsConstants';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Placement = 'ASSETS_PAGE' | 'GET_STARTED_DIALOG';

function DownloadSection({
  access,
  challengeMetadata,
  placement,
}: Readonly<{
  access: ProjectsPremiumAccessControlType;
  challengeMetadata: ProjectsChallengeMetadata;
  placement: Placement;
}>) {
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Figma design file',
    description: 'Download Figma file button label',
    id: 'RGdxr7',
  });
  const [showFreeFigmaDialog, setShowFreeFigmaDialog] = useState(false);
  const { showToast } = useToast();

  const downloadDesignFilesMutation =
    trpc.projects.challenge.downloadDesignFiles.useMutation({
      onError() {
        showToast({
          title: intl.formatMessage({
            defaultMessage: 'Error downloading file',
            description: 'Error message',
            id: 'ETNZXt',
          }),
          variant: 'danger',
        });
      },
      onSuccess({ signedUrl }) {
        window.location.href = signedUrl;
        setShowFreeFigmaDialog(false);
      },
    });

  const downloadProps = {
    isDisabled: downloadDesignFilesMutation.isLoading,
    isLoading: downloadDesignFilesMutation.isLoading,
    onClick: async () => {
      if (challengeMetadata.access === 'free') {
        setShowFreeFigmaDialog(true);

        return;
      }

      downloadDesignFilesMutation.mutate({
        slug: challengeMetadata.slug,
      });
    },
  };

  const buttonSize = placement === 'GET_STARTED_DIALOG' ? 'md' : 'lg';

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      {access === 'ACCESSIBLE_TO_EVERYONE' && (
        <>
          <Button
            addonPosition="start"
            icon={RxFigmaLogo}
            label={label}
            size={buttonSize}
            variant="secondary"
            {...downloadProps}
          />
          <Text
            className="block"
            color="secondary"
            size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
            <FormattedMessage
              defaultMessage="Download this Figma file (<code>.fig</code>) and open it using the <link>Figma desktop app</link> or the <link2>Figma website</link2>."
              description="Download a premium Figma file"
              id="XVCsHH"
              values={{
                code: (chunks) => <code>{chunks}</code>,
                link: (chunks) => (
                  <Anchor href="https://www.figma.com/downloads/">
                    {chunks}
                  </Anchor>
                ),
                link2: (chunks) => (
                  <Anchor href="https://www.figma.com/">{chunks}</Anchor>
                ),
              }}
            />
          </Text>
          <Alert
            bodySize="body3"
            borderClass={clsx('border', themeBorderElementColor)}
            icon={RxFigmaLogo}
            title="Turn Figma into Code"
            variant="neutral">
            <FormattedMessage
              defaultMessage="Quickly convert challenge designs into
            HTML, CSS, and Tailwind code by using our <link>Figma to Code plugin</link>."
              description="Use the Figma to code plugin"
              id="95Is5V"
              values={{
                link: (chunks) => (
                  <Anchor href={FIGMA_TO_CODE_PLUGIN_URL}>{chunks}</Anchor>
                ),
              }}
            />
          </Alert>
        </>
      )}
      {access === 'UNLOCKED' && (
        <>
          <Button
            addonPosition="start"
            icon={RiLockUnlockLine}
            label={label}
            size={buttonSize}
            tooltip={intl.formatMessage({
              defaultMessage: 'You have unlocked this Figma file',
              description: 'Tooltip for premium Figma file download button',
              id: 'oQYa8+',
            })}
            variant="special"
            {...downloadProps}
          />
          <Text
            className="block"
            color="secondary"
            size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
            <FormattedMessage
              defaultMessage="Download your unlocked Figma file (<code>.fig</code>) and open it using the <link>Figma desktop app</link> or the <link2>Figma website</link2>."
              description="Download a premium Figma file"
              id="fg9NRy"
              values={{
                code: (chunks) => <code>{chunks}</code>,
                link: (chunks) => (
                  <Anchor href="https://www.figma.com/downloads/">
                    {chunks}
                  </Anchor>
                ),
                link2: (chunks) => (
                  <Anchor href="https://www.figma.com/">{chunks}</Anchor>
                ),
              }}
            />
          </Text>
        </>
      )}
      <ConfirmationDialog
        confirmButtonLabel={intl.formatMessage({
          defaultMessage: 'Download',
          description: 'Download file label',
          id: 'K2G0qM',
        })}
        isDisabled={downloadDesignFilesMutation.isLoading}
        isLoading={downloadDesignFilesMutation.isLoading}
        isShown={showFreeFigmaDialog}
        title="Figma files are a premium feature"
        onCancel={() => {
          setShowFreeFigmaDialog(false);
        }}
        onConfirm={() => {
          downloadDesignFilesMutation.mutate({
            slug: challengeMetadata.slug,
          });
        }}>
        <div className="flex flex-col gap-2">
          <Text className="block" size="body2">
            While our challenges are free to access, Figma files,
            challenge-specific guides and official solutions are usually premium
            features.
          </Text>
          <Text className="block" size="body2">
            We have provided this Figma file free to help you get started and as
            an example of the quality you may expect from our Figma files.
          </Text>
        </div>
      </ConfirmationDialog>
    </div>
  );
}

function UnlockSection({
  placement,
  slug,
  viewerProjectsProfile,
}: Readonly<{
  placement: Placement;
  slug: string;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>) {
  const intl = useIntl();
  const [unlockDialogShown, setUnlockDialogShown] = useState(false);
  const [unlockDialogShown2, setUnlockDialogShown2] = useState(false);

  const subtitle = useProjectsChallengePaywallSubtitle(
    'UNLOCK',
    viewerProjectsProfile,
  );

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <ProjectsChallengeUnlockAccessDialog
        isShown={unlockDialogShown}
        slug={slug}
        trigger={
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
        }
        viewerProjectsProfile={viewerProjectsProfile}
        onClose={() => {
          setUnlockDialogShown(false);
        }}
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {subtitle}
      </Text>
      {placement === 'ASSETS_PAGE' && (
        <ProjectsChallengeUnlockAccessDialog
          isShown={unlockDialogShown2}
          slug={slug}
          trigger={
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
                setUnlockDialogShown2(true);
              }}
            />
          }
          viewerProjectsProfile={viewerProjectsProfile}
          onClose={() => {
            setUnlockDialogShown2(false);
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
  const title = intl.formatMessage({
    defaultMessage: 'Premium is required to unlock this project',
    description: 'Unlock premium access for a project',
    id: 'eWwVqI',
  });
  const subtitle = intl.formatMessage({
    defaultMessage:
      'Purchase premium to unlock access to this design file and other features like official guides and solutions. Build accurately and learn to work with production-level specs.',
    description: 'Unlock premium access for a project',
    id: '8Z5qAk',
  });

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <ProjectsPremiumPricingTableDialog
        subtitle={subtitle}
        title={title}
        trigger={
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
          />
        }
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {subtitle}
      </Text>
      {placement === 'ASSETS_PAGE' && (
        <ProjectsPremiumPricingTableDialog
          subtitle={subtitle}
          title={title}
          trigger={
            <Button
              className="-ms-3 self-start"
              icon={RiArrowRightLine}
              label={intl.formatMessage({
                defaultMessage: 'View plans',
                description: 'View pricing plans',
                id: 'L+jocg',
              })}
              size="sm"
              variant="tertiary"
            />
          }
        />
      )}
    </div>
  );
}

function ResubscribeSection({
  access,
  placement,
  viewerProjectsProfile,
}: Readonly<{
  access: ProjectsPremiumAccessControlType;
  placement: Placement;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>) {
  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Premium is required to unlock this project',
    description: 'Unlock premium access for a project',
    id: 'eWwVqI',
  });
  const subtitle = useProjectsChallengePaywallSubtitle(
    access,
    viewerProjectsProfile,
  );

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        placement === 'GET_STARTED_DIALOG' && 'items-start',
      )}>
      <ProjectsPremiumPricingTableDialog
        subtitle={subtitle}
        title={title}
        trigger={
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
          />
        }
      />
      <Text
        className="block"
        color="secondary"
        size={placement === 'ASSETS_PAGE' ? 'body3' : 'body2'}>
        {subtitle}
      </Text>
      {placement === 'ASSETS_PAGE' && (
        <ProjectsPremiumPricingTableDialog
          subtitle={subtitle}
          title={title}
          trigger={
            <Button
              className="-ms-3 self-start"
              icon={RiArrowRightLine}
              label={intl.formatMessage({
                defaultMessage: 'View plans',
                description: 'View pricing plans',
                id: 'L+jocg',
              })}
              size="sm"
              variant="tertiary"
            />
          }
        />
      )}
    </div>
  );
}

function InsufficientCreditsSection({
  placement,
  viewerProjectsProfile,
}: Readonly<{
  placement: Placement;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>) {
  const intl = useIntl();
  const subtitle = useProjectsChallengePaywallSubtitle(
    'INSUFFICIENT_CREDITS',
    viewerProjectsProfile,
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
    case 'UNLOCKED':
    case 'ACCESSIBLE_TO_EVERYONE':
      return (
        <DownloadSection
          access={viewerFigmaAccess}
          challengeMetadata={challengeMetadata}
          placement={placement}
        />
      );
    case 'UNLOCK':
      return (
        <UnlockSection
          placement={placement}
          slug={challengeMetadata.slug}
          viewerProjectsProfile={viewerProjectsProfile}
        />
      );
    case 'SUBSCRIBE':
      return <SubscribeSection placement={placement} />;
    case 'RESUBSCRIBE_TO_ACCESS':
    case 'RESUBSCRIBE_TO_UNLOCK':
      return (
        <ResubscribeSection
          access={viewerFigmaAccess}
          placement={placement}
          viewerProjectsProfile={viewerProjectsProfile}
        />
      );
    case 'INSUFFICIENT_CREDITS':
      return (
        <InsufficientCreditsSection
          placement={placement}
          viewerProjectsProfile={viewerProjectsProfile}
        />
      );
  }
}
