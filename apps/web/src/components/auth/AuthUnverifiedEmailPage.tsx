'use client';

import clsx from 'clsx';

import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthFns';

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
    <Container className={clsx('flex flex-col', 'py-16')} variant="2xl">
      <Heading className="text-center" level="heading5">
        Looks like you haven't verified your email
      </Heading>
      <Text
        className="mt-4 md:mt-6 text-center"
        color="secondary"
        display="block"
        size="body2">
        {/* TODO(auth): Update the message because doesn't make sense when no email is automatically sent. */}
        Please check your inbox for the verification email we've sent you.
        Simply click on the "Verify" button within the email to confirm your
        email address.
      </Text>
      <div className="text-center mt-4">
        <Button
          isDisabled={resendSignupConfirmationMutation.isLoading}
          isLoading={resendSignupConfirmationMutation.isLoading}
          label="Resend verification email"
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
        className="block max-w-80 mx-auto mt-16"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
