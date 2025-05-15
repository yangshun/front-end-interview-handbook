import clsx from 'clsx';
import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { forwardRef, useEffect, useId, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { themeBorderElementColor } from '~/components/ui/theme';

import type { TextSize } from '../Text';
import Text, { textVariants } from '../Text';

type CheckboxSize = 'md' | 'sm';
type CheckboxValue = boolean | 'indeterminate';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'name'
>;

type BaseProps = Readonly<{
  className?: string;
  defaultValue?: boolean;
  description?: string;
  errorMessage?: string;
  onChange?: (
    value: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => undefined | void;
  size?: CheckboxSize;
  value?: CheckboxValue;
}>;

type OwnProps =
  | (BaseProps &
      Readonly<{
        'aria-label': string;
        isLabelHidden: true;
      }>)
  | (BaseProps &
      Readonly<{
        'aria-label'?: string;
        isLabelHidden?: false;
        label: ReactNode;
      }>);

type Props = OwnProps & Readonly<Attributes>;

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
    'aria-label': ariaLabel,
    className,
    defaultValue,
    description,
    disabled = false,
    errorMessage,
    isLabelHidden = false,
    name,
    onChange,
    size = 'md',
    value,
    ...props
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
    <div className={clsx('relative flex', className)}>
      <div className="flex h-5 items-center">
        <input
          ref={mergedRef}
          aria-describedby={description != null ? descriptionId : undefined}
          aria-label={ariaLabel}
          checked={value === true}
          className={clsx(
            'size-4',
            'rounded',
            'fill-neutral-300 dark:fill-neutral-700',
            'text-neutral-900 dark:text-neutral-100',
            'bg-transparent',
            themeBorderElementColor,
            // Important! needed to override hover styles.
            [
              'disabled:!bg-neutral-300 dark:disabled:!bg-neutral-700',
              'disabled:cursor-not-allowed',
            ],
            [
              'focus:ring-transparent focus:ring-offset-transparent',
              'focus:outline-neutral-700 dark:focus:outline-neutral-300',
            ],
            !disabled && 'cursor-pointer',
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
      {!isLabelHidden && 'label' in props && (
        <div
          className={clsx(
            'grid gap-1',
            checkboxSizeClasses[size],
            topMarginVariants[size],
          )}>
          <label
            className={clsx(
              textVariants({
                className: 'block',
                color: disabled ? 'disabled' : 'secondary',
                size: textSizeVariants[size],
              }),
              !disabled && 'cursor-pointer',
            )}
            htmlFor={id}>
            {props.label}
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
      )}
    </div>
  );
}

export default forwardRef(CheckboxInput);
