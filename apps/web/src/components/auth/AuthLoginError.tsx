import clsx from 'clsx';
import { RiEmotionSadLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextDangerColor } from '~/components/ui/theme';

type Props = Readonly<{
  code?: string;
  description?: string;
}>;

export default function AuthLoginError({ code, description }: Props) {
  const errorContent = useErrorMessages();
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  const { message: errorMessage, name: errorName } =
    errorContent[code ?? ''] || {};

  return (
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
        {errorMessage || description}
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
  );
}

function useErrorMessages(): Record<string, { message: string; name: string }> {
  const intl = useIntl();

  return {
    otp_expired: {
      message: intl.formatMessage({
        defaultMessage:
          'Login for this sign-in has expired. Please try to sign in again.',
        description: 'Error message for expired login',
        id: 'dlrooM',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Login link expired',
        description: 'Error name for expired login',
        id: 'Ak+Tl1',
      }),
    },
  };
}
