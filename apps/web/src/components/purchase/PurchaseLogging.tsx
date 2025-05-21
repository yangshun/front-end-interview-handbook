import { fbqGFE } from '~/lib/fbq';
import gtag from '~/lib/gtag';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';
import { getErrorMessage } from '~/utils/getErrorMessage';

import type { PurchasePrice } from './PurchaseTypes';

type Props = Readonly<{
  plan: string;
  product: 'interviews' | 'projects';
  purchasePrice: PurchasePrice;
}>;

export function purchaseInitiateLoggingNonSignedIn({
  plan,
  product,
  purchasePrice,
}: Props) {
  gtag.event({
    action: `checkout.sign_up`,
    category: 'ecommerce',
    label: 'Buy Now (not logged in)',
  });
  logMessage({
    level: 'info',
    message: `[${product}] ${plan} plan for ${purchasePrice.currency.toLocaleUpperCase()} ${
      purchasePrice.unitCostCurrency.withPPP.after
    } but not signed in`,
    namespace: product,
    title: 'Checkout initiate (non-signed in)',
  });
  logEvent('checkout.attempt.not_logged_in', {
    currency: purchasePrice.currency.toLocaleUpperCase(),
    namespace: product,
    plan: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}

export function purchaseInitiateLogging({
  plan,
  product,
  purchasePrice,
}: Props) {
  gtag.event({
    action: 'checkout.attempt',
    category: 'ecommerce',
    label: 'Buy Now',
  });
  gtag.event({
    action: 'begin_checkout',
    category: 'ecommerce',
    extra: {
      currency: purchasePrice.currency.toLocaleUpperCase(),
    },
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
  fbqGFE('track', 'InitiateCheckout', {
    content_category: plan,
    currency: purchasePrice.currency.toLocaleUpperCase(),
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
  logMessage({
    level: 'info',
    message: `[${product}] ${plan} plan for ${purchasePrice.currency.toLocaleUpperCase()} ${
      purchasePrice.unitCostCurrency.withPPP.after
    }`,
    namespace: product,
    title: 'Checkout Initiate',
  });
  logEvent('checkout.attempt', {
    currency: purchasePrice.currency.toLocaleUpperCase(),
    namespace: product,
    plan: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}

export function purchaseSessionGenerateLogging({
  plan,
  product,
  purchasePrice,
}: Props) {
  gtag.event({
    action: 'checkout.generate',
    category: 'ecommerce',
    label: plan,
  });
  logEvent('checkout.generate', {
    currency: purchasePrice.currency.toLocaleUpperCase(),
    namespace: product,
    plan: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}

export function purchaseSessionGeneratedLogging({
  plan,
  product,
  purchasePrice,
}: Props) {
  gtag.event({
    action: 'checkout.generated',
    category: 'ecommerce',
    label: plan,
  });
  logEvent('checkout.generated', {
    currency: purchasePrice.currency.toLocaleUpperCase(),
    namespace: product,
    plan: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}

export function purchaseFailureLogging({
  error,
  plan,
  product,
  purchasePrice,
}: Props & Readonly<{ error: Error }>) {
  gtag.event({
    action: 'checkout.failure',
    category: 'ecommerce',
    label: plan,
  });
  logMessage({
    level: 'error',
    message: getErrorMessage(error),
    namespace: product,
    title: 'Checkout error',
  });
  logEvent('checkout.fail', {
    currency: purchasePrice.currency.toLocaleUpperCase(),
    message: error.message,
    name: error.name,
    namespace: product,
    plan: `${product}.${plan}`,
    stack: error.stack,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}

export function purchaseCancelLogging({ plan, product, purchasePrice }: Props) {
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
    namespace: product,
    plan: `${product}.${plan}`,
    value: purchasePrice.unitCostCurrency.withPPP.after,
  });
}

export function purchaseSuccessLogging({
  amount,
  currency: currencyLowerCase,
  plan,
  product,
}: Readonly<{
  amount: number;
  currency: string;
  plan: string;
  product: 'interviews' | 'projects';
}>) {
  const currency = currencyLowerCase.toLocaleUpperCase();

  // Special conversion event expected by GA
  gtag.event({
    action: 'purchase',
    category: 'ecommerce',
    extra: {
      currency,
      ignore_referrer: 'true',
      items: [
        {
          item_variant: plan,
          quantity: 1,
        },
      ],
    },
    label: `${product}.${plan}`,
    value: amount,
  });

  // Custom event logging
  gtag.event({
    action: 'checkout.success',
    category: 'ecommerce',
    extra: {
      currency,
      ignore_referrer: 'true',
    },
    label: `${product}.${plan}`,
    value: amount,
  });

  gtag.event({
    action: 'conversion',
    extra: {
      currency,
      ignore_referrer: 'true',
      send_to: 'AW-11039716901/SrTfCIrox5UYEKXskpAp',
      transaction_id: '',
    },
    value: amount,
  });

  fbqGFE('track', 'Purchase', {
    content_name: `${product}.${plan}`,
    currency,
    value: amount,
  });

  logMessage({
    level: 'success',
    message: `[${product}] Purchased ${plan} plan for ${currency} ${amount}`,
    namespace: product,
    title: 'Purchase',
  });

  logEvent('checkout.success', {
    currency,
    namespace: product,
    plan: `${product}.${plan}`,
    value: amount,
  });
}
