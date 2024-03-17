import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Text from '~/components/ui/Text';

import type { ProjectsProfileAvatarDataSlim } from '../types';

type Props = Readonly<{
  className?: string;
  count: number | null;
  profiles: ReadonlyArray<ProjectsProfileAvatarDataSlim>;
}>;

const MINIMUM_COUNT_TO_DISPLAY_LABEL = 5;

export default function ProjectsCompletedUsersTag({
  profiles,
  count,
  className,
}: Props) {
  if (count == null || count < MINIMUM_COUNT_TO_DISPLAY_LABEL) {
    return null;
  }

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <div className="flex items-center -space-x-3">
        {profiles.map((profile) => (
          <UserAvatar
            key={profile.id}
            className="border border-white dark:border-neutral-900"
            size="xs"
            userProfile={profile}
          />
        ))}
      </div>
      <Text color="subtle" size="body3">
        <FormattedMessage
          defaultMessage="{completedCount} completed"
          description="Label for number of completed users for a project"
          id="AZInep"
          values={{
            completedCount: count,
          }}
        />
      </Text>
    </div>
  );
}
