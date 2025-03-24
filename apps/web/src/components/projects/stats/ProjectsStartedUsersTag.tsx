import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Tooltip from '~/components/ui/Tooltip';

import type { ProjectsProfileAvatarDataSlim } from '../types';

type Props = Readonly<{
  avatarBorderClassName: string;
  count: number | null;
  profiles: ReadonlyArray<ProjectsProfileAvatarDataSlim>;
}>;

export default function ProjectsStartedUsersTag({
  avatarBorderClassName,
  count,
  profiles,
}: Props) {
  const intl = useIntl();

  if (count == null || count === 0) {
    return null;
  }

  return (
    <Tooltip
      label={intl.formatMessage(
        {
          defaultMessage:
            '{startedCount, plural, one {A user} other {# users}} started working on this challenge',
          description: 'Number of users who have started the challenge',
          id: 'EfwT/A',
        },
        {
          startedCount: count,
        },
      )}
      triggerClassName="flex z-[1] text-nowrap">
      <div className="flex items-center -space-x-2.5">
        {profiles.map((profile) => (
          <UserAvatar
            key={profile.id}
            className={clsx('border', avatarBorderClassName)}
            size="xs"
            userProfile={profile}
          />
        ))}
      </div>
    </Tooltip>
  );
}
