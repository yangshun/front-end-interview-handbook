import clsx from 'clsx';
import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { forwardRef, useEffect, useId, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import {
  themeBorderElementColor,
  themeTextBrandColor,
} from '~/components/ui/theme';

import type { TextSize } from '../Text';
import Text, { textVariants } from '../Text';

type CheckboxSize = 'md' | 'sm';
type CheckboxValue = boolean | 'indeterminate';

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
  value?: CheckboxValue;
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
  const selfRef = useRef<HTMLInputElement | null>();

  const mergedRef = mergeRefs([ref, selfRef]);

  useEffect(() => {
    if (selfRef.current) {
      selfRef.current.indeterminate = value === 'indeterminate';
    }
  }, [selfRef, value]);

  return (
    <div>
      <div className={clsx('relative flex')}>
        <div className="flex h-5 items-center">
          <input
            ref={mergedRef}
            aria-describedby={description != null ? descriptionId : undefined}
            checked={value === true}
            className={clsx(
              'size-4',
              'rounded',
              'fill-neutral-950',
              themeTextBrandColor,
              'bg-transparent',
              themeBorderElementColor,
              // Important! needed to override hover styles.
              [
                'disabled:!bg-neutral-300 dark:disabled:!bg-neutral-700',
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
          <label
            className={textVariants({
              className: 'block',
              color: disabled ? 'disabled' : 'secondary',
              size: textSizeVariants[size],
            })}
            htmlFor={id}>
            {label}
          </label>
          {description && (
            <Text
              className="block"
              color={disabled ? 'disabled' : 'secondary'}
              size="body3">
              {description}
            </Text>
          )}
          {errorMessage && (
            <Text className="block" color="error" id={errorId} size="body3">
              {errorMessage}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(CheckboxInput);
