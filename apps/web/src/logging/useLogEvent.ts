import { useSearchParams } from 'next/navigation';

type LoggingAction =
  | 'copy'
  | 'page_load'
  | 'question.mark_complete'
  | 'question.submit';
type LoggingPayload = Record<string, unknown>;

export default function useLogEvent() {
  const searchParams = useSearchParams();

  return async (action: LoggingAction, payload: LoggingPayload) => {
    const shouldLog =
      process.env.NODE_ENV === 'production' || searchParams?.get('debug');

    if (!shouldLog) {
      return;
    }

    await fetch('/api/logging/events', {
      body: JSON.stringify({
        action,
        clientSHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '',
        payload,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  };
}
