import Stripe from 'stripe';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const PurchasePaymentStripeProvider = {
  async createCustomer({ id, email }: Readonly<{ email: string; id: string }>) {
    console.info(`No Stripe customer found for ${id}, creating one`);

    // This happens when Supabase's webhooks don't fire during user signup
    // and there's no corresponding Stripe customer for the user.
    // We create a customer on the fly and update the `Profile` table.
    const customer = await stripe.customers.create(
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
    productId,
    currency,
    cancelUrl,
    successUrl,
    customerId,
    allowPromoCode,
    receiptEmail,
    metadata,
    firstPromoterTrackingId,
    unitAmountInCurrency,
  }: Readonly<{
    allowPromoCode?: boolean;
    cancelUrl: string;
    currency: string;
    customerId: string;
    firstPromoterTrackingId?: string;
    metadata?: Record<string, string>;
    productId: string;
    receiptEmail?: string;
    successUrl: string;
    unitAmountInCurrency: number;
  }>) {
    const session = await stripe.checkout.sessions.create({
      allow_promotion_codes: allowPromoCode,
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
