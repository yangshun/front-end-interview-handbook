const TAZAPAY_BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'https://service-sandbox.tazapay.com/v3'
    : 'https://service.tazapay.com/v3';
const TAZAPAY_TOKEN = Buffer.from(
  `${process.env.TAZAPAY_API_KEY}:${process.env.TAZAPAY_SECRET_KEY}`,
).toString('base64');

// Map of country codes to payment methods that should be removed in the checkout
const REMOVE_PAYMENT_METHODS: Record<string, Array<string>> = {
  IN: ['card'],
} as const;

export const PurchasePaymentTazapayProvider = {
  async createCustomer({
    countryCode,
    email,
    name,
    userId,
  }: Readonly<{
    countryCode: string;
    email: string;
    name: string;
    userId: string;
  }>) {
    console.info(`No Tazapay customer found for ${userId}, creating one`);

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
    cancelUrl,
    currency,
    customerId,
    firstPromoterTrackingId,
    items,
    metadata,
    removePaymentMethods,
    successUrl,
    transactionDescription,
    unitAmountInCurrency,
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
  async getLastPaymentAttempt(id: string) {
    const res = await fetchFromTazapay<AnyIntentional>({
      endpoint: `/checkout/${id}`,
      method: 'GET',
    });

    const latestPaymentAttempt = res.latest_payment_attempt;

    const paymentAttemptData = (res.payment_attempts || []).find(
      (attempt: AnyIntentional) => attempt.id === latestPaymentAttempt,
    );

    if (!paymentAttemptData) {
      return null;
    }

    const status = extractErrorCodeAndMessage(
      paymentAttemptData.status_description,
    );

    return {
      amount: paymentAttemptData.amount,
      currency: paymentAttemptData.charge_currency,
      error: {
        code: status?.code,
        message: status?.message,
      },
      id: paymentAttemptData.id,
      status: paymentAttemptData.status,
    };
  },
  getRemovePaymentMethods(countryCode: string): Array<string> {
    return REMOVE_PAYMENT_METHODS[countryCode] ?? [];
  },
};

async function fetchFromTazapay<T>({
  body,
  endpoint,
  method = 'POST',
}: Readonly<{
  body?: AnyIntentional;
  endpoint: string;
  method?: 'GET' | 'POST';
}>): Promise<T> {
  const fetchOptions: RequestInit = {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${TAZAPAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method,
  };

  if (method === 'POST' && body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(`${TAZAPAY_BASE_URL}${endpoint}`, fetchOptions);

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Something went wrong');
  }

  return json.data;
}

// This function extracts the error code and message from the status description which is this format <error_code> <error_message>
function extractErrorCodeAndMessage(statusDescription: string): Readonly<{
  code?: string;
  message?: string;
} | null> {
  if (!statusDescription) return null;

  const parts = statusDescription.trim().split(' ');

  return parts.length > 0
    ? {
        code: parts[0],
        message: parts.slice(1).join(' '),
      }
    : null;
}
