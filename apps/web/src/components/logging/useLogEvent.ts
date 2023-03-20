import { useSearchParams } from 'next/navigation';

type LoggingAction = 'copy' | 'page_load';
type LoggingPayload = Record<string, unknown>;

export default function useLogEvent() {
  const searchParams = useSearchParams();

  return async (action: LoggingAction, payload: LoggingPayload) => {
    const shouldLog =
      process.env.NODE_ENV === 'production' || searchParams?.get('debug');

    if (!shouldLog) {
      return;
    }

    await fetch('/api/users/events', {
      body: JSON.stringify({
        action,
        payload,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  };
}
