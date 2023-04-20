'use client';

import type { ComponentProps } from 'react';
import { useState } from 'react';

import { Dialog } from '@headlessui/react';

export default function MDXImage({ alt, ...props }: ComponentProps<'img'>) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <img
        alt={alt}
        className="mx-auto w-full max-w-lg cursor-zoom-in"
        onClick={() => setIsExpanded(true)}
        {...props}
      />
      {isExpanded && (
        <Dialog
          as="div"
          className="relative z-20"
          open={isExpanded}
          onClose={() => setIsExpanded(false)}>
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center sm:items-center">
              <Dialog.Panel className="relative w-3/4 transform overflow-hidden bg-white shadow-xl">
                <img
                  alt={alt}
                  className="mx-auto w-full cursor-zoom-out"
                  onClick={() => setIsExpanded(false)}
                  {...props}
                />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
