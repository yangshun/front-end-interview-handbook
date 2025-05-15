import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

type DialogBaseOverlayPurpose = 'dialog' | 'slideout';

const zIndexClass: Record<DialogBaseOverlayPurpose, string> = {
  dialog: 'z-dialog-overlay',
  slideout: 'z-slideout-overlay',
};

type Props = Readonly<{
  purpose: DialogBaseOverlayPurpose;
}>;

const DialogBaseOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & Props
>(({ className, purpose, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={clsx(
      'fixed inset-0',
      'bg-white/80 dark:bg-neutral-950/80',
      'backdrop-blur-[2px]',
      zIndexClass[purpose],
      'overflow-y-auto overflow-x-hidden',
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
