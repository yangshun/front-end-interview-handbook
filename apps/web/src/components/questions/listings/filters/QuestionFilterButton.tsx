import clsx from 'clsx';

import type { Props as ButtonProps } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import {
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
    'border-neutral-300 dark:border-neutral-700',
    'text-neutral-600 dark:text-neutral-200',
    'bg-white dark:bg-neutral-950',
    'hover:bg-neutral-100 dark:hover:bg-neutral-900',
    'active:bg-neutral-200 dark:active:bg-neutral-800',
    'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
  ),
  tab: clsx(
    themeTextSubtleColor,
    'border-transparent',
    'bg-neutral-100 dark:bg-neutral-900',
    'hover:text-brand-dark dark:hover:text-brand',
  ),
};

export default function QuestionFilterButton({
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
