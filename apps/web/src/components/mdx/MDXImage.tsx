'use client';

import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

export default function MDXImage({ alt, ...props }: ComponentProps<'img'>) {
  const [isShown, setIsShown] = useState(false);
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
    <>
      <img
        ref={ref}
        alt={alt}
        className={clsx(
          'mx-auto w-full max-w-lg',
          canExpand && 'cursor-zoom-in',
        )}
        onClick={canExpand ? () => setIsShown(true) : undefined}
        onLoad={onLoad}
        {...props}
      />
      <ExpandedImageDialog isShown={isShown} onClose={() => setIsShown(false)}>
        <img
          alt={alt}
          className="mx-auto max-h-screen max-w-full cursor-zoom-out"
          onClick={() => setIsShown(false)}
          {...props}
        />
      </ExpandedImageDialog>
    </>
  );
}

type Props = Readonly<{
  children: React.ReactNode;
  isShown?: boolean;
  onClose: () => void;
}>;

function ExpandedImageDialog({ children, isShown, onClose }: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root as={Fragment} show={isShown}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 backdrop-blur-sm transition-opacity dark:bg-neutral-950/60" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden sm:w-3/4">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
