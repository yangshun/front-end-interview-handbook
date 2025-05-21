type LoggingAction =
  | 'auth.login_success'
  | 'auth.password.change'
  | 'auth.password.reset.fail'
  | 'auth.password.reset.success'
  | 'auth.password.reset'
  | 'auth.sign_in.fail'
  | 'auth.sign_in.success'
  | 'auth.sign_in'
  | 'auth.sign_up.existing_user'
  | 'auth.sign_up.fail'
  | 'auth.sign_up.success'
  | 'auth.sign_up'
  | 'checkout.attempt.not_logged_in'
  | 'checkout.attempt'
  | 'checkout.cancel'
  | 'checkout.fail'
  | 'checkout.generate'
  | 'checkout.generated'
  | 'checkout.success'
  | 'click'
  | 'copy'
  | 'error'
  | 'guide.mark_complete'
  | 'hydration.fail'
  | 'hydration.success'
  | 'monaco.reachable'
  | 'monaco.unreachable'
  | 'not_found'
  | 'pageview'
  | 'projects.challenge.assets.download'
  | 'projects.challenge.start'
  | 'projects.challenge.submit'
  | 'projects.onboarding.submit'
  | 'question.mark_complete'
  | 'question.run'
  | 'question.submit'
  | 'sandpack.reachable'
  | 'sandpack.timeout'
  | 'sandpack.unreachable'
  | 'sponsorships.inquiry'
  | 'web_vitals'
  | 'window.blur'
  | 'window.focus';
// TODO: Improve typing.
type LoggingPayload = Readonly<{
  namespace:
    | 'auth'
    | 'blog'
    | 'general'
    | 'interviews'
    | 'marketing'
    | 'performance'
    | 'projects'
    | 'sponsors'
    | 'workspace';
}> &
  Record<string, unknown>;

/**
 * Client-side logging to Axiom. Don't use on the server.
 */
export default async function logEvent(
  action: LoggingAction,
  payload: LoggingPayload,
  value?: number,
) {
  const searchParams = new URLSearchParams(window.location.search);
  const connection =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigator.connection ||
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigator.mozConnection ||
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigator.webkitConnection ||
    {};
  const body = JSON.stringify({
    clientSHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '',
    connection: {
      type: connection?.effectiveType,
    },
    name: action,
    pathname: window.location.pathname,
    payload,
    query: Object.fromEntries(new URLSearchParams(window.location.search)),
    referer: document.referrer,
    value,
  });

  const shouldLog =
    process.env.NODE_ENV === 'production' || searchParams?.get('debug');

  if (!shouldLog) {
    console.info('[axiom]', action, payload);

    return;
  }

  try {
    await fetch('/api/logging/events', {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
      method: 'POST',
    });
  } catch (error) {
    console.error(error);
  }
}
