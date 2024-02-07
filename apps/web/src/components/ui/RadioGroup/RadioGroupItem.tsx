import clsx from 'clsx';
import { useId } from 'react';

import { themeBorderElementColor } from '../theme';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';

export type RadioGroupItemProps<T extends string> = Readonly<{
  label: string;
  value: T;
}>;

export default function RadioGroupItem<T extends string>({
  label,
  value,
}: RadioGroupItemProps<T>) {
  const id = useId();

  return (
    <div key={value} className="flex items-center gap-2 py-1">
      <RadixRadioGroup.Item
        className={clsx(
          'size-5 rounded-full border',
          themeBorderElementColor,
          'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
        )}
        id={id}
        value={value}>
        <RadixRadioGroup.Indicator className="after:bg-brand-dark dark:after:bg-brand flex size-full items-center justify-center after:h-3 after:w-3 after:rounded-full" />
      </RadixRadioGroup.Item>
      <label className="cursor-pointer text-sm" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
