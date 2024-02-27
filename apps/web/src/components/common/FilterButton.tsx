import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import type { Props as ButtonProps } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderBrandColor,
  themeBorderElementColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

type FilterButtonPurpose = 'button' | 'tab';

type Props = Omit<ButtonProps, 'variant'> &
  Readonly<{
    purpose: FilterButtonPurpose;
    selected?: boolean;
  }>;

const purposeClasses: Record<FilterButtonPurpose, string> = {
  button: clsx(
    themeBorderElementColor,
    'text-neutral-600 dark:text-neutral-200',
    themeBackgroundElementColor,
    themeBackgroundElementEmphasizedStateColor_Hover,
    themeBackgroundElementPressedStateColor_Active,
    themeOutlineElementBrandColor_FocusVisible,
  ),
  tab: clsx(
    themeTextSubtleColor,
    themeTextBrandColor_Hover,
    'border-transparent',
    // This is needed so that the button is visible
    // in contrast to the page background because
    // this variant doesn't have a border.
    'bg-neutral-200 dark:bg-neutral-800',
    themeBackgroundElementEmphasizedStateColor_Hover,
    themeBackgroundElementPressedStateColor_Active,
    themeOutlineElementBrandColor_FocusVisible,
  ),
};

function FilterButton(
  { selected, className, purpose = 'button', ...props }: Props,
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
          : purposeClasses[purpose],

        className,
      )}
      variant="unstyled"
    />
  );
}

export default forwardRef(FilterButton);
