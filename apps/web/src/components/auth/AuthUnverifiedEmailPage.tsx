'use client';

import clsx from 'clsx';

import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthResendSignInConfirmation';

import { useIntl } from '~/components/intl';
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
        <Heading className="text-center" level="heading4">
          {intl.formatMessage({
            defaultMessage:
              "Looks like you haven't verified your email address",
            description: 'Unverified email message',
            id: 'Laxim6',
          })}
        </Heading>
        <div>
          <Text
            className={clsx(
              'mt-4 block text-balance text-center md:mt-6',
              'text-sm sm:text-base',
            )}
            color="secondary"
            size="inherit">
            {intl.formatMessage({
              defaultMessage:
                'Click the button below to receive an email containing a verification link.',
              description: 'Receive verification link instruction',
              id: 'UOebIi',
            })}
          </Text>
          <div className="mt-4 text-center">
            <Button
              isDisabled={resendSignupConfirmationMutation.isLoading}
              isLoading={resendSignupConfirmationMutation.isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Send verification email',
                description: 'Send verification email',
                id: 'zBphCE',
              })}
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
