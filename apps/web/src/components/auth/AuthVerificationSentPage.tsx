'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';

import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthResendSignInConfirmation';

import { useIntl } from '~/components/intl';
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
  const intl = useIntl();
  const resendSignupConfirmationMutation = useAuthResendSignInConfirmation();

  return (
    <div
      className={clsx(
        'isolate size-full before:!-top-[180px]',
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
            {intl.formatMessage(
              {
                defaultMessage: 'We have sent a verification link to {email}',
                description: 'Email verification link sent',
                id: 'GxG3/D',
              },
              {
                email,
              },
            )}
          </Heading>
          <Text
            className={clsx(
              'mt-4 block text-center md:mt-6',
              'text-sm sm:text-base',
            )}
            color="secondary"
            size="inherit">
            {intl.formatMessage({
              defaultMessage: "Didn't receive it?",
              description: 'Email verification link not received',
              id: '8KrahL',
            })}{' '}
            <Anchor
              className="whitespace-nowrap"
              href="#"
              onClick={() => {
                resendSignupConfirmationMutation.mutate({
                  email,
                  redirectTo,
                });
              }}>
              {intl.formatMessage({
                defaultMessage: 'Send another verification email',
                description: 'Send another verification email',
                id: 'pz6Yny',
              })}
            </Anchor>
            .
          </Text>
        </div>
        <AuthEmailAsset />
      </Container>
    </div>
  );
}
