'use client';

import clsx from 'clsx';

import * as RadixAvatar from '@radix-ui/react-avatar';

type AvatarSize = 'sm' | 'xs';

const sizeClasses: Record<AvatarSize, string> = {
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
      className={clsx('rounded-full', sizeClasses[size], className)}>
      <RadixAvatar.Image
        alt={userName}
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
      />
      <RadixAvatar.Fallback delayMs={600}>CT</RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
