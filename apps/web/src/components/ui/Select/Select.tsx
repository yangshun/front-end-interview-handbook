import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef, useId } from 'react';

import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBackgroundInputColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type { TextSize } from '../Text';
import { textVariants } from '../Text';

export type SelectItem<T> = Readonly<{
  label: string;
  value: T;
}>;

export type SelectDisplay = 'block' | 'inline';
type SelectSize = 'md' | 'sm' | 'xs';
type SelectRounded = 'full' | 'normal';

type Props<T> = Readonly<{
  display?: SelectDisplay;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange: (value: T) => void;
  options: ReadonlyArray<SelectItem<T>>;
  rounded?: SelectRounded;
  size?: SelectSize;
  value?: T;
}>;

const textSizeClasses: Record<
  SelectSize,
  Readonly<{ label: TextSize; option: string }>
> = {
  md: {
    label: 'body2',
    option: 'text-sm',
  },
  sm: {
    label: 'body3',
    option: 'text-xs',
  },
  xs: {
    label: 'body3',
    option: 'text-xs',
  },
};

const heightClasses: Record<SelectSize, string> = {
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

const roundedClasses: Record<SelectRounded, string> = {
  full: 'rounded-full',
  normal: 'rounded',
};

function Select<T>(
  {
    display,
    isDisabled,
    isLabelHidden,
    label,
    name,
    onChange,
    options,
    rounded = 'full',
    size = 'md',
    value,
  }: Props<T>,
  ref?: ForwardedRef<HTMLSelectElement>,
) {
  const id = useId();

  return (
    <div>
      <label
        className={textVariants({
          className: clsx('mb-2 block', isLabelHidden && 'sr-only'),
          size: textSizeClasses[size].label,
          weight: 'medium',
        })}
        htmlFor={id}>
        {label}
      </label>
      <select
        ref={ref}
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'flex items-center py-0',
          roundedClasses[rounded],
          'transition-colors',
          'border-0',
          ['ring-1 ring-inset', 'ring-neutral-300 dark:ring-neutral-700'],
          themeTextSubtitleColor,
          themeBackgroundInputColor,
          themeBackgroundElementEmphasizedStateColor_Hover,
          themeBackgroundElementPressedStateColor_Active,
          [
            'disabled:bg-neutral-200 dark:disabled:bg-neutral-800',
            'disabled:text-neutral-300 dark:disabled:text-neutral-700',
            'disabled:cursor-not-allowed',
          ],
          [
            'focus:ring-2 focus:ring-inset',
            'focus:ring-neutral-700 dark:focus:ring-neutral-300',
          ],
          heightClasses[size],
          textSizeClasses[size].option,
        )}
        disabled={isDisabled}
        id={id}
        name={name ?? undefined}
        value={String(value)}
        onChange={(event) => {
          const selectedOption = options.find(
            ({ value: optionValue }) =>
              optionValue === String(event.target.value),
          );

          if (selectedOption != null) {
            onChange(selectedOption.value);
          }
        }}>
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option key={String(optionValue)} value={String(optionValue)}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select) as <T>(
  props: Props<T> & {
    ref?: ForwardedRef<HTMLSelectElement>;
  },
) => ReturnType<typeof Select>;
