'use client';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';
import clsx from 'clsx';
import { RiLock2Fill, RiLockUnlockLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Chip from '~/components/ui/Chip';

import ProjectsChallengeStatusChip from '../challenges/metadata/ProjectsChallengeStatusChip';
import type { ProjectsChallengeItem } from '../challenges/types';
import ProjectsProfileAvatarWithStatus from '../users/ProjectsProfileAvatarWithStatus';

type Props = Readonly<{
  challenge?: ProjectsChallengeItem;
  index: number;
  status: ProjectsChallengeSessionStatus | null;
  userProfile: React.ComponentProps<
    typeof ProjectsProfileAvatarWithStatus
  >['userProfile'];
  view?: 'skills' | 'submission' | 'tracks';
}>;

export default function ProjectsTrackChallengeChip({
  index,
  status,
  userProfile,
  view = 'tracks',
  challenge,
}: Props) {
  const intl = useIntl();
  const isSubmissionView = view === 'submission';

  if (isSubmissionView) {
    if (
      challenge &&
      challenge.metadata.access === 'premium' &&
      status == null
    ) {
      return (
        <Chip
          icon={challenge.userUnlocked ? RiLockUnlockLine : RiLock2Fill}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Premium',
            description: 'Label for premium',
            id: 'ymmDf7',
          })}
          size="sm"
          variant="special"
        />
      );
    }

    return (
      <div className={clsx('flex items-center')}>
        <ProjectsChallengeStatusChip
          label={index}
          status={status ?? 'NOT_STARTED'}
        />
      </div>
    );
  }

  return userProfile == null || status == null ? (
    <div className={clsx('flex items-center')}>
      <ProjectsChallengeStatusChip
        label={index}
        status={status ?? 'NOT_STARTED'}
      />
    </div>
  ) : (
    <ProjectsProfileAvatarWithStatus
      size="xs"
      status={status !== 'STOPPED' ? status : null}
      userProfile={userProfile}
    />
  );
}
