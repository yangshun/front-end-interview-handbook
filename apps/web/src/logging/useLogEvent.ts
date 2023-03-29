import { useSearchParams } from 'next/navigation';

type LoggingAction =
  | 'copy'
  | 'pageview'
  | 'question.mark_complete'
  | 'question.submit';
// TODO: Improve typing.
type LoggingPayload = Record<string, unknown>;

export default function useLogEvent() {
  const searchParams = useSearchParams();

  return async (
    action: LoggingAction,
    payload: LoggingPayload,
    value?: number,
  ) => {
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
  };
}
