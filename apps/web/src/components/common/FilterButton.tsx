import clsx from 'clsx';

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
  ),
  tab: clsx(
    themeTextSubtleColor,
    themeTextBrandColor_Hover,
    'border-transparent',
    'bg-neutral-200 dark:bg-neutral-800',
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
        themeBackgroundElementColor,
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementPressedStateColor_Active,
        selected
          ? clsx(
              themeTextBrandColor,
              ['border', themeBorderBrandColor],
              'bg-brand-lightest dark:bg-neutral-800',
            )
          : purposeClasses[purpose],
        themeOutlineElementBrandColor_FocusVisible,
        className,
      )}
      variant="unstyled"
    />
  );
}
