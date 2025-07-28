'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useAuthFullPageRedirectAfterLogin from '~/hooks/user/useAuthFullPageRedirectAfterLogIn';

import LogoComboMark from '~/components/global/logos/LogoComboMark';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeRadialWhiteGlowBackground,
  themeTextDangerColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthLoginRedirectPage({ next }: Props) {
  const intl = useIntl();
  const user = useUser();
  const { signInUpHref } = useAuthSignInUp();

  useAuthFullPageRedirectAfterLogin(next);

  const [errorData, setErrorData] = useState<{
    code?: string;
    description?: string;
  } | null>(null);
  const errorContent = useErrorMessage();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const error = params.get('error');

    if (!error || user) {
      logEvent('auth.login_success', {
        namespace: 'auth',
      });

      return;
    }

    setErrorData({
      code: params.get('error_code') || undefined,
      description: params.get('error_description') || undefined,
    });
  }, [user]);

  const { message: errorMessage, name: errorName } =
    errorContent[errorData?.code ?? ''] || {};

  return (
    <div
      className={clsx(
        'isolate before:!-top-[180px]',
        themeRadialWhiteGlowBackground,
      )}>
      <Container
        className={clsx(
          'size-full h-screen',
          'flex flex-col items-center gap-6 md:justify-center',
          'py-8 md:py-12 lg:py-16',
          'mt-32 md:mt-0',
        )}
        width="xl">
        {errorData && !user ? (
          <div className="flex max-w-sm flex-col items-center md:justify-center">
            <RiEmotionSadLine
              aria-hidden={true}
              className={clsx(themeTextDangerColor, 'size-12 shrink-0')}
            />
            <Heading className="mb-1 mt-6 text-center" level="heading4">
              {errorName ||
                intl.formatMessage({
                  defaultMessage: 'An error has occurred',
                  description: 'Error message title',
                  id: 'jCB415',
                })}
            </Heading>
            <Text
              className={clsx('block text-center', 'text-sm sm:text-base')}
              color="secondary"
              size="inherit">
              {errorMessage || errorData.description}
            </Text>
            <Button
              className="mt-4"
              href={signInUpHref()}
              label={intl.formatMessage({
                defaultMessage: 'Go back to sign in',
                description: 'Back to sign in page',
                id: '3qk61r',
              })}
              prefetch={null}
              variant="primary"
            />
          </div>
        ) : (
          <>
            <LogoComboMark className="shrink-0" height={20} />
            <div>
              <Heading className="text-center" level="heading5">
                {intl.formatMessage({
                  defaultMessage: 'Login successful',
                  description: 'Title of login successful page',
                  id: 'OKKVCO',
                })}
              </Heading>
              <Text
                className="mt-2 block text-center"
                color="secondary"
                size="body1"
                weight="medium">
                {intl.formatMessage({
                  defaultMessage: 'Redirecting you...',
                  description: 'Auth redirect message',
                  id: 'RJMyW6',
                })}
              </Text>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

function useErrorMessage(): Record<string, { message: string; name: string }> {
  const intl = useIntl();

  return {
    otp_expired: {
      message: intl.formatMessage({
        defaultMessage:
          'OTP code for this sign-in has expired. Please try to sign in again.',
        description: 'Error message for expired OTP',
        id: '27QHDj',
      }),
      name: intl.formatMessage({
        defaultMessage: 'OTP expired',
        description: 'Error name for expired OTP',
        id: '/JwmN3',
      }),
    },
  };
}
