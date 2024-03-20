'use client';

import clsx from 'clsx';
import { FaCircleUser } from 'react-icons/fa6';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

type AvatarSize = '3xl' | 'custom' | 'lg' | 'sm' | 'xs';

const sizeClasses: Record<AvatarSize, string> = {
  '3xl': 'size-20',
  custom: '',
  lg: 'size-10',
  sm: 'size-8',
  xs: 'size-6',
};

type Props = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> &
  Readonly<{
    alt: string;
    className?: string;
    size?: AvatarSize;
    src?: string | null;
  }>;

export default function Avatar({
  src,
  alt,
  className,
  size = 'sm',
  ...props
}: Props) {
  const emptyAvatar = (
    <div
      className={clsx(
        'size-full overflow-hidden',
        'bg-neutral-400 dark:bg-neutral-600',
        className,
      )}>
      <FaCircleUser
        className={clsx('size-full', 'text-neutral-50 dark:text-neutral-800')}
      />
    </div>
  );

  return (
    <AvatarPrimitive.Root
      className={clsx(
        'inline-flex shrink-0 items-center justify-center',
        'select-none overflow-hidden rounded-full',
        sizeClasses[size],
        className,
      )}>
      <AvatarPrimitive.Image
        alt={alt}
        className="size-full object-cover"
        src={src ?? undefined}
        {...props}
      />
      <AvatarPrimitive.Fallback
        asChild={true}
        className={clsx(
          'size-full flex items-center justify-center rounded-full',
        )}
        delayMs={600}>
        {emptyAvatar}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
