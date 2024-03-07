'use client';

import clsx from 'clsx';

import EmptyAvatarIcon from '~/components/common/EmptyAvatarIcon';

import * as RadixAvatar from '@radix-ui/react-avatar';

type AvatarSize = 'custom' | 'lg' | 'sm' | 'xs';

const sizeClasses: Record<AvatarSize, string> = {
  custom: '',
  lg: 'size-10',
  sm: 'size-8',
  xs: 'size-5',
};

type Props = Readonly<{
  alt: string;
  className?: string;
  size?: AvatarSize;
  src: string;
}>;

export default function Avatar({ src, alt, className, size = 'sm' }: Props) {
  return (
    <RadixAvatar.Root
      className={clsx('block rounded-full', sizeClasses[size], className)}>
      <RadixAvatar.Image
        alt={alt}
        className="size-full rounded-[inherit] object-cover"
        src={src}
      />
      <RadixAvatar.Fallback
        asChild={true}
        className={clsx(
          'size-full flex items-center justify-center rounded-full',
        )}
        delayMs={600}>
        <EmptyAvatarIcon />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
