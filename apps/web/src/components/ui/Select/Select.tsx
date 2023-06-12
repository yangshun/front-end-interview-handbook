import clsx from 'clsx';
import { useId } from 'react';

import type { TextVariant } from '../Text';
import Text from '../Text';

export type SelectItem<T> = Readonly<{
  label: string;
  value: T;
}>;

export type SelectDisplay = 'block' | 'inline';
type SelectSize = 'md' | 'sm' | 'xs';

type Props<T> = Readonly<{
  display?: SelectDisplay;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange: (value: T) => void;
  options: ReadonlyArray<SelectItem<T>>;
  size?: SelectSize;
  value: T;
}>;

const textSizeClasses: Record<
  SelectSize,
  Readonly<{ label: TextVariant; option: string }>
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

export default function Select<T>({
  display,
  label,
  isLabelHidden,
  name,
  options,
  size = 'md',
  value,
  onChange,
}: Props<T>) {
  const id = useId();

  return (
    <div>
      <label
        className={clsx('mb-2 block', isLabelHidden && 'sr-only')}
        htmlFor={id}>
        <Text
          display="block"
          variant={textSizeClasses[size].label}
          weight="medium">
          {label}
        </Text>
      </label>
      <select
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'flex items-center py-0',
          'rounded',
          'transition-colors',
          'border border-neutral-200 dark:border-neutral-800',
          'text-neutral-700 dark:text-neutral-300',
          'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-700',
          'focus:border-brand focus:outline-brand focus:outline-2 focus:outline-offset-2 focus:ring-0',
          heightClasses[size],
          textSizeClasses[size].option,
        )}
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
