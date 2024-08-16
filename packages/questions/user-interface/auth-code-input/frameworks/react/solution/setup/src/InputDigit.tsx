import {
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';

export default function InputDigit({
  value,
  isFocused,
  ...props
}: Readonly<{
  value: number;
  isFocused: boolean;
}> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="input-box"
      maxLength={1}
      inputMode="numeric"
      autoComplete="one-time-code"
      value={value}
      {...props}
    />
  );
}
