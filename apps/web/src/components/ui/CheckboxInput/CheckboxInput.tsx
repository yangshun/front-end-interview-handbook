import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import type { ForwardedRef } from 'react';
import { forwardRef, useId } from 'react';

import Text from '../Text';

type CheckboxSize = 'sm' | 'xs';

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
  sm: 'ml-3 text-sm',
  xs: 'ml-2 text-xs',
};

function CheckboxInput(
  {
    defaultValue,
    description,
    disabled = false,
    errorMessage,
    label,
    name,
    size = 'sm',
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
          // Vertically center only when there's no description.
          description == null && 'items-center',
        )}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            aria-describedby={description != null ? descriptionId : undefined}
            checked={value}
            className={clsx(
              'h-4 w-4 rounded border-slate-200',
              disabled
                ? 'bg-slate-50 text-slate-400'
                : 'text-brand-600 focus:ring-brand-500',
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
        <div className={checkboxSizeClasses[size]}>
          <label
            className={clsx(
              'block font-medium',
              disabled ? 'text-slate-400' : 'text-slate-700',
            )}
            htmlFor={id}>
            {label}
          </label>
          {description && (
            <p
              className={clsx(
                'text-xs',
                disabled ? 'text-slate-400' : 'text-slate-500',
              )}
              id={descriptionId}>
              {description}
            </p>
          )}
        </div>
      </div>
      {errorMessage && (
        <Text
          className="mt-2"
          color="error"
          display="block"
          id={errorId}
          variant="body2">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default forwardRef(CheckboxInput);
