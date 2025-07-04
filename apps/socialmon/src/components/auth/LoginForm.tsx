'use client';

import { Button, Text, Title } from '@mantine/core';
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
    <form className={clsx('flex items-center')} onSubmit={handleSubmit}>
      <Title order={1} size="h3">
        Socialmon
      </Title>
      <Text fz="xl" pl={16} pr={8}>
        /
      </Text>
      <Button leftSection={<RiGoogleFill />} type="submit" variant="subtle">
        Sign in with Google
      </Button>
    </form>
  );
}
