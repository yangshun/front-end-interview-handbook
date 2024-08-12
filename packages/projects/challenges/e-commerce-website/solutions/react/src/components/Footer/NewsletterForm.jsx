import { useState } from 'react';

import Button from 'src/components/ui/Button';
import TextInput from 'src/components/ui/TextInput';

import { useToast } from 'src/context/ToastContext';

const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

const NewsletterForm = () => {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async event => {
    event.preventDefault();

    if (!email.match(EMAIL_REGEX)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    } else if (!email) {
      setErrorMessage('Email address is required.');
      return;
    } else {
      setErrorMessage('');
    }

    setSubmitting(true);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
      }), // Send the data in JSON format
    };

    // Make the request
    const res = await fetch(
      'https://www.greatfrontend.com/api/projects/challenges/newsletter',
      requestOptions
    );
    const result = await res.json();

    if (result) {
      setEmail('');
      if (result.message) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(result.error);
      }
    }
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row gap-4 w-full">
      <TextInput
        placeholder="Enter your email"
        errorMessage={errorMessage}
        onChange={value => setEmail(value)}
        value={email}
        required
      />
      <Button label="Subscribe" type="submit" isDisabled={submitting} />
    </form>
  );
};

export default NewsletterForm;
