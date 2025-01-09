'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';

import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthResendSignInConfirmation';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

import AuthEmailAsset from './AuthEmailAsset';

type Props = Readonly<{
  email: string;
  redirectTo: string;
}>;

export default function AuthVerificationSentPage({ email, redirectTo }: Props) {
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
        <div
          className={clsx(
            'flex items-center justify-center',
            'size-12',
            'bg-success dark:bg-success-light',
            'text-white dark:text-neutral-900',
            'rounded-full',
          )}>
          <FaCheck
            aria-hidden={true}
            className={clsx('size-[30px] shrink-0')}
          />
        </div>
        <div>
          <Heading className="text-center" level="heading4">
            We have sent a verification link to {email}
          </Heading>
          <Text
            className={clsx(
              'mt-4 block text-center md:mt-6',
              'text-sm sm:text-base',
            )}
            color="secondary"
            size="inherit">
            Didn't receive it?{' '}
            <Anchor
              className="whitespace-nowrap"
              href="#"
              onClick={() => {
                resendSignupConfirmationMutation.mutate({
                  email,
                  redirectTo,
                });
              }}>
              Send another verification email
            </Anchor>
            .
          </Text>
        </div>
        <AuthEmailAsset />
      </Container>
    </div>
  );
}
