import clsx from 'clsx';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import UserAvatar from '~/components/ui/Avatar/UserAvatar';

import 'react-circular-progressbar/dist/styles.css';

import type { User } from '@supabase/supabase-js';

type UserLevelWithAvatarSize = '2xl' | 'lg' | 'xl';

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
  user?: User | null;
}>;

const sizeClasses: Record<
  UserLevelWithAvatarSize,
  {
    innerSize: string;
    outerSize: string;
    sizePixels: number;
  }
> = {
  '2xl': {
    innerSize: 'h-12 w-12',
    outerSize: 'h-14 w-14',
    sizePixels: 56,
  },
  lg: {
    innerSize: 'h-8 w-8',
    outerSize: 'h-10 w-10',
    sizePixels: 40,
  },
  xl: {
    innerSize: 'h-10 w-10',
    outerSize: 'h-12 w-12',
    sizePixels: 48,
  },
};

export default function UserAvatarWithLevel({
  user,
  className,
  level,
  progress,
  size = 'lg',
}: Props) {
  const { innerSize, outerSize, sizePixels } = sizeClasses[size];

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
        strokeWidth={Math.round((2 / sizePixels) * 100)}
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
      <div className="bg-success text-2xs absolute bottom-0 end-0 flex h-4 w-4 items-center justify-center rounded-full font-bold text-white">
        {level}
      </div>
    </div>
  );
}
