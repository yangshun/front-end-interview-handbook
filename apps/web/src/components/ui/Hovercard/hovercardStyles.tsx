import clsx from 'clsx';

import { themeBackgroundLayerEmphasized } from '../theme';

export const hovercardContentClassName = clsx(
  'p-4',
  'rounded-lg',
  'shadow-lg',
  themeBackgroundLayerEmphasized,
  'text-sm',
  'z-popover',
);
