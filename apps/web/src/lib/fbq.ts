const FB_PIXEL_ID = '213222811360903';

function pageview() {
  window.fbq('track', 'PageView');
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
function event(name: string, options: Record<string, unknown> = {}) {
  window.fbq('track', name, options);
}

const fbq = Object.freeze({
  event,
  pageview,
  pixelID: FB_PIXEL_ID,
});

export default fbq;
