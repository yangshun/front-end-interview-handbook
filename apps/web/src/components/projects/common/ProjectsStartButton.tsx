import { useState } from 'react';
import { RiLock2Line, RiLockUnlockLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { ProjectsPremiumAccessControlType } from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import Button from '~/components/ui/Button';

import ProjectsChallengeUnlockAccessDialog from '../challenges/premium/ProjectsChallengeUnlockAccessDialog';
import ProjectsPremiumPricingTableDialog from '../challenges/premium/ProjectsPremiumPricingTableDialog';
import type { ProjectsViewerProjectsProfile } from '../types';

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
            addonPosition="start"
            icon={RiLock2Line}
            label={intl.formatMessage({
              defaultMessage: 'Start project',
              description:
                'Label for "Start project" button on Projects project page',
              id: '6/Qdew',
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
  slug: string;
  viewerContentAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsStartButton({
  slug,
  viewerContentAccess,
  viewerProjectsProfile,
}: Props) {
  const intl = useIntl();
  const { startProject } = useProjectsChallengeSessionContext();

  if (viewerContentAccess === 'ACCESSIBLE_TO_EVERYONE') {
    return (
      <Button
        display="block"
        label={intl.formatMessage({
          defaultMessage: 'Start project',
          description:
            'Label for "Start project" button on Projects project page',
          id: '6/Qdew',
        })}
        size="md"
        variant="primary"
        onClick={startProject}
      />
    );
  }

  if (viewerContentAccess === 'UNLOCK') {
    return (
      <UnlockButton slug={slug} viewerProjectsProfile={viewerProjectsProfile} />
    );
  }

  if (viewerContentAccess === 'UNLOCKED') {
    return (
      <Button
        addonPosition="start"
        display="block"
        icon={RiLockUnlockLine}
        label={intl.formatMessage({
          defaultMessage: 'Start project',
          description:
            'Label for "Start project" button on Projects project page',
          id: '6/Qdew',
        })}
        size="md"
        tooltip={intl.formatMessage({
          defaultMessage: 'You have unlocked this project',
          description:
            'Label for "Start project" button on Projects project page',
          id: 'KtacJv',
        })}
        variant="primary"
        onClick={startProject}
      />
    );
  }

  return (
    <ProjectsPremiumPricingTableDialog
      trigger={
        <Button
          addonPosition="start"
          display="block"
          icon={RiLock2Line}
          label={intl.formatMessage({
            defaultMessage: 'Start project',
            description:
              'Label for "Start project" button on Projects project page',
            id: '6/Qdew',
          })}
          size="md"
          variant="primary"
        />
      }
    />
  );
}
