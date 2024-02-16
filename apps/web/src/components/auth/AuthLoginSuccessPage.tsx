'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthLoginSuccessPage({ next }: Props) {
  const intl = useIntl();
  const router = useI18nRouter();

  const user = useUser();

  useEffect(() => {
    if (user == null) {
      return;
    }

    router.push(next ?? '/');
  }, [next, router, user]);

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
