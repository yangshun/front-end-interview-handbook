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
  // Only log analytics in production.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
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
