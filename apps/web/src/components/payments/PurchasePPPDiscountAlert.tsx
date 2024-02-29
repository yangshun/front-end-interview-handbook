import { RiExchangeDollarLine } from 'react-icons/ri';

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
  return (
    <Alert
      icon={RiExchangeDollarLine}
      title={`Purchasing power parity for ${countryName}`}
      variant="success">
      We noticed you're in {countryName}. We support Purchasing Power Parity, so
      a{' '}
      <Text size="inherit" weight="medium">
        {discount}% discount
      </Text>{' '}
      has been automatically applied! 🎉
    </Alert>
  );
}
