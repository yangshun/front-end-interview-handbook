import clsx from 'clsx';
import { useId } from 'react';

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
  onChange: (value: string) => void;
  options: ReadonlyArray<SelectItem<T>>;
  size?: SelectSize;
  value: T;
}>;

const textSizeClasses: Record<
  SelectSize,
  Readonly<{ label: string; option: string }>
> = {
  md: {
    label: 'text-sm',
    option: 'sm:text-sm',
  },
  sm: {
    label: 'text-xs',
    option: 'sm:text-xs',
  },
};

const paddingSizeClasses: Record<SelectSize, string> = {
  md: 'py-2 pl-3 pr-10 ',
  sm: 'py-1.5 pl-2 pr-10 ',
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
          'mb-1 block font-medium text-slate-700',
          textSizeClasses[size].label,
          isLabelHidden && 'sr-only',
        )}
        htmlFor={id ?? undefined}>
        {label}
      </label>
      <select
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'focus:border-brand-500 focus:ring-brand-500 rounded-md border-slate-200 focus:outline-none',
          paddingSizeClasses[size],
          textSizeClasses[size].label,
        )}
        id={id}
        name={name ?? undefined}
        value={String(value)}
        onChange={(event) => {
          onChange(event.target.value);
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
