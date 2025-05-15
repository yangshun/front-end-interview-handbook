import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import type { Props as ButtonProps } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderBrandColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
} from '~/components/ui/theme';

type Props = Omit<ButtonProps, 'variant'> &
  Readonly<{
    selected?: boolean;
  }>;

function RoadmapProductFilterButton(
  { className, selected, ...props }: Props,
  ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      addonPosition="start"
      {...props}
      className={clsx(
        selected
          ? clsx(
              themeTextBrandColor,
              ['border', themeBorderBrandColor],
              'bg-brand-lightest dark:bg-neutral-800',
            )
          : clsx(
              'border-transparent text-neutral-500',
              themeBackgroundElementEmphasizedStateColor,
              themeBackgroundElementEmphasizedStateColor_Hover,
              themeBackgroundElementPressedStateColor_Active,
              themeOutlineElementBrandColor_FocusVisible,
            ),
        className,
      )}
      variant="unstyled"
    />
  );
}

export default forwardRef(RoadmapProductFilterButton);
