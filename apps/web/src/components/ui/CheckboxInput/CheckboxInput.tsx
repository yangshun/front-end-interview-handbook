import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import type { ForwardedRef } from 'react';
import { forwardRef, useId } from 'react';

import type { TextVariant } from '../Text';
import Text from '../Text';

type CheckboxSize = 'md' | 'sm';

type Props = Readonly<{
  defaultValue?: boolean;
  description?: string;
  disabled?: boolean;
  errorMessage?: string;
  label: string;
  name?: string;
  onChange?: (
    value: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => undefined | void;
  size?: CheckboxSize;
  value?: boolean;
}>;

const checkboxSizeClasses: Record<CheckboxSize, string> = {
  md: 'ml-3',
  sm: 'ml-2',
};

const textSizeVariants: Record<CheckboxSize, TextVariant> = {
  md: 'body2',
  sm: 'body3',
};

function CheckboxInput(
  {
    defaultValue,
    description,
    disabled = false,
    errorMessage,
    label,
    name,
    size = 'md',
    value,
    onChange,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const id = useId();
  const descriptionId = useId();
  const errorId = useId();

  return (
    <div>
      <div
        className={clsx(
          'relative flex',
          // Vertically center only when there's only the label to render.
          description == null && errorMessage == null && 'items-center',
        )}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            aria-describedby={description != null ? descriptionId : undefined}
            checked={value}
            className={clsx(
              'h-4 w-4',
              'rounded',
              'text-brand-600 dark:text-brand-400',
              'border-slate-200 dark:border-slate-800',
              'disabled:bg-slate-20 dark:disabled:bg-slate-800',
              'focus:ring-brand-500',
            )}
            defaultChecked={defaultValue}
            disabled={disabled}
            id={id}
            name={name}
            type="checkbox"
            onChange={(event) => {
              if (!onChange) {
                return;
              }

              onChange(event.target.checked, event);
            }}
          />
        </div>
        <div className={clsx('grid gap-1', checkboxSizeClasses[size])}>
          <label className={clsx('block')} htmlFor={id}>
            <Text
              color={disabled ? 'disabled' : 'default'}
              display="block"
              variant={textSizeVariants[size]}>
              {label}
            </Text>
          </label>
          {description && (
            <Text
              color={disabled ? 'disabled' : 'secondary'}
              display="block"
              variant="body3">
              {description}
            </Text>
          )}
          {errorMessage && (
            <Text color="error" display="block" id={errorId} variant="body3">
              {errorMessage}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(CheckboxInput);
