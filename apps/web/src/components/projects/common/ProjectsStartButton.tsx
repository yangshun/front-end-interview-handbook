import { useState } from 'react';
import { RiLock2Line, RiLockUnlockLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsPremiumAccessControlType } from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import Button from '~/components/ui/Button';

import ProjectsChallengeUnlockAccessDialog from '../challenges/premium/ProjectsChallengeUnlockAccessDialog';
import ProjectsPremiumPricingTableDialog from '../challenges/premium/ProjectsPremiumPricingTableDialog';
import type { ProjectsViewerProjectsProfile } from '../types';

function UnlockButton({
  credits,
  slug,
}: Readonly<{
  credits: number;
  slug: string;
}>) {
  const intl = useIntl();
  const [unlockDialogShown, setUnlockDialogShown] = useState(false);

  return (
    <div>
      <ProjectsChallengeUnlockAccessDialog
        credits={credits}
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
  viewerContentAccess,
  viewerProjectsProfile,
  slug,
}: Props) {
  const intl = useIntl();
  const { startProject } = useProjectsChallengeSessionContext();

  const credits = viewerProjectsProfile?.credits ?? 0;

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
    return <UnlockButton credits={credits} slug={slug} />;
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
