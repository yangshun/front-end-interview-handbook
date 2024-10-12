import clsx from 'clsx';

export const tooltipContentClassName = clsx(
  'select-none',
  'rounded',
  'z-tooltip',
  'max-w-64',
  'hyphens-auto',
  'z-popover',
  'animate-in data-[state=closed]:animate-out',
  'fade-in-0 data-[state=closed]:fade-out-0',
  'zoom-in-95 data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
);
