import { FormattedMessage } from '~/components/intl';

import Anchor from '../ui/Anchor';
import Text from '../ui/Text';

export default function AuthTermsOfServiceLine() {
  return (
    <Text
      className="mx-auto block max-w-[284px] text-center"
      color="secondary"
      size="body3">
      <FormattedMessage
        defaultMessage="By proceeding, you agree to GreatFrontEnd's <tos>Terms of Service</tos> and <pp>Privacy Policy</pp>."
        description="Disclaimer of agreement to terms of service and privacy policy on Email Sign Up page"
        id="Y6CFPM"
        values={{
          pp: (chunks) => (
            <Anchor href="/legal/privacy-policy">{chunks}</Anchor>
          ),
          tos: (chunks) => <Anchor href="/legal/terms">{chunks}</Anchor>,
        }}
      />
    </Text>
  );
}
