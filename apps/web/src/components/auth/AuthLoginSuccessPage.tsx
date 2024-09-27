'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import useAuthFullPageRedirectAfterLogin from '~/hooks/user/useAuthFullPageRedirectAfterLogIn';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthLoginSuccessPage({ next }: Props) {
  const intl = useIntl();

  useAuthFullPageRedirectAfterLogin(next);

  useEffect(() => {
    logEvent('auth.login_success', {
      namespace: 'auth',
    });
  }, []);

  return (
    <Container
      className={clsx('flex flex-col', 'py-8 md:py-12 lg:py-16')}
      variant="xl">
      <Heading className="text-center" level="heading5">
        {intl.formatMessage({
          defaultMessage: 'Login successful',
          description: 'Title of login successful page',
          id: 'OKKVCO',
        })}
      </Heading>
      <Text
        className="mt-4 block text-center md:mt-6"
        color="secondary"
        size="body2">
        Redirecting you...
      </Text>
      <img
        alt="Email envelope illustration"
        className="max-w-80 mx-auto mt-16 block"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
