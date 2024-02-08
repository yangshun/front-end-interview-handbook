import clsx from 'clsx';

import type { Props as ButtonProps } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import {
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
  ),
  tab: clsx(
    themeTextSubtleColor,
    themeTextBrandColor_Hover,
    'border-transparent',
  ),
};

export default function FilterButton({
  selected,
  className,
  purpose = 'button',
  ...props
}: Props) {
  return (
    <Button
      {...props}
      addonPosition="start"
      className={clsx(
        // This is needed so that the button is visible
        // in contrast to the page background because
        // the default state doesn't have a border.
        'bg-neutral-200 dark:bg-neutral-800',
        selected
          ? clsx(
              themeTextBrandColor,
              ['border', themeBorderBrandColor],
              'bg-brand-lightest dark:bg-neutral-800',
            )
          : purposeClasses[purpose],
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementPressedStateColor_Active,
        themeOutlineElementBrandColor_FocusVisible,
        className,
      )}
      variant="unstyled"
    />
  );
}
