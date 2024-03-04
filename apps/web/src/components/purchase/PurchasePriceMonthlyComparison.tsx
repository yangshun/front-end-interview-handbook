import { FormattedMessage } from 'react-intl';

import type { PurchasePrice } from '~/data/purchase/PurchaseTypes';

import PurchasePriceLabel from './PurchasePriceLabel';

type Props = Readonly<{
  price: PurchasePrice;
}>;

export default function PurchasePriceMonthlyComparison({ price }: Props) {
  return (
    <span>
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
      />{' '}
      <FormattedMessage
        defaultMessage="Cancel anytime."
        description="Cancel the subscription anytime."
        id="GHQ8sO"
      />
    </span>
  );
}
