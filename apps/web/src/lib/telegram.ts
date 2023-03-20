const token = `5829204757:AAGQhTP2-aWYDMu3vJHhJkJw2j62Y8bPiFo`;

type MessageSeverity = 'error' | 'info' | 'warning';

const severityIcon: Record<MessageSeverity, string> = {
  error: '⛔',
  info: '💬',
  warning: '⚠️',
};

export async function sendMessage({
  severity,
  message,
  parseMode = 'MarkdownV2',
  userIdentifier,
}: Readonly<{
  message: string;
  parseMode?: 'HTML' | 'MarkdownV2';
  severity: MessageSeverity;
  userIdentifier?: string;
}>) {
  try {
    let finalMessage = `${severityIcon[severity]} ${message}`;

    if (userIdentifier != null) {
      finalMessage += `\n\nUser: ${userIdentifier}`;
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      body: JSON.stringify({
        // GFE Internal Tg Chat.
        chat_id: -1001857413784,
        parse_mode: parseMode,
        text: finalMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return null;
  } catch {
    // Ignore.
  }
}
