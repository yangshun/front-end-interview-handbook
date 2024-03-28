import clsx from 'clsx';
import { RiCheckLine, RiLoader4Line } from 'react-icons/ri';

import { avatarVariants } from '~/components/ui/Avatar/AvatarStyles';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';

type Status = 'COMPLETED' | 'IN_PROGRESS';

type Props = Readonly<{
  size?: React.ComponentProps<typeof UserAvatar>['size'];
  status?: Status;
  userProfile?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  }> | null;
}>;

export type UserLevelWithAvatarSize = '2xl' | '3xl' | 'lg' | 'xl';

const statusClasses: Record<
  Status,
  Readonly<{
    className: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  }>
> = {
  COMPLETED: {
    className: 'bg-success dark:bg-success-light',
    icon: RiCheckLine,
  },
  IN_PROGRESS: {
    className: 'bg-brand-dark dark:bg-brand',
    icon: RiLoader4Line,
  },
};

export default function ProjectsProfileAvatarWithStatus({
  status,
  userProfile,
  size,
}: Props) {
  return (
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
}
