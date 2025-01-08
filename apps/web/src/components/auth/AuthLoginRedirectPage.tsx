'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

import useAuthFullPageRedirectAfterLogin from '~/hooks/user/useAuthFullPageRedirectAfterLogIn';

import LogoComboMark from '~/components/global/logos/LogoComboMark';
import { useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthLoginRedirectPage({ next }: Props) {
  const intl = useIntl();

  useAuthFullPageRedirectAfterLogin(next);

  useEffect(() => {
    logEvent('auth.login_success', {
      namespace: 'auth',
    });
  }, []);

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
            Redirecting you...
          </Text>
        </div>
      </Container>
    </div>
  );
}
