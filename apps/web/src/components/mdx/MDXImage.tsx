'use client';

import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { Fragment, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

export default function MDXImage({ alt, ...props }: ComponentProps<'img'>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  return (
    <>
      <img
        ref={ref}
        alt={alt}
        className={clsx(
          'mx-auto w-full max-w-lg',
          canExpand && 'cursor-zoom-in',
        )}
        onClick={canExpand ? () => setIsExpanded(true) : undefined}
        onLoad={() => {
          if (ref.current && ref.current.naturalWidth > ref.current.width) {
            setCanExpand(true);
          }
        }}
        {...props}
      />
      <ExpandedImageDialog
        isExpanded={isExpanded}
        onClose={() => setIsExpanded(false)}>
        <img
          alt={alt}
          className="mx-auto max-h-screen max-w-full cursor-zoom-out"
          onClick={() => setIsExpanded(false)}
          {...props}
        />
      </ExpandedImageDialog>
    </>
  );
}

type Props = Readonly<{
  children: React.ReactNode;
  isExpanded?: boolean;
  onClose: () => void;
}>;

function ExpandedImageDialog({ children, isExpanded, onClose }: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root as={Fragment} show={isExpanded}>
      <Dialog
        className="relative z-30"
        initialFocus={cancelButtonRef}
        open={isExpanded}
        onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-90 translate-y-4 sm:translate-y-0 sm:scale-95"
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
