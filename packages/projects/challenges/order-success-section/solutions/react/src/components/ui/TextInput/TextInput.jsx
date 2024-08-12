import clsx from 'clsx';
import { useId } from 'react';

const TextInput = ({
  isLabelHidden,
  label,
  placeholder,
  value,
  onChange,
  type,
  id: idParam,
  required,
  isDisabled,
  errorMessage,
  hintMessage,
  startIcon: StartIcon,
  endIcon: EndIcon,
  startIconClassName,
  endIconClassName,
  className,
  ...props
}) => {
  const generateId = useId();
  const id = idParam ?? generateId;
  const hasError = !!errorMessage;

  const messageId = useId();

  const hasBottomSection = !!errorMessage || !!hintMessage;

  return (
    <div className={clsx('flex flex-col gap-1.5 w-full', 'relative')}>
      {label && (
        <label
          className={clsx(
            isLabelHidden ? 'sr-only' : 'text-sm font-medium text-neutral-700'
          )}
          htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        {StartIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <StartIcon
              aria-hidden="true"
              className={clsx('text-neutral-400', 'size-5', startIconClassName)}
            />
          </div>
        )}

        <input
          id={id}
          aria-describedby={hasError ? messageId : undefined}
          aria-invalid={hasError ? true : undefined}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange?.(event.target.value, event)}
          required={required}
          disabled={isDisabled}
          {...props}
          className={clsx(
            'block w-full',
            'py-[9px] px-[13px]',
            'outline:none',
            'border border-neutral-200 disabled:border-neutral-100',
            'bg-neutral-50',
            'rounded',
            'text-sm text-neutral-900 placeholder:text-neutral-500 disabled:text-neutral-400 disabled:placeholder:text-neutral-400',
            'focus:outline-none',
            'focus:ring-4 focus:ring-offset-0 focus:ring-indigo-600/[.12] focus:border-indigo-600',
            hasError && 'focus:ring-red-600/[.12] focus:border-red-600',
            'disabled:pointer-events-none',
            StartIcon && 'pl-[41px]',
            EndIcon && 'pr-[38px]',
            className
          )}
        />

        {EndIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
            <EndIcon
              aria-hidden="true"
              className={clsx('text-neutral-400', 'size-4', endIconClassName)}
            />
          </div>
        )}
      </div>

      {hasBottomSection && (
        <div
          id={messageId}
          className={clsx(
            'text-sm text-neutral-500',
            hasError && 'text-red-600'
          )}>
          {errorMessage || hintMessage}
        </div>
      )}
    </div>
  );
};

export default TextInput;
