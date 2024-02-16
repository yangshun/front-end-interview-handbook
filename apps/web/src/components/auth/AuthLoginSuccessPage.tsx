'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthLoginSuccessPage({ next }: Props) {
  const intl = useIntl();

  const user = useUser();

  useEffect(() => {
    // TODO(auth): dedupe with AuthPage.
    // Only run effect when user is logged in.
    if (user == null) {
      return;
    }

    // The cookie is set on the client side, so race conditions can happen
    // where we redirect to a new page that checks for signed in status
    // on the server side but the cookie is not written yet.
    // Do a hard redirect to prevent race conditions.
    window.location.href = next ?? '/prepare';
  }, [next, user]);

  return (
    <Container className={clsx('flex flex-col', 'py-16')} variant="2xl">
      <Heading className="text-center" level="heading5">
        {intl.formatMessage({
          defaultMessage: 'Login successful',
          description: 'Title of login successful page',
          id: 'OKKVCO',
        })}
      </Heading>
      <Text
        className="mt-4 md:mt-6 text-center"
        color="secondary"
        display="block"
        size="body2">
        Redirecting you...
      </Text>
      <img
        alt="Email envelope illustration"
        className="block max-w-80 mx-auto mt-16"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
