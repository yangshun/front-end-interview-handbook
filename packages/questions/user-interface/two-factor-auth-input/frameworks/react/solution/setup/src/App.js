import { useEffect, useRef, useState } from 'react';

const singleNumRegex = /^\d$/;
const numRegex = /^\d+$/;

function Input({
  value,
  isFocused,
  isDisabled,
  onChange,
  onFocus,
  onKeyDown,
  onPaste,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.setSelectionRange(
        0,
        inputRef.current.value.length,
      );
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
      disabled={isDisabled}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    />
  );
}

function AuthCodeInput({
  length,
  isDisabled = false,
  onSubmit,
}) {
  const [code, setCode] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);

  function clampIndex(index) {
    if (index <= 0) {
      return 0;
    }

    if (index >= length) {
      return length - 1;
    }

    return index;
  }

  function onChange(event, index) {
    const value = event.target.value;
    if (!singleNumRegex.test(value)) {
      return;
    }

    setCode(
      code.map((codeDigit, idx) =>
        index === idx ? String(value) : codeDigit,
      ),
    );
    setFocusedIndex(clampIndex(focusedIndex + 1));
  }

  function onFocus(index) {
    setFocusedIndex(index);
  }

  function onKeyDown(event, index) {
    switch (event.key) {
      case 'ArrowLeft':
        setFocusedIndex(clampIndex(focusedIndex - 1));
        break;
      case 'ArrowRight':
        setFocusedIndex(clampIndex(focusedIndex + 1));
        break;
      case 'Backspace':
        if (code[index]) {
          setCode(
            code.map((codeDigit, idx) =>
              index === idx ? '' : codeDigit,
            ),
          );
        } else if (index - 1 >= 0) {
          setCode(
            code.map((codeDigit, idx) =>
              index - 1 === idx ? '' : codeDigit,
            ),
          );
          setFocusedIndex(clampIndex(index - 1));
        }
        break;
      default:
        break;
    }
  }

  function onPaste(event) {
    event.preventDefault();
    const pastedCode = event.clipboardData.getData('text');

    if (!numRegex.test(pastedCode)) {
      return;
    }

    setCode(
      code.map(
        (codeDigit, idx) => pastedCode[idx] ?? codeDigit,
      ),
    );
    setFocusedIndex(clampIndex(pastedCode.length));
  }

  function onReset(event) {
    event.preventDefault();
    setCode(Array(length).fill(''));
    setFocusedIndex(0);
  }

  function onVerify(event) {
    event.preventDefault();
    onSubmit(code.join(''));
  }

  const isVerifyEnabled = code.every((codeDigit) =>
    Boolean(codeDigit),
  );
  const isResetEnabled = code.some((codeDigit) =>
    Boolean(codeDigit),
  );

  return (
    <form className="container">
      <div className="flex-container">
        {code.map((codeDigit, index) => (
          <Input
            key={index}
            value={codeDigit}
            isFocused={focusedIndex === index}
            isDisabled={isDisabled}
            onChange={(event) => onChange(event, index)}
            onFocus={() => onFocus(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            onPaste={onPaste}
          />
        ))}
      </div>
      <div className="flex-container">
        <button
          type="reset"
          className="button button--secondary"
          disabled={!isResetEnabled || isDisabled}
          onClick={onReset}>
          RESET
        </button>
        <button
          type="submit"
          className="button button--primary"
          disabled={!isVerifyEnabled || isDisabled}
          onClick={onVerify}>
          VERIFY
        </button>
      </div>
    </form>
  );
}

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(code) {
    setIsSubmitting(true);
    fetch(
      'https://www.greatfrontend.com/api/questions/two-factor-auth-input',
      {
        method: 'POST',
        body: JSON.stringify({ otp: code }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.text())
      .then((res) => alert(res))
      .catch(() =>
        alert(
          'Something went wrong. Please try again later.',
        ),
      )
      .finally(() => setIsSubmitting(false));
  }

  return (
    <AuthCodeInput
      length={6}
      onSubmit={onSubmit}
      isDisabled={isSubmitting}
    />
  );
}

export default App;
