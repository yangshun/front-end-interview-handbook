import { currentExperiment } from '~/components/experiments';

const GA_TRACKING_ID = 'G-4PM3M4LWEM';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function pageview(url: string) {
  // Don't log analytics during development.
  if (process.env.NODE_ENV === 'development') {
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

  // Don't log analytics during development.
  if (process.env.NODE_ENV === 'development') {
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
    }:${currentExperiment.getValue()}:${action}`;

    window.gtag('event', actionWithExperimentPrefix, payload);
  }
}

const gtag = Object.freeze({
  event,
  pageview,
  trackingID: GA_TRACKING_ID,
});

export default gtag;
