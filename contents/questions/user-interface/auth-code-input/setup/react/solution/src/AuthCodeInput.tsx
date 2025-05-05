import { useState } from 'react';
import InputDigit from './InputDigit';

const singleNumRegex = /^\d$/;
const numRegex = /^\d+$/;

export default function AuthCodeInput({
  length,
  isDisabled = false,
  onSubmit,
}: Readonly<{
  length: number;
  isDisabled: boolean;
  onSubmit: (code: string) => void;
}>) {
  const [code, setCode] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);

  function clampIndex(index: number) {
    if (index <= 0) {
      return 0;
    }

    if (index >= length) {
      return length - 1;
    }

    return index;
  }

  function onFocus(index: number) {
    setFocusedIndex(index);
  }

  function onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
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
      default: {
        const value = event.key;
        if (!singleNumRegex.test(value)) {
          return;
        }

        setCode(
          code.map((codeDigit, idx) =>
            index === idx ? String(value) : codeDigit,
          ),
        );
        setFocusedIndex(clampIndex(focusedIndex + 1));
        break;
      }
    }
  }

  function onPaste(
    event: React.ClipboardEvent<HTMLInputElement>,
  ) {
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

  function onReset() {
    setCode(Array(length).fill(''));
    setFocusedIndex(0);
  }

  const isSubmitEnabled = code.every((codeDigit) =>
    Boolean(codeDigit),
  );
  const isResetEnabled = code.some((codeDigit) =>
    Boolean(codeDigit),
  );

  return (
    <div className="wrapper">
      <form
        className="container"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(code.join(''));
        }}>
        <div className="flex-container">
          {code.map((codeDigit, index) => (
            <InputDigit
              key={index}
              value={codeDigit}
              isFocused={focusedIndex === index}
              disabled={isDisabled}
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
            Reset
          </button>
          <button
            type="submit"
            className="button button--primary"
            disabled={!isSubmitEnabled || isDisabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
