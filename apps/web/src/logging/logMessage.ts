export type MessageLevel = 'error' | 'info' | 'success' | 'warning';

export type Props = Readonly<{
  level: MessageLevel;
  message: string;
  namespace: 'auth' | 'blog' | 'general' | 'interviews' | 'projects';
  title: string;
  userIdentifier?: string;
}>;

// Logs to Telegram.
export default async function logMessage({
  level,
  title,
  message,
  userIdentifier,
}: Props) {
  console.info('[message]', level, message);
  // Don't log messages during development.
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  try {
    await fetch(`/api/logging/message`, {
      body: JSON.stringify({
        level,
        message,
        sha: (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '').slice(0, 7),
        title,
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
