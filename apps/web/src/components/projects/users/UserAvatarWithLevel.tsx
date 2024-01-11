import clsx from 'clsx';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import UserAvatar from '~/components/ui/Avatar/UserAvatar';

import type { ProjectsProfileAvatarData } from '../details/types';

import 'react-circular-progressbar/dist/styles.css';

type UserLevelWithAvatarSize = '2xl' | '3xl' | 'lg' | 'xl';

type Props = Readonly<{
  className?: string;
  /**
   * Current level as a number
   */
  level: number;
  profile?: ProjectsProfileAvatarData | null;
  /**
   * Progress to next level in percent
   */
  progress: number;
  size?: UserLevelWithAvatarSize;
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
  '3xl': {
    innerSize: 'h-[86px] w-[86px]',
    outerSize: 'h-24 w-24',
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
  profile,
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
        <UserAvatar className={innerSize} profile={profile} size="custom" />
      </CircularProgressbarWithChildren>
      <div
        className={clsx(
          'bg-success text-2xs absolute bottom-0 end-0 flex h-4 w-4 items-center justify-center rounded-full font-bold text-white',
          {
            'w-[30px] h-[30px] text-base': size === '3xl',
          },
        )}>
        {level}
      </div>
    </div>
  );
}
