'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';

import type { ProjectsViewerProjectsProfile } from '../../types';
import ProjectsChallengeUnlockAccessDialog from './ProjectsChallengeUnlockAccessDialog';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import ProjectsPremiumPricingTableDialog from './ProjectsPremiumPricingTableDialog';

function UnlockButton({
  slug,
  viewerProjectsProfile,
}: Readonly<{
  slug: string;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>) {
  const intl = useIntl();
  const [unlockDialogShown, setUnlockDialogShown] = useState(false);

  return (
    <div>
      <ProjectsChallengeUnlockAccessDialog
        isShown={unlockDialogShown}
        slug={slug}
        trigger={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Unlock challenge',
              description: 'Unlock premium access for a project',
              id: 'LlhHTu',
            })}
            size="md"
            variant="primary"
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
    </div>
  );
}

type Props = Readonly<{
  icon?: ReactNode;
  slug: string;
  subtitle: ReactNode;
  title: string;
  viewerContentAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsPremiumPaywall({
  slug,
  subtitle,
  title,
  viewerContentAccess,
  viewerProjectsProfile,
}: Props) {
  const intl = useIntl();

  const action = (() => {
    if (viewerContentAccess === 'INSUFFICIENT_CREDITS') {
      // TODO(projects): implement upgrade flow.
      return null;
    }

    if (viewerContentAccess === 'UNLOCK') {
      return (
        <UnlockButton
          slug={slug}
          viewerProjectsProfile={viewerProjectsProfile}
        />
      );
    }

    return (
      <ProjectsPremiumPricingTableDialog
        subtitle={subtitle}
        title={title}
        trigger={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'View subscription plans',
              description: 'Button label to view subscription plans',
              id: 'W/I1wt',
            })}
            size="md"
            variant="primary"
          />
        }
      />
    );
  })();

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-4',
        'mx-auto max-w-xl',
        'text-center',
      )}>
      <EmptyState
        action={action}
        subtitle={subtitle}
        title={title}
        variant="not_subscribed"
      />
    </div>
  );
}
