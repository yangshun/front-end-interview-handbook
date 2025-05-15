'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';

import Img from '~/components/ui/Img';

import DialogBaseOverlay from '../ui/Dialog/DialogBaseOverlay';

export default function MDXImage({
  ref: _ref, // TODO(ui): merge refs
  alt,
  ...props
}: ComponentProps<'img'>) {
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
    <Img
      ref={ref}
      alt={alt}
      className={clsx('mx-auto w-full max-w-lg', canExpand && 'cursor-zoom-in')}
      decoding="async"
      loading="lazy"
      onLoad={onLoad}
      {...props}
    />
  );

  return !canExpand ? (
    image
  ) : (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild={true}>{image}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogBaseOverlay purpose="dialog" />
        <DialogPrimitive.Content
          className={clsx(
            'fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4',
            'max-h-[80%] max-w-screen-lg',
            'z-dialog',
            'overflow-y-auto',
            'outline-none',
            'transform transition-all duration-200',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
            'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
            'data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2',
            'data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-top-[48%]',
          )}>
          <DialogPrimitive.Close asChild={true}>
            <Img
              alt={alt}
              className="inline-block h-full cursor-zoom-out object-contain"
              {...props}
            />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
