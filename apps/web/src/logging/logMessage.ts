export type MessageSeverity = 'error' | 'info' | 'warning';

export type Props = Readonly<{
  message: string;
  severity: MessageSeverity;
  userIdentifier?: string;
}>;

export default async function logMessage({
  severity,
  message,
  userIdentifier,
}: Props) {
  console.info('[message]', severity, message);
  // Don't log messages during development.
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  try {
    await fetch(`/api/logging/message`, {
      body: JSON.stringify({
        message,
        severity,
        url: typeof window === 'undefined' ? null : window.location.href,
        user_identifier: userIdentifier,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  } catch {
    // Ignore.
  }
}
