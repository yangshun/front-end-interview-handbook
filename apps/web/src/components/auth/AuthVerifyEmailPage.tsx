'use client';

import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import { useToast } from '../global/toasts/ToastsProvider';
import Anchor from '../ui/Anchor';

type Props = Readonly<{
  email: string;
  redirectTo: string;
}>;

export default function AuthVerifyEmailPage({ email, redirectTo }: Props) {
  const resendSignupConfirmationMutation =
    trpc.auth.resendSignupConfirmation.useMutation();
  const { showToast } = useToast();

  return (
    <Container className={clsx('flex flex-col', 'py-16')} variant="xl">
      <Heading className="text-center" level="heading4">
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
            resendSignupConfirmationMutation.mutate(
              {
                email,
                redirectTo,
              },
              {
                onError: (data) => {
                  showToast({
                    title: data.message,
                    variant: 'danger',
                  });
                },
                onSuccess: () => {
                  showToast({
                    title: 'Check your email for the verification link',
                    variant: 'success',
                  });
                },
              },
            );
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
