import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiLoader2Line } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import { avatarVariants } from '~/components/ui/Avatar/AvatarStyles';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Tooltip from '~/components/ui/Tooltip';

type Status = 'COMPLETED' | 'IN_PROGRESS';

type Props = Readonly<{
  size?: React.ComponentProps<typeof UserAvatar>['size'];
  status?: Status | null;
  userProfile?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  }> | null;
}>;

const statusClasses: Record<
  Status,
  Readonly<{
    className: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  }>
> = {
  COMPLETED: {
    className: 'bg-success dark:bg-success-light',
    icon: FaCheck,
  },
  IN_PROGRESS: {
    className: 'bg-warning',
    icon: RiLoader2Line,
  },
};

export default function ProjectsProfileAvatarWithStatus({
  size,
  status,
  userProfile,
}: Props) {
  const intl = useIntl();

  const element = (
    <div className={clsx('relative shrink-0 grow-0', avatarVariants({ size }))}>
      <UserAvatar size={size} userProfile={userProfile} />
      {status && (
        <div
          className={clsx(
            'flex items-center justify-center',
            'size-2.5 rounded-full',
            'absolute bottom-0 end-0',
            'font-bold text-white',
            statusClasses[status].className,
          )}>
          {(() => {
            const Icon = statusClasses[status].icon;

            return <Icon className="size-2 shrink-0" />;
          })()}
        </div>
      )}
    </div>
  );

  if (status == null || userProfile == null) {
    return element;
  }

  const label = (() => {
    const name = userProfile?.name || userProfile?.username;

    switch (status) {
      case 'IN_PROGRESS':
        return intl.formatMessage(
          {
            defaultMessage: '{name} in progress',
            description: 'User is working on this challenge',
            id: 'mhZ4FL',
          },
          {
            name,
          },
        );
      case 'COMPLETED':
        return intl.formatMessage(
          {
            defaultMessage: '{name} completed',
            description: 'User has completed on this challenge',
            id: 'ouJSar',
          },
          {
            name,
          },
        );
    }
  })();

  return <Tooltip label={label}>{element}</Tooltip>;
}
