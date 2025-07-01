'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { FaCircleUser } from 'react-icons/fa6';

import Img from '~/components/ui/Img';

import { cdnUrl } from '~/utils/cdnUrl';

import type { AvatarVariantProps } from './AvatarStyles';
import { avatarVariants } from './AvatarStyles';

type Props = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> &
  Readonly<{
    alt: string;
    className?: string;
    size?: AvatarVariantProps['size'];
    src?: string | null;
  }>;

function Avatar(
  { alt, className, size, src: srcParam, ...props }: Props,
  ref: ForwardedRef<HTMLImageElement>,
) {
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

  const src = srcParam?.startsWith('/') ? cdnUrl(srcParam) : srcParam;

  return (
    <AvatarPrimitive.Root
      className={clsx(
        'inline-flex shrink-0 items-center justify-center',
        'select-none overflow-hidden rounded-full',
        avatarVariants({ size }),
        className,
      )}>
      <AvatarPrimitive.Image
        ref={ref}
        className="size-full object-cover"
        src={src ?? undefined}
        {...props}
        asChild={true}>
        <Img alt={alt} />
      </AvatarPrimitive.Image>
      <AvatarPrimitive.Fallback
        asChild={true}
        className={clsx(
          'flex size-full items-center justify-center rounded-full',
        )}
        delayMs={600}>
        {emptyAvatar}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export default forwardRef(Avatar);
