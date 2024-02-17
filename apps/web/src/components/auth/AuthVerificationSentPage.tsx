'use client';

import clsx from 'clsx';

import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthResendSignInConfirmation';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import Anchor from '../ui/Anchor';

type Props = Readonly<{
  email: string;
  redirectTo: string;
}>;

export default function AuthVerificationSentPage({ email, redirectTo }: Props) {
  const resendSignupConfirmationMutation = useAuthResendSignInConfirmation();

  return (
    <Container
      className={clsx('flex flex-col', 'py-8 md:py-12 lg:py-16')}
      variant="xl">
      <Heading className="text-center" level="heading5">
        We have sent a verification link to {email}
      </Heading>
      <Text
        className="mt-4 md:mt-6 text-center"
        color="secondary"
        display="block"
        size="body2">
        Didn't receive it? Send{' '}
        <Anchor
          className="whitespace-nowrap"
          href="#"
          onClick={() => {
            resendSignupConfirmationMutation.mutate({
              email,
              redirectTo,
            });
          }}>
          another verification email
        </Anchor>
        .
      </Text>
      <img
        alt="Email envelope illustration"
        className="block max-w-80 mx-auto mt-16"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
