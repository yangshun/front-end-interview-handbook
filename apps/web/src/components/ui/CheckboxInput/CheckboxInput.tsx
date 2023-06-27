import clsx from 'clsx';
import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { forwardRef, useId } from 'react';

import type { TextSize } from '../Text';
import Text from '../Text';

type CheckboxSize = 'md' | 'sm';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'name'
>;

type Props = Readonly<{
  defaultValue?: boolean;
  description?: string;
  errorMessage?: string;
  label: ReactNode;
  onChange?: (
    value: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => undefined | void;
  size?: CheckboxSize;
  value?: boolean;
}> &
  Readonly<Attributes>;

const checkboxSizeClasses: Record<CheckboxSize, string> = {
  md: 'ml-3',
  sm: 'ml-2',
};

const textSizeVariants: Record<CheckboxSize, TextSize> = {
  md: 'body2',
  sm: 'body3',
};

const topMarginVariants: Record<CheckboxSize, string> = {
  md: '',
  sm: 'mt-0.5',
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
      <div className={clsx('relative flex')}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            aria-describedby={description != null ? descriptionId : undefined}
            checked={value}
            className={clsx(
              'h-4 w-4',
              'rounded',
              'text-brand-dark dark:text-brand',
              'bg-transparent',
              'border-neutral-200 dark:border-neutral-800',
              // Important! needed to override hover styles.
              [
                'disabled:!bg-neutral-200 dark:disabled:!bg-neutral-800',
                'disabled:cursor-not-allowed',
              ],
              [
                'focus:ring-transparent focus:ring-offset-transparent',
                'focus:outline-brand-dark dark:focus:outline-brand',
              ],
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
        <div
          className={clsx(
            'grid gap-1',
            checkboxSizeClasses[size],
            topMarginVariants[size],
          )}>
          <label className={clsx('block')} htmlFor={id}>
            <Text
              color={disabled ? 'disabled' : 'default'}
              display="block"
              size={textSizeVariants[size]}>
              {label}
            </Text>
          </label>
          {description && (
            <Text
              color={disabled ? 'disabled' : 'secondary'}
              display="block"
              size="body3">
              {description}
            </Text>
          )}
          {errorMessage && (
            <Text color="error" display="block" id={errorId} size="body3">
              {errorMessage}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(CheckboxInput);
