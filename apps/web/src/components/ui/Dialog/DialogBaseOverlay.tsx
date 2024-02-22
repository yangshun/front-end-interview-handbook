import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import { Overlay } from '@radix-ui/react-dialog';

type DialogBaseOverlayPurpose = 'dialog' | 'slideout';

const overlayClass: Record<DialogBaseOverlayPurpose, string> = {
  dialog: 'z-dialog-overlay',
  slideout: 'z-slideout-overlay',
};

type Props = Readonly<{
  purpose: DialogBaseOverlayPurpose;
}>;

const DialogBaseOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay> & Props
>(({ className, purpose, ...props }, ref) => (
  <Overlay
    className={clsx(
      'fixed inset-0',
      ['bg-neutral-950/60 bg-opacity-75', 'backdrop-blur-sm'],
      overlayClass[purpose],
      [
        'transition-opacity',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
      ],
      className,
    )}
    {...props}
    ref={ref}
  />
));

export default DialogBaseOverlay;
