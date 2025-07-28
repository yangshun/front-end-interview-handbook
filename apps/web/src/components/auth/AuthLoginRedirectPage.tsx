'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import useAuthFullPageRedirectAfterLogin from '~/hooks/user/useAuthFullPageRedirectAfterLogIn';

import LogoComboMark from '~/components/global/logos/LogoComboMark';
import { useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

import AuthLoginError from './AuthLoginError';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthLoginRedirectPage({ next }: Props) {
  const intl = useIntl();
  const user = useUser();

  useAuthFullPageRedirectAfterLogin(next);

  const [errorData, setErrorData] = useState<{
    code?: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const error = params.get('error');

    if (error) {
      setErrorData({
        code: params.get('error_code') || undefined,
        description: params.get('error_description') || undefined,
      });
      logEvent('auth.login.fail', {
        code: params.get('error_code') || undefined,
        description: params.get('error_description') || undefined,
        error: params.get('error'),
        namespace: 'auth',
      });

      return;
    }

    logEvent('auth.login.success', {
      namespace: 'auth',
    });
  }, [user]);

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
          <AuthLoginError {...errorData} />
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
