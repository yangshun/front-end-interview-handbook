import { useId } from 'react';
import clsx from 'clsx';

const CheckboxInput = ({ value, defaultValue, disabled, label, onChange }) => {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-6 items-center justify-center">
        <input
          checked={value}
          className={clsx(
            'size-4',
            'rounded',
            'text-indigo-600',
            'border border-neutral-300',
            'bg-transparent',
            ['disabled:!bg-neutral-200', 'disabled:cursor-not-allowed'],
            'focus:ring-4 focus:ring-offset-0 focus:ring-indigo-600/[.12] focus:outline-none focus:border-indigo-600'
          )}
          defaultChecked={defaultValue}
          disabled={disabled}
          id={id}
          type="checkbox"
          onChange={event => {
            if (!onChange) {
              return;
            }

            onChange(event.target.checked, event);
          }}
        />
      </div>
      <label
        htmlFor={id}
        className={clsx(
          'block',
          disabled ? 'text-neutral-400' : 'text-neutral-600'
        )}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
