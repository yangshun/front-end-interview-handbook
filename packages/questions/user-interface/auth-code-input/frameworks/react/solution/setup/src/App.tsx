import { useState } from 'react';

import AuthCodeInput from './AuthCodeInput';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(code: string) {
    setIsSubmitting(true);
    fetch(
      'https://questions.greatfrontend.com/api/questions/auth-code-input',
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
