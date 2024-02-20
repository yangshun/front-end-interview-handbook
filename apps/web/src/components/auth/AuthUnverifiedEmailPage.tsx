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
      variant="xl">
      <Heading className="text-center" level="heading5">
        Looks like you haven't verified your email
      </Heading>
      <Text
        className="mt-4 text-center md:mt-6"
        color="secondary"
        display="block"
        size="body2">
        {/* TODO(auth): Update the message because doesn't make sense when no email is automatically sent. */}
        Please check your inbox for the verification email we've sent you.
        Simply click on the "Verify" button within the email to confirm your
        email address.
      </Text>
      <div className="mt-4 text-center">
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
        className="mx-auto mt-16 block max-w-80"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
