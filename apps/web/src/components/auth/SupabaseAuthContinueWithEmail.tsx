import { RiArrowRightLine, RiMailLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';

import Button from '../ui/Button';
import AuthTermsOfServiceLine from './AuthTermsOfServiceLine';
import type { AuthViewType } from './SupabaseAuthTypes';

type Props = Readonly<{
  authView: AuthViewType;
  setAuthView: (view: AuthViewType) => void;
}>;

export default function SupabaseAuthContinueWithEmail({
  authView,
  setAuthView,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-8">
      <Button
        addonPosition="start"
        icon={RiMailLine}
        iconSecondary_USE_SPARINGLY={RiArrowRightLine}
        label={intl.formatMessage({
          defaultMessage: 'Continue with Email',
          description: 'Label of email sign in button on Sign In page',
          id: 'QIsW99',
        })}
        size="md"
        variant="tertiary"
        onClick={() =>
          setAuthView(
            authView === 'sign_in'
              ? 'sign_in_with_email'
              : 'sign_up_with_email',
          )
        }
      />
      <AuthTermsOfServiceLine />
    </div>
  );
}
