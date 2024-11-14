import { FormattedMessage } from '~/components/intl';
import type { PurchasePrice } from '~/components/purchase/PurchaseTypes';
import Text from '~/components/ui/Text';

import PurchasePriceLabel from '../PurchasePriceLabel';

type Props = Readonly<{
  price: PurchasePrice;
}>;

export default function PurchasePriceAnnualComparison({ price }: Props) {
  return (
    <span className="whitespace-nowrap">
      <FormattedMessage
        defaultMessage="Billed yearly <priceText>({price})</priceText>"
        description="Description of billing frequency for annual plan"
        id="6E6+pG"
        values={{
          price: (
            <PurchasePriceLabel
              amount={price.unitCostCurrency.withPPP.after}
              currency={price.currency.toUpperCase()}
              symbol={price.symbol}
            />
          ),
          priceText: (chunks) => (
            <Text color="subtitle" size="inherit" weight="inherit">
              {chunks}
            </Text>
          ),
        }}
      />
    </span>
  );
}
