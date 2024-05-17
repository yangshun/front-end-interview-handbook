import { fbqGFE } from '~/lib/fbq';
import gtag from '~/lib/gtag';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import type { PurchasePrice } from './PurchaseTypes';

type Props = Readonly<{
  plan: string;
  product: 'interviews' | 'projects';
  purchasePrice: PurchasePrice;
}>;

export function purchaseCancelLogging({ product, plan, purchasePrice }: Props) {
  gtag.event({
    action: `checkout.cancel`,
    category: 'ecommerce',
    label: `${product}.${plan}`,
  });
  gtag.event({
    action: `checkout.cancel.${plan}`,
    category: 'ecommerce',
    label: `${product}.${plan}`,
  });
  logMessage({
    level: 'warning',
    message: `[${product}] Cancelled checkout for ${plan}`,
    namespace: product,
    title: 'Checkout cancel',
  });
  logEvent('checkout.cancel', {
    currency: purchasePrice.currency.toLocaleUpperCase(),
    plan: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}

export function purchaseSuccessLogging({
  product,
  plan,
  purchasePrice,
}: Props) {
  // Special conversion event expected by GA.
  gtag.event({
    action: 'purchase',
    category: 'ecommerce',
    extra: {
      currency: purchasePrice.currency.toLocaleUpperCase(),
      ignore_referrer: 'true',
      items: [
        {
          item_variant: plan,
          quantity: 1,
        },
      ],
    },
    label: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });

  // Custom event logging.
  gtag.event({
    action: 'checkout.success',
    category: 'ecommerce',
    extra: {
      ignore_referrer: 'true',
    },
    label: `${product}.${plan}`,
  });

  gtag.event({
    action: 'conversion',
    extra: {
      currency: purchasePrice.currency.toLocaleUpperCase(),
      ignore_referrer: 'true',
      send_to: 'AW-11039716901/SrTfCIrox5UYEKXskpAp',
      transaction_id: '',
      value: purchasePrice.unitCostCurrency.withPPP.after,
    },
  });

  fbqGFE('track', 'Purchase', {
    content_name: `${product}.${plan}`,
    currency: purchasePrice.currency.toLocaleUpperCase(),
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });

  logMessage({
    level: 'success',
    message: `[${product}] Purchased ${plan} plan for ${purchasePrice.currency.toLocaleUpperCase()} ${
      purchasePrice.unitCostCurrency.withPPP.after
    }`,
    namespace: product,
    title: 'Purchase',
  });
  logEvent('checkout.success', {
    currency: purchasePrice.currency.toLocaleUpperCase(),
    plan: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}
