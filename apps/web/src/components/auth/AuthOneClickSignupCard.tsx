import clsx from 'clsx';
import { FcGoogle } from 'react-icons/fc';
import { RiCloseLine, RiGithubFill, RiMailLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeTextFaintColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import { useOAuthSignIn } from './useOAuthSignIn';
import { useToast } from '../global/toasts/useToast';

type Props = Readonly<{
  onClose?: () => void;
}>;

export default function AuthOneClickSignupCard({ onClose }: Props) {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();
  const { showToast } = useToast();

  const { loading, signInWithProvider } = useOAuthSignIn({
    onError: (errorMessage) => {
      showToast({
        title:
          errorMessage ||
          intl.formatMessage({
            defaultMessage: 'Something went wrong',
            description: 'Error message',
            id: 'sbXDK4',
          }),
        variant: 'danger',
      });
    },
  });

  return (
    <div
      aria-describedby="auth-description"
      aria-labelledby="auth-title"
      aria-modal="true"
      className={clsx(
        'w-full max-w-[294px]',
        'rounded-lg',
        'bg-neutral-800 dark:bg-white',
        'border border-neutral-700 dark:border-neutral-200',
        'px-4 pb-3 pt-4',
      )}
      role="dialog">
      <div className="flex items-center justify-center gap-2">
        <Text color="invert" id="auth-title" size="body1" weight="bold">
          {intl.formatMessage({
            defaultMessage: 'Join GreatFrontEnd in 1 click',
            description: 'Auth card title',
            id: 'Lsk0wX',
          })}
        </Text>
        <Button
          className="group transition-all"
          icon={RiCloseLine}
          iconClassName={clsx(
            themeTextInvertColor,
            'group-hover:text-neutral-900 dark:group-hover:text-white',
          )}
          isLabelHidden={true}
          label="Close"
          size="xs"
          variant="tertiary"
          onClick={onClose}
        />
      </div>
      <Text
        className="mb-4 mt-3 block"
        color="invert"
        id="auth-description"
        size="body3">
        {intl.formatMessage({
          defaultMessage:
            'The place for front end engineers. Upskill, ace interviews, get inspired.',
          description: 'Auth card description',
          id: 'n1m6Nx',
        })}
      </Text>
      <div className="flex items-center gap-2.5">
        <Button
          icon={FcGoogle}
          isDisabled={loading}
          isLoading={loading}
          label={intl.formatMessage({
            defaultMessage: 'Sign up with',
            description: 'Auth card button label',
            id: 'z9Ymn4',
          })}
          variant="secondary"
          onClick={() => signInWithProvider('google')}
        />
        <Button
          className="group transition-all"
          icon={RiGithubFill}
          iconClassName={clsx(
            themeTextInvertColor,
            'group-hover:text-neutral-900 dark:group-hover:text-white',
          )}
          isLabelHidden={true}
          isLoading={loading}
          label={intl.formatMessage({
            defaultMessage: 'Sign up with Github',
            description: 'Auth card button label',
            id: 'iwMZfR',
          })}
          variant="tertiary"
          onClick={() => signInWithProvider('github')}
        />
        <Text
          className={clsx('block px-2.5', themeTextFaintColor)}
          color="inherit"
          size="body2">
          {intl.formatMessage({
            defaultMessage: 'or',
            description: 'Label for or',
            id: 'ZEPn1r',
          })}
        </Text>
        <Button
          className="group transition-all"
          href={signInUpHref()}
          icon={RiMailLine}
          iconClassName={clsx(
            themeTextInvertColor,
            'group-hover:text-neutral-900 dark:group-hover:text-white',
          )}
          isDisabled={loading}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Sign up with email',
            description: 'Auth card button label',
            id: 'sr38Pg',
          })}
          variant="tertiary"
        />
      </div>
    </div>
  );
}
