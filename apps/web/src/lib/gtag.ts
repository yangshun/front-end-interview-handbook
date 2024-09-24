import { currentExperiment } from '~/components/experiments';

const GA_TRACKING_ID = 'G-4PM3M4LWEM';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function pageview(url: string) {
  // Only log analytics in production.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: url,
    page_title: document.title,
  });
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
function event({
  action,
  category,
  label,
  value,
  extra = {},
}: {
  action: string;
  category?: 'ecommerce' | 'engagement' | 'pageview';
  extra?: Record<string, unknown>;
  label?: string;
  value?: number;
}) {
  const payload = {
    event_category: category,
    event_label: label,
    value,
    ...extra,
  };

  // Only log analytics in production.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    console.info('[gtag]', action, payload);

    return;
  }

  window.gtag('event', action, payload);

  // Double log for experiment-prefixed events because
  // GA doesn't recognize certain events (e.g. purchase)
  // if they're not exactly what they expect.
  if (currentExperiment.isRunning) {
    const actionWithExperimentPrefix = `${
      currentExperiment.loggingPrefix
    }:${currentExperiment.getValue_USE_ON_CLIENT_ONLY()}:${action}`;

    window.gtag('event', actionWithExperimentPrefix, payload);
  }
}

function config(tagId: string, extra?: Record<string, unknown>) {
  // Only log analytics in production.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    console.info('[gtag]', tagId, extra);

    return;
  }

  window.gtag('config', tagId, extra);
}

const gtag = Object.freeze({
  config,
  event,
  pageview,
  trackingID: GA_TRACKING_ID,
});

export default gtag;
