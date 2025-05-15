import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { useId } from 'react';

import {
  themeBorderElementColor,
  themeOutlineElementBrandColor_FocusVisible,
} from '../theme';

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
      <RadioGroupPrimitive.Item
        className={clsx(
          'size-5 rounded-full border',
          themeBorderElementColor,
          themeOutlineElementBrandColor_FocusVisible,
        )}
        id={id}
        value={value}>
        <RadioGroupPrimitive.Indicator
          className={clsx(
            'flex items-center justify-center',
            'size-full',
            'after:bg-neutral-900 dark:after:bg-neutral-100',
            'after:size-3 after:rounded-full',
          )}
        />
      </RadioGroupPrimitive.Item>
      <label className="cursor-pointer text-sm" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
