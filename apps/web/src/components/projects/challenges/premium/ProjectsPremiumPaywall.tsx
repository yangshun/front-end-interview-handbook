import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import ProjectsChallengeUnlockAccessDialog from './ProjectsChallengeUnlockAccessDialog';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import ProjectsPremiumPricingTableDialog from './ProjectsPremiumPricingTableDialog';
import type { ProjectsViewerProjectsProfile } from '../../types';

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
  size: 'lg' | 'md';
  slug: string;
  subtitle: ReactNode;
  title: string;
  viewerContentAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsPremiumPaywall({
  viewerProjectsProfile,
  icon,
  size,
  slug,
  subtitle,
  title,
  viewerContentAccess,
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
      {icon}
      {size === 'lg' ? (
        <div className="flex flex-col gap-4">
          <Heading level="heading5">{title}</Heading>
          <Text
            className="text-pretty mt-4 block"
            color="subtitle"
            size="body1">
            {subtitle}
          </Text>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Text className="text-pretty block" size="body1" weight="medium">
            {title}
          </Text>
          <Text className="text-pretty block" color="secondary" size="body2">
            {subtitle}
          </Text>
        </div>
      )}

      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
