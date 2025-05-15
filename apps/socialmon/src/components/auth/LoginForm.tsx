'use client';

import { Button } from '@mantine/core';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import type { FormEvent } from 'react';
import { RiGoogleFill } from 'react-icons/ri';

export default function LoginForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('google');
  };

  return (
    <form
      className={clsx(
        'rounded-md',
        'flex flex-col items-center justify-center gap-16',
      )}
      onSubmit={handleSubmit}>
      <h1 className="text-center text-4xl font-bold leading-9 tracking-tighter text-gray-900">
        SocialMon
      </h1>
      <div className="flex flex-col gap-6">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
          Sign in to your account
        </h2>
        <Button leftSection={<RiGoogleFill />} size="lg" type="submit">
          Continue with Google
        </Button>
      </div>
    </form>
  );
}
