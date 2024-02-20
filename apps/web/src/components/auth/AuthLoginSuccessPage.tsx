'use client';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import useAuthFullPageRedirectAfterLogin from '~/hooks/user/useAuthFullPageRedirectAfterLogIn';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthLoginSuccessPage({ next }: Props) {
  const intl = useIntl();

  useAuthFullPageRedirectAfterLogin(next);

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
        className="mt-4 text-center md:mt-6"
        color="secondary"
        display="block"
        size="body2">
        Redirecting you...
      </Text>
      <img
        alt="Email envelope illustration"
        className="mx-auto mt-16 block max-w-80"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
