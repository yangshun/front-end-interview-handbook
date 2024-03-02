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
