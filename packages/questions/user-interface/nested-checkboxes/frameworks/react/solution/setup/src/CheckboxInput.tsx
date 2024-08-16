import {
  InputHTMLAttributes,
  useEffect,
  useId,
  useRef,
} from 'react';

export type CheckboxValue = boolean | 'indeterminate';

export default function CheckboxInput({
  checked,
  label,
  ...props
}: Readonly<{
  checked: CheckboxValue;
  label: string;
}> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>) {
  const id = useId();
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.indeterminate = checked === 'indeterminate';
  }, [checked]);

  return (
    <div className="checkbox">
      <input
        id={id}
        ref={ref}
        type="checkbox"
        checked={
          checked === true || checked === false
            ? checked
            : false
        }
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
