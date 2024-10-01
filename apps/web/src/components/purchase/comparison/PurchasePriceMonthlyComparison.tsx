import { FormattedMessage } from '~/components/intl';
import type { PurchasePrice } from '~/components/purchase/PurchaseTypes';

import PurchasePriceLabel from '../PurchasePriceLabel';

type Props = Readonly<{
  price: PurchasePrice;
}>;

export default function PurchasePriceMonthlyComparison({ price }: Props) {
  return (
    <span>
      <span className="whitespace-nowrap">
        <FormattedMessage
          defaultMessage="{price} billed per month."
          description="Description of billing frequency for monthly plan"
          id="pDo/V5"
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
      </span>{' '}
      <span className="whitespace-nowrap">
        <FormattedMessage
          defaultMessage="Cancel anytime."
          description="Cancel the subscription anytime."
          id="GHQ8sO"
        />
      </span>
    </span>
  );
}
