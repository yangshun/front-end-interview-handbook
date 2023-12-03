'use client';

import clsx from 'clsx';
import { RiAccountCircleLine } from 'react-icons/ri';

import { themeElementBorderColor, themeTextSecondaryColor } from '../theme';

import * as RadixAvatar from '@radix-ui/react-avatar';

type AvatarSize = 'custom' | 'lg' | 'sm' | 'xs';

const sizeClasses: Record<AvatarSize, string> = {
  custom: '',
  lg: 'h-10 w-10',
  sm: 'h-8 w-8',
  xs: 'h-5 w-5',
};

type Props = Readonly<{
  className?: string;
  size?: AvatarSize;
  src: string;
  userName: string;
}>;

export default function Avatar({
  src,
  userName,
  className,
  size = 'sm',
}: Props) {
  return (
    <RadixAvatar.Root
      className={clsx('block rounded-full', sizeClasses[size], className)}>
      <RadixAvatar.Image
        alt={userName}
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
      />
      <RadixAvatar.Fallback
        asChild={true}
        className={clsx(
          'flex h-full w-full items-center justify-center rounded-full border',
          themeElementBorderColor,
          themeTextSecondaryColor,
        )}
        delayMs={600}>
        <RiAccountCircleLine />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
