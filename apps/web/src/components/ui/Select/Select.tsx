import clsx from 'clsx';
import { useId } from 'react';

import type { TextVariant } from '../Text';
import Text from '../Text';

export type SelectItem<T> = Readonly<{
  label: string;
  value: T;
}>;

export type SelectDisplay = 'block' | 'inline';
type SelectSize = 'md' | 'sm';

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
    option: 'sm:text-sm',
  },
  sm: {
    label: 'body3',
    option: 'sm:text-xs',
  },
};

const heightClasses: Record<SelectSize, string> = {
  md: 'h-9',
  sm: 'h-8',
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
        className={clsx(
          'mb-2 block text-slate-700',
          isLabelHidden && 'sr-only',
        )}
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
          'flex items-center',
          'rounded border-slate-200',
          'focus:border-brand-500 focus:ring-brand-500 focus:outline-none',
          heightClasses[size],
          // PaddingSizeClasses[size],
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
