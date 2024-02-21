'use client';

import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';

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

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild={true}>
        <img
          ref={ref}
          alt={alt}
          className={clsx(
            'mx-auto w-full max-w-lg',
            canExpand && 'cursor-zoom-in',
          )}
          onLoad={onLoad}
          {...props}
        />
      </Dialog.Trigger>
      {canExpand && (
        <Dialog.Portal>
          <Dialog.Overlay className="z-dialog-backdrop fixed inset-0 bg-neutral-500 bg-opacity-75 backdrop-blur-sm transition-opacity dark:bg-neutral-950/60" />
          <Dialog.Content
            className={clsx(
              'z-dialog fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto outline-none',
              // TODO: fix transition
              'transform transition-all',
              'data-[state=open]:duration-300 data-[state=open]:ease-out',
              'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
              'data-[state=closed]:translate-y-4 data-[state=open]:translate-y-0',
              'data-[state=closed]:sm:scale-95 data-[state=open]:sm:scale-100',
              'data-[state=closed]:sm:translate-y-0',
            )}>
            <Dialog.Close
              asChild={true}
              className="relative transform overflow-hidden sm:w-3/4">
              <img
                alt={alt}
                className="mx-auto max-h-screen max-w-full cursor-zoom-out"
                {...props}
              />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}
