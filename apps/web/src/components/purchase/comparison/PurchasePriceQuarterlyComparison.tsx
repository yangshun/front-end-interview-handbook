import { FormattedMessage } from '~/components/intl';
import type { PurchasePrice } from '~/components/purchase/PurchaseTypes';

import PurchasePriceLabel from '../PurchasePriceLabel';

type Props = Readonly<{
  price: PurchasePrice;
}>;

export default function PurchasePriceQuarterlyComparison({ price }: Props) {
  return (
    <span className="whitespace-nowrap">
      <FormattedMessage
        defaultMessage="Billed quarterly ({price})"
        description="Description of billing frequency for quarterly plan"
        id="onMs8o"
        values={{
          price: (
            <PurchasePriceLabel
              amount={price.unitCostCurrency.withPPP.after}
              currency={price.currency.toUpperCase()}
              symbol={price.symbol}
            />
          ),
        }}
      />
    </span>
  );
}
