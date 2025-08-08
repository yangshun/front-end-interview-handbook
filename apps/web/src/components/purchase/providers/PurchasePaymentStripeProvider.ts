import Stripe from 'stripe';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  maxNetworkRetries: 2,
});

export const PurchasePaymentStripeProvider = {
  async createCustomer({ email, id }: Readonly<{ email: string; id: string }>) {
    console.info(`No Stripe customer found for ${id}, creating one`);

    const customer = await stripe.customers.create(
      // Keep parameters across customer creation synced
      // because they use the same idempotency key
      {
        email,
      },
      {
        idempotencyKey: id,
      },
    );

    const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

    // Can't use Prisma here because it's not supported in edge functions.
    await supabaseAdmin
      .from('Profile')
      .update({
        stripeCustomer: customer.id,
      })
      .eq('id', id);

    return { id: customer.id };
  },
  async createOneTimePlanCheckoutSession({
    allowPromoCode,
    cancelUrl,
    currency,
    customerId,
    firstPromoterTrackingId,
    metadata,
    productId,
    promoCode,
    receiptEmail,
    successUrl,
    unitAmountInCurrency,
  }: Readonly<{
    allowPromoCode?: boolean;
    cancelUrl: string;
    currency: string;
    customerId: string;
    firstPromoterTrackingId?: string;
    metadata?: Record<string, string>;
    productId: string;
    promoCode?: string;
    receiptEmail?: string;
    successUrl: string;
    unitAmountInCurrency: number;
  }>) {
    const session = await stripe.checkout.sessions.create({
      ...(promoCode
        ? { discounts: [{ promotion_code: promoCode }] }
        : { allow_promotion_codes: allowPromoCode }),
      cancel_url: cancelUrl,
      client_reference_id:
        firstPromoterTrackingId || 'fp_' + String(Date.now()),
      customer: customerId,
      invoice_creation: {
        // TODO: find out cost for invoice creation and disable if too expensive.
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency,
            product: productId,
            unit_amount: unitAmountInCurrency,
          },
          quantity: 1,
        },
      ],
      metadata,
      mode: 'payment',
      payment_intent_data: {
        receipt_email: receiptEmail,
      },
      success_url: successUrl,
    });

    return { id: session.id, url: session.url! };
  },
};
