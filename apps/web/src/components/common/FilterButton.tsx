import clsx from 'clsx';

import type { Props as ButtonProps } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeTextBrandColor,
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
    'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
  ),
  tab: clsx(
    themeTextSubtleColor,
    'border-transparent',
    'bg-neutral-200 dark:bg-neutral-800',
    'hover:text-brand-dark dark:hover:text-brand',
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
        selected
          ? clsx(
              themeTextBrandColor,
              'border',
              'border-brand-dark dark:border-brand',
              'bg-brand-lightest dark:bg-neutral-800',
            )
          : purposeClasses[purpose],
        'focus-visible:outline-brand',
        className,
      )}
      variant="unstyled"
    />
  );
}
