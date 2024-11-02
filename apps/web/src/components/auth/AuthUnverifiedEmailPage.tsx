'use client';

import clsx from 'clsx';

import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthResendSignInConfirmation';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import Button from '../ui/Button';

type Props = Readonly<{
  email: string;
  redirectTo: string;
}>;

export default function AuthUnverifiedEmailPage({ email, redirectTo }: Props) {
  const resendSignupConfirmationMutation = useAuthResendSignInConfirmation();

  return (
    <Container
      className={clsx('flex flex-col', 'py-8 md:py-12 lg:py-16')}
      width="xl">
      <Heading className="text-center" level="heading5">
        Looks like you haven't verified your email address
      </Heading>
      <Text
        className="text-balance mt-4 block text-center md:mt-6"
        color="secondary"
        size="body2">
        Click the button below to receive an email containing a verification
        link.
      </Text>
      <div className="mt-4 text-center">
        <Button
          isDisabled={resendSignupConfirmationMutation.isLoading}
          isLoading={resendSignupConfirmationMutation.isLoading}
          label="Send verification email"
          variant="primary"
          onClick={() => {
            resendSignupConfirmationMutation.mutate({
              email,
              redirectTo,
            });
          }}
        />
      </div>
      <img
        alt="Email envelope illustration"
        className="max-w-80 mx-auto mt-16 block"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
