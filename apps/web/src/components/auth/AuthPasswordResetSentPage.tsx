'use client';

import clsx from 'clsx';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';

import Anchor from '../ui/Anchor';
import Text from '../ui/Text';

type Props = Readonly<{
  next: string;
}>;

export default function AuthPasswordResetSentPage({ next }: Props) {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <Container
      className={clsx('flex flex-col', 'py-8 md:py-12 lg:py-16')}
      variant="xl">
      <Heading className="text-center" level="heading5">
        {intl.formatMessage({
          defaultMessage:
            'An email containing the password reset instructions will be sent if an associated account exists',
          description: 'Message indicating a successful password reset request',
          id: 'Q0sZmk',
        })}
      </Heading>
      <div className="mt-4 text-center">
        <Text size="body2">
          <Anchor
            href={signInUpHref({
              next,
            })}
            prefetch={null}>
            Go back to sign in
          </Anchor>
        </Text>
      </div>
      <img
        alt="Email envelope illustration"
        className="max-w-80 mx-auto mt-16 block"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
