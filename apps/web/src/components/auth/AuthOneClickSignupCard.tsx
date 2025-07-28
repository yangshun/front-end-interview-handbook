import clsx from 'clsx';
import { useId } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { RiCloseLine, RiGithubFill, RiMailLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeTextFaintColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';
import { mergeURLWithCurrentParamsHash } from '~/utils/merge-url-params-hash';

import { useOAuthSignIn } from './useOAuthSignIn';

type Props = Readonly<{
  onClose?: () => void;
}>;

export default function AuthOneClickSignupCard({ onClose }: Props) {
  const intl = useIntl();
  const descriptionId = useId();
  const titleId = useId();
  const { pathname } = useI18nPathname();
  const { signInUpHref } = useAuthSignInUp();
  const { showToast } = useToast();

  const { loading, signInWithProvider } = useOAuthSignIn({
    next: mergeURLWithCurrentParamsHash(pathname ?? ''),
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
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-modal="true"
      className={clsx(
        'w-full max-w-[294px]',
        'rounded-lg',
        'bg-neutral-800 dark:bg-white',
        'border border-neutral-700 dark:border-neutral-200',
        'px-4 pb-3 pt-4',
      )}
      role="dialog">
      <div className="flex items-center justify-between gap-2">
        <Text color="invert" id={titleId} size="body1" weight="bold">
          {intl.formatMessage({
            defaultMessage: 'Join GreatFrontEnd in 1 click',
            description: 'Auth card title',
            id: 'Lsk0wX',
          })}
        </Text>
        <Button
          className="group/button transition-all"
          icon={RiCloseLine}
          iconClassName={clsx(
            themeTextInvertColor,
            'group-hover/button:text-neutral-900 dark:group-hover/button:text-white',
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
        id={descriptionId}
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
          display="block"
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
          className="group/button transition-all"
          icon={RiGithubFill}
          iconClassName={clsx(
            themeTextInvertColor,
            'group-hover/button:text-neutral-900 dark:group-hover/button:text-white',
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
        <Text className={themeTextFaintColor} color="inherit" size="body2">
          {intl.formatMessage({
            defaultMessage: 'or',
            description: 'Label for or',
            id: 'ZEPn1r',
          })}
        </Text>
        <Button
          className="group/button transition-all"
          href={signInUpHref({
            query: {
              view: 'email',
            },
          })}
          icon={RiMailLine}
          iconClassName={clsx(
            themeTextInvertColor,
            'group-hover/button:text-neutral-900 dark:group-hover/button:text-white',
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
