export async function sendGoogleChatMessage({
  additionalInfo,
  groups,
  projectName,
}: {
  additionalInfo: string;
  groups: Array<{ keywords: Array<string>; subreddits: Array<string> }>;
  projectName: string;
}) {
  const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('No Google Chat webhook URL configured.');

    return;
  }

  const groupingsText =
    groups.length > 0
      ? groups
          .map(
            (g, idx) =>
              `*Group ${idx + 1}:*\n  • *Keywords:* ${g.keywords.join(
                ', ',
              )}\n  • *Subreddits:* ${g.subreddits.join(', ')}`,
          )
          .join('\n\n')
      : 'N/A';

  const message = {
    text: `📢 *Reddit fetch completed*

*Project:* ${projectName}
*Additional info:* ${additionalInfo}

*Groups searched:*
${groupingsText}

*Time:* ${new Date().toLocaleString()}`,
  };

  try {
    await fetch(webhookUrl, {
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  } catch (err) {
    console.error('Failed to send Google Chat message:', err);
  }
}
