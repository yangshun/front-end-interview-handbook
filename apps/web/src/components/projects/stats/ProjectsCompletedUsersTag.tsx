import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Text from '~/components/ui/Text';

import type { Profile } from '@prisma/client';

type Props = Readonly<{
  className?: string;
  count: number | null;
  users: ReadonlyArray<Profile>;
}>;

export default function ProjectsCompletedUsersTag({
  users,
  count,
  className,
}: Props) {
  if (count == null || count === 0) {
    return null;
  }

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <div className="flex items-center -space-x-3">
        {users.map((user) => (
          <UserAvatar
            key={user.id}
            className="border dark:border-neutral-900 border-white"
            profile={user}
            size="xs"
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
