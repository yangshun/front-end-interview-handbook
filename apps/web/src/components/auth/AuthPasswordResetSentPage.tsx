'use client';

import clsx from 'clsx';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

import AuthEmailAsset from './AuthEmailAsset';

type Props = Readonly<{
  next: string;
}>;

export default function AuthPasswordResetSentPage({ next }: Props) {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'size-full isolate before:!-top-[180px]',
        themeRadialWhiteGlowBackground,
      )}>
      <Container
        className={clsx('flex flex-col items-center', 'py-8 md:py-12 lg:py-16')}
        width="xl">
        <Heading className="text-center" level="heading5">
          {intl.formatMessage({
            defaultMessage:
              'An email containing the password reset instructions will be sent if an associated account exists',
            description:
              'Message indicating a successful password reset request',
            id: 'Q0sZmk',
          })}
        </Heading>
        <div className="mb-10 mt-4 text-center">
          <Text size="body2">
            <Anchor
              href={signInUpHref({
                next,
              })}
              prefetch={null}>
              Go back to sign in
            </Anchor>
          </Text>
        </div>
        <AuthEmailAsset />
      </Container>
    </div>
  );
}
