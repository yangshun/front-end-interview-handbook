'use client';

import clsx from 'clsx';
import { useMemo } from 'react';

import { themeElementBorderColor, themeTextSecondaryColor } from '../theme';

import * as RadixAvatar from '@radix-ui/react-avatar';

type AvatarSize = 'custom' | 'sm' | 'xs';

const sizeClasses: Record<AvatarSize, string> = {
  custom: '',
  sm: 'h-8 w-8',
  xs: 'h-5 w-5',
};

function getFallbackInitials(userName: string) {
  const words = userName.split(' ');

  if (words.length < 2) {
    return userName.slice(0, 2).toUpperCase();
  }

  const [firstName, secondName] = words;
  const firstInitial = firstName[0];
  const secondInitial = secondName[0];

  return `${firstInitial}${secondInitial}`.toUpperCase();
}

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
  const fallbackInitials = useMemo(() => {
    return getFallbackInitials(userName);
  }, [userName]);

  return (
    <RadixAvatar.Root
      className={clsx('rounded-full', sizeClasses[size], className)}>
      <RadixAvatar.Image
        alt={userName}
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
      />
      <RadixAvatar.Fallback
        className={clsx(
          'flex h-full w-full items-center justify-center rounded-full border',
          themeElementBorderColor,
          themeTextSecondaryColor,
        )}
        delayMs={600}>
        {fallbackInitials}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
