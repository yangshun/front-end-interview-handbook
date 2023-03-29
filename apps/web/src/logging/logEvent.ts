type LoggingAction =
  | 'checkout.attempt.not_logged_in'
  | 'checkout.attempt'
  | 'checkout.cancel'
  | 'checkout.fail'
  | 'checkout.success'
  | 'copy'
  | 'error'
  | 'hydration.fail'
  | 'hydration.success'
  | 'pageview'
  | 'question.mark_complete'
  | 'question.submit';
// TODO: Improve typing.
type LoggingPayload = Record<string, unknown>;

export default async function logEvent(
  action: LoggingAction,
  payload: LoggingPayload,
  value?: number,
) {
  const searchParams = new URLSearchParams(window.location.search);
  const shouldLog =
    process.env.NODE_ENV === 'production' || searchParams?.get('debug');

  if (!shouldLog) {
    return;
  }

  await fetch('/api/logging/events', {
    body: JSON.stringify({
      clientSHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '',
      name: action,
      pathname: window.location.pathname,
      payload,
      query: Object.fromEntries(new URLSearchParams(window.location.search)),
      value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}
