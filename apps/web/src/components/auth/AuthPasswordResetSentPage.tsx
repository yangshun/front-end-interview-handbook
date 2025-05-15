'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

type Props = Readonly<{
  next: string;
}>;

export default function AuthPasswordResetSentPage({ next }: Props) {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'isolate size-full before:!-top-[180px]',
        themeRadialWhiteGlowBackground,
      )}>
      <Container
        className={clsx(
          'flex flex-col items-center',
          'py-16',
          'mb-40 sm:mb-60 lg:mb-80',
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
        <Heading className="my-4 text-center" level="heading4">
          {intl.formatMessage({
            defaultMessage: 'Password reset email sent',
            description: 'Heading for password reset email sent',
            id: 'cOExUy',
          })}
        </Heading>
        <Text
          className={clsx(
            'block max-w-[540px] text-center',
            'text-sm sm:text-base',
          )}
          color="secondary"
          size="inherit">
          {intl.formatMessage({
            defaultMessage:
              "We've sent a password reset link to your email. If you don't see the email, make sure to check your spam or junk folder.",
            description: 'Description for password reset email sent',
            id: '/Foz6K',
          })}
        </Text>
        <Button
          className="mt-4"
          href={signInUpHref({
            next,
          })}
          label={intl.formatMessage({
            defaultMessage: 'Go back to sign in',
            description: 'Back to sign in page',
            id: '3qk61r',
          })}
          prefetch={null}
          size="xs"
          variant="primary"
        />
      </Container>
    </div>
  );
}
