const TAZAPAY_BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'https://service-sandbox.tazapay.com/v3'
    : 'https://service.tazapay.com/v3';
const TAZAPAY_TOKEN = Buffer.from(
  `${process.env.TAZAPAY_API_KEY}:${process.env.TAZAPAY_SECRET_KEY}`,
).toString('base64');

export const PurchasePaymentTazapayProvider = {
  async createCustomer({
    id,
    email,
    name,
    countryCode,
  }: Readonly<{
    countryCode: string;
    email: string;
    id: string;
    name: string;
  }>) {
    console.info(`No Tazapay customer found for ${id}, creating one`);

    const data = await fetchFromTazapay<{ id: string }>({
      body: {
        country: countryCode,
        email,
        name,
      },
      endpoint: '/customer',
    });

    const customerId = data.id;

    // TODO: Update the tazapay customer ID in the database.
    // Const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
    // Can't use Prisma here because it's not supported in edge functions.
    //   await supabaseAdmin
    //     .from('Profile')
    //     .update({
    //       stripeCustomer: customer.id,
    //     })
    //     .eq('id', id);

    //   customerId = customer.id;

    return { id: customerId };
  },
  async createOneTimePlanCheckoutSession({
    currency,
    cancelUrl,
    successUrl,
    customerId,
    metadata,
    firstPromoterTrackingId,
    unitAmountInCurrency,
    items,
    transactionDescription,
    removePaymentMethods,
  }: Readonly<{
    cancelUrl: string;
    currency: string;
    customerId: string;
    firstPromoterTrackingId?: string;
    items: Array<{
      amount: number;
      description: string;
      name: string;
      quantity: number;
    }>;
    metadata?: Record<string, string>;
    removePaymentMethods?: Array<string>;
    successUrl: string;
    transactionDescription: string;
    unitAmountInCurrency: number;
  }>) {
    const data = await fetchFromTazapay<{ id: string; url: string }>({
      body: {
        amount: unitAmountInCurrency,
        cancel_url: cancelUrl,
        customer: customerId,
        invoice_currency: currency.toUpperCase(),
        items,
        metadata,
        reference_id: firstPromoterTrackingId || `fp_${Date.now()}`,
        remove_payment_methods: removePaymentMethods,
        success_url: successUrl,
        transaction_description: transactionDescription,
      },
      endpoint: '/checkout',
    });

    return { id: data.id, url: data.url };
  },
};

async function fetchFromTazapay<T>({
  endpoint,
  body,
}: Readonly<{
  body: AnyIntentional;
  endpoint: string;
}>): Promise<T> {
  const res = await fetch(`${TAZAPAY_BASE_URL}${endpoint}`, {
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${TAZAPAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Something went wrong');
  }

  return json.data;
}
