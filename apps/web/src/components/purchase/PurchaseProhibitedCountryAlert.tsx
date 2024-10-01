import { isProhibitedCountry } from '~/lib/stripeUtils';

import { FormattedMessage } from '~/components/intl';
import Alert from '~/components/ui/Alert';

type Props = Readonly<{
  countryCode: string;
}>;

export default function PurchaseProhibitedCountryAlert({ countryCode }: Props) {
  if (!isProhibitedCountry(countryCode)) {
    return null;
  }

  return (
    <Alert variant="danger">
      <FormattedMessage
        defaultMessage="Our services are unavailable at your location."
        description="Message explaining that the website does not transact with the user's location."
        id="LNBK2M"
      />
    </Alert>
  );
}
