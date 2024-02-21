'use client';

import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';

import DialogOverlay from '../ui/DialogOverlay/DialogOverlay';

import * as Dialog from '@radix-ui/react-dialog';

export default function MDXImage({ alt, ...props }: ComponentProps<'img'>) {
  const [canExpand, setCanExpand] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const onLoad = () => {
    if (ref.current && ref.current.naturalWidth > ref.current.width) {
      setCanExpand(true);
    }
  };

  useEffect(() => {
    if (ref.current?.complete) {
      onLoad();
    }
  }, [props.src]);

  const image = (
    <img
      ref={ref}
      alt={alt}
      className={clsx('mx-auto w-full max-w-lg', canExpand && 'cursor-zoom-in')}
      onLoad={onLoad}
      {...props}
    />
  );

  return !canExpand ? (
    image
  ) : (
    <Dialog.Root>
      <Dialog.Trigger asChild={true}>{image}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay purpose="dialog" />
        <Dialog.Content
          className={clsx(
            'fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4',
            'max-h-[80%] max-w-screen-lg',
            'z-dialog',
            'overflow-y-auto',
            'outline-none',
            'transform transition-all',
          )}>
          <Dialog.Close asChild={true}>
            <img
              alt={alt}
              className="inline-block h-full cursor-zoom-out object-contain"
              {...props}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
