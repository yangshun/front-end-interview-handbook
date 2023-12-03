import clsx from 'clsx';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import UserAvatar from '~/components/ui/Avatar/UserAvatar';

import 'react-circular-progressbar/dist/styles.css';

import type { User } from '@supabase/supabase-js';

type UserLevelWithAvatarSize = 'lg' | 'xl';

type Props = Readonly<{
  className?: string;
  /**
   * Current level as a number
   */
  level: number;
  /**
   * Progress to next level in percent
   */
  progress: number;
  size?: UserLevelWithAvatarSize;
  user?: User;
}>;

const sizeClasses: Record<
  UserLevelWithAvatarSize,
  {
    innerSize: string;
    outerSize: string;
  }
> = {
  lg: {
    innerSize: 'h-8 w-8',
    outerSize: 'h-10 w-10',
  },
  xl: {
    innerSize: 'h-10 w-10',
    outerSize: 'h-12 w-12',
  },
};

export default function UserAvatarWithLevel({
  user,
  className,
  level,
  progress,
  size = 'lg',
}: Props) {
  const { innerSize, outerSize } = sizeClasses[size];

  return (
    <div className={clsx('relative', className)}>
      <CircularProgressbarWithChildren
        className={outerSize}
        classes={{
          background: 'bg-transparent',
          path: 'stroke-success-light',
          root: '',
          text: '',
          trail: 'dark:stroke-neutral-700 stroke-neutral-300',
        }}
        // Make max value a bit higher than 100 to avoid the level circle
        maxValue={113}
        strokeWidth={Math.round((2 / 48) * 100)}
        styles={{
          path: {
            strokeLinecap: 'round',
            transform: 'rotate(156deg)',
            transformOrigin: 'center center',
          },
        }}
        value={progress}>
        <UserAvatar className={innerSize} size="custom" user={user} />
      </CircularProgressbarWithChildren>
      <div className="bg-success absolute bottom-0 end-0 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
        {level}
      </div>
    </div>
  );
}
