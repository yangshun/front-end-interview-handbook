'use client';

import { RiExchangeDollarLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';

import Text from '../ui/Text';

type Props = Readonly<{
  countryName: string;
  discount: number;
}>;

export default function PurchasePPPDiscountAlert({
  countryName,
  discount,
}: Props) {
  const intl = useIntl();

  return (
    <Alert
      icon={RiExchangeDollarLine}
      title={intl.formatMessage(
        {
          defaultMessage: 'Purchasing power parity for {countryName}',
          description: 'Purchase PPP discount alert title',
          id: 'b+5e56',
        },
        { countryName },
      )}
      variant="success">
      <FormattedMessage
        defaultMessage="We noticed you're in {countryName}. We support Purchasing Power Parity, so a <bold>{discount}% discount</bold> has been automatically applied! 🎉"
        description="Purchase PPP discount alert description"
        id="U5VBHX"
        values={{
          bold: (chunk) => (
            <Text size="inherit" weight="medium">
              {chunk}
            </Text>
          ),
          countryName,
          discount,
        }}
      />
    </Alert>
  );
}
