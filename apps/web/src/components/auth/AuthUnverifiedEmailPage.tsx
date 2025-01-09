'use client';

import clsx from 'clsx';

import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthResendSignInConfirmation';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

import AuthEmailAsset from './AuthEmailAsset';

type Props = Readonly<{
  email: string;
  redirectTo: string;
}>;

export default function AuthUnverifiedEmailPage({ email, redirectTo }: Props) {
  const resendSignupConfirmationMutation = useAuthResendSignInConfirmation();

  return (
    <div
      className={clsx(
        'size-full isolate before:!-top-[180px]',
        themeRadialWhiteGlowBackground,
      )}>
      <Container
        className={clsx(
          'flex flex-col items-center gap-10',
          'py-8 md:py-12 lg:py-16',
        )}
        width="xl">
        <Heading className="text-center" level="heading4">
          Looks like you haven't verified your email address
        </Heading>
        <div>
          <Text
            className={clsx(
              'text-balance mt-4 block text-center md:mt-6',
              'text-sm sm:text-base',
            )}
            color="secondary"
            size="inherit">
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
        </div>
        <AuthEmailAsset />
      </Container>
    </div>
  );
}
