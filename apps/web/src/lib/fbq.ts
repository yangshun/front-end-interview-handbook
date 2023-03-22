const FB_PIXEL_ID = '213222811360903';

function pageview() {
  trackImpl('PageView');
}

// https://developers.facebook.com/docs/meta-pixel/reference
type MetaPixelStandardEventName =
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Purchase'
  | 'Schedule'
  | 'Search'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent';

function track(
  name: MetaPixelStandardEventName,
  // TODO: Improve options according to Object Properties: https://developers.facebook.com/docs/meta-pixel/reference#object-properties
  options: Record<string, unknown> = {},
) {
  trackImpl(name, options);
}

// https://developers.facebook.com/docs/meta-pixel/guides/track-multiple-events
function trackImpl(name: string, options?: Record<string, unknown>) {
  // Don't log analytics during development.
  if (process.env.NODE_ENV === 'development') {
    console.info('[fbq]', name, options);

    return;
  }

  // Window.fbq('track', name, options);
}

const fbq = Object.freeze({
  pageview,
  pixelID: FB_PIXEL_ID,
  track,
});

export default fbq;
