import clsx from 'clsx';

import {
  themeBackgroundColor,
  themeTextBrandColor_Hover,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export const tilesPanelTabClasses = {
  button: 'flex items-center gap-x-1.5 whitespace-nowrap text-xs',
  closeButton: (isActive: boolean) =>
    clsx(
      'z-20 ml-1 rounded p-0.5 text-neutral-500',
      'hover:bg-neutral-200 dark:hover:bg-neutral-700',
      !isActive && 'opacity-0 focus:opacity-100 group-hover:opacity-100',
    ),
  container: (isActive: boolean, isOver: boolean, closeable: boolean) =>
    clsx(
      'group relative isolate flex grow items-center gap-x-0.5 rounded font-medium',
      isOver && 'bg-neutral-100 dark:bg-neutral-800',
      isActive
        ? themeTextColor
        : [themeTextSecondaryColor, themeTextBrandColor_Hover],
      closeable ? 'pl-2' : 'px-2',
    ),
};

export const tilesPanelItemClass = clsx(
  'rounded-[4px]',
  themeBackgroundColor,
  'border dark:border-neutral-900 border-neutral-200',
);
