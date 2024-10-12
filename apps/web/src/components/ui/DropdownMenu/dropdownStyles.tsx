import clsx from 'clsx';

import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderElementColor,
} from '../theme';

export const dropdownContentClassName = clsx(
  'flex flex-col gap-1',
  'p-2',
  'min-w-52',
  'rounded-lg',
  'shadow-lg',
  themeBackgroundColor,
  ['border', themeBorderElementColor],
  'z-dropdown',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
);

export const dropdownContentItemClassName = clsx(
  'flex grow items-center',
  'px-2 py-1.5',
  'w-full text-left',
  'rounded',
  'select-none outline-none',
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementEmphasizedStateColor_Focus,
);
